import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(UsuarioEntity) // alinhar repository ao entity
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private configService: ConfigService,
        private reflector: Reflector,
        ) {}

  async signIn(emailFornecido: string, pass: string): Promise<{ access_token: string, id: string, apelido: string, role: string }> {
        
        const user = await this.usuarioRepository.findOne({where: { email: emailFornecido}});
        
        if(!user){throw new UnauthorizedException();};
        
        const senhaCriptografada = user?.senha;
        const password = this.configService.get<string>('ENCRIPT');
        const senhaDescriptografada = await this.decryptText(senhaCriptografada,password)

        if (senhaDescriptografada !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.id, emailFornecido: user.email };
        return { 
          access_token: await this.jwtService.signAsync(payload),
          id: user.id,
          apelido: user.apelido,
          role: user.role
        };}
          
  private async decryptText(encryptedString: string, senha: string) {
    const [ivBase64, encryptedBase64] = encryptedString.split(':');
    const iv = Buffer.from(ivBase64, 'base64');
    const encryptedText = Buffer.from(encryptedBase64, 'base64');
  
    const key = (await promisify(scrypt)(senha, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);

    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);
  
    return decryptedText.toString();
  }
}
