
export interface DescricaoUsuarioDTO {
    email: string;
    nome_completo: string;
    role: string;
    apelido: string;
}

export interface CriaUsuarioDTO {
    email: string;
    nome_completo: string;
    senha: string;
    role: string;
    apelido: string;
}

export interface AtualizaUsuarioDTO {
  id: string;
  email?: string;
  nome_completo?: string;
  senha?: string;
  role?: string;
  apelido?: string;
}

  export interface ListaUsuarioDTO {
    id: string,
    email: string,
    nome_completo: string,
  }