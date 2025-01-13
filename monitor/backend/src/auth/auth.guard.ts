import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
  import { Request } from 'express';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { Repository } from 'typeorm';

  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectRepository(UsuarioEntity) // alinhar repository ao entity
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.get<string>('SECRET')
          }
        );
        request['user'] = payload;

        const emailJWT = payload.emailFornecido;

      if (!emailJWT){throw new UnauthorizedException();}

    const user  = await this.usuarioRepository.findOne({where: { email: emailJWT}});
    const roles  = this.reflector.get<string[]>('roles', context.getHandler());
    const total_roles = roles.filter(role => role === user.role);
    if(total_roles.length >=1){
      return true;
    }else{
      return false;
    }
      } catch {
        throw new UnauthorizedException();
      }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }