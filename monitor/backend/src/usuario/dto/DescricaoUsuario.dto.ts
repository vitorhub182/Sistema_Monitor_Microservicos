import { ApiProperty } from '@nestjs/swagger';

export class DescricaoUsuarioDTO {
  @ApiProperty({
    example: '41810567-20a6-47bc-a50f-c6025bef31ce',
    description: 'UUID do usuário',
  })
  readonly id: string;

  @ApiProperty({
    example: 'usuario@example.com',
    description: 'E-mail do usuário',
  })
  readonly email: string;

  @ApiProperty({
    example: 'Fulano da Silva',
    description: 'Nome completo do usuário',
  })
  readonly nome_completo: string;

  @ApiProperty({ example: 'admin', description: 'Função do usuário' })
  readonly role: string;

  @ApiProperty({ example: 'fulano123', description: 'Apelido do usuário' })
  readonly apelido: string;

  constructor(usuario: {
    id: string;
    email: string;
    nome_completo: string;
    role: string;
    apelido: string;
  }) {
    this.id = usuario.id;
    this.email = usuario.email;
    this.nome_completo = usuario.nome_completo;
    this.role = usuario.role;
    this.apelido = usuario.apelido;
  }
}
