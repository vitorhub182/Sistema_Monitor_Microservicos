import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    private configService: ConfigService,
  ) {}

  async buscaPorId(usuarioid: string) {
    try {
      const possivelUsuario = await this.usuarioRepository.findOne({
        where: { id: usuarioid },
      });
      if (!possivelUsuario) {
        throw new NotFoundException('Usuario não existe');
      }
      return possivelUsuario;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException('Erro ao buscar id do usuario');
    }
  }

  async listaUsuarios() {
    try {
      const listaDeUsuarios = await this.usuarioRepository.find();

      //const teste = await this.usuarioRepository.createQueryBuilder('usuarios').select(['usuarios.id']).getMany();*/

      return listaDeUsuarios;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException('Erro ao listar usuarios');
    }
  }

  async salvar(dadosUsuario: CriaUsuarioDTO) {
    try {
      const password = this.configService.get<string>('ENCRIPT');
      const iv = randomBytes(16);
      const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
      const cipher = createCipheriv('aes-256-ctr', key, iv);
      const senhaEncrypted = Buffer.concat([
        cipher.update(dadosUsuario.senha),
        cipher.final(),
      ]);
      const ivBase64 = iv.toString('base64');
      const encryptedBase64 = senhaEncrypted.toString('base64');
      dadosUsuario.senha = `${ivBase64}:${encryptedBase64}`;

      const usuarioSalvo = await this.usuarioRepository.save(dadosUsuario);
      return usuarioSalvo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException('Erro ao salvar usuarios');
    }
  }

  async existeEmail(emailFornecido: string) {
    try {
      const possivelUsuario = await this.usuarioRepository.find({
        where: { email: emailFornecido },
      });
      return possivelUsuario.length === 0;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException(
        'Erro na verificação do e-mail do usuario',
      );
    }
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    try {
      console.log(dadosDeAtualizacao);
      await this.buscaPorId(id);
      if (dadosDeAtualizacao.senha) {
        const password = this.configService.get<string>('ENCRIPT');
        const iv = randomBytes(16);
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);
        const senhaEncrypted = Buffer.concat([
          cipher.update(dadosDeAtualizacao.senha),
          cipher.final(),
        ]);
        const ivBase64 = iv.toString('base64');
        const encryptedBase64 = senhaEncrypted.toString('base64');
        dadosDeAtualizacao.senha = `${ivBase64}:${encryptedBase64}`;
      }
      await this.usuarioRepository.update(id, dadosDeAtualizacao);
      return this.buscaPorId(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException('Erro ao atualizar o usuario');
    }
  }

  async remover(usuarioId: string) {
    try {
      const possivelUsuario = await this.buscaPorId(usuarioId);

      await this.usuarioRepository.softDelete(usuarioId);
      return possivelUsuario;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException('Erro ao remover usuario');
    }
  }

  async findOne(emailFornecido: string): Promise<UsuarioEntity | undefined> {
    try {
      return await this.usuarioRepository.findOne({
        where: { email: emailFornecido },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao buscar usuario via FindOne',
      );
    }
  }
}
