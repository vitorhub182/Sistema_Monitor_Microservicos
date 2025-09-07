import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class loginDTO {
  @ApiProperty({
    description: 'O e-mail do usuário',
    example: 'usuario@exemplo.com',
  })
  @IsEmail(undefined, { message: 'O EMAIL informado é inválido' })
  email: string;

  @ApiProperty({ description: 'A senha do usuário', example: 'senhaSegura123' })
  @MinLength(6, { message: 'Senha muito curta' })
  senha: string;
}
