import { Injectable, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TranslateJWT {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(UsuarioEntity) // alinhar repository ao entity
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}

  async translateJWT(authHeader): Promise<UsuarioEntity | undefined> {
         const token = authHeader.split(' ')[1];

    if (!token) {
        return undefined;
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.get<string>('SECRET')
          }
        );

        const emailJWT = payload.emailFornecido;

        const usuario = await this.usuarioRepository.findOne({where: {email: emailJWT}})
        
        if (!usuario) { return undefined;}

          return usuario
    }
    catch {
        return undefined;
      }
  }
}
