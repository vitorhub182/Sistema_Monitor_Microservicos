import { ApiProperty } from '@nestjs/swagger';

export class ListaUsuarioDTO {
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

  constructor(usuario: { id: string; email: string; nome_completo: string }) {
    this.id = usuario.id;
    this.email = usuario.email;
    this.nome_completo = usuario.nome_completo;
  }
}
