import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/emailUnico.validator";
import { ValidRole } from "../validacao/tipoRole.validator";

export class CriaUsuarioDTO {
    @ApiProperty({ description: "O ID do usuário", example: "22eb08fe-bda0-4850-9f05-b7239cce8d7f" })
    id: string;
    
    @ApiProperty({ description: "O e-mail do usuário", example: "usuario@exemplo.com" })
    @IsEmail(undefined, { message: "O 'email' informado é inválido" })
    @IsNotEmpty({ message: "Campo 'email' não pode ser vazio" })
    @EmailEhUnico({ message: 'E-mail já registrado' })
    email: string;
    
    @ApiProperty({ description: "O nome completo do usuário", example: "Nome Completo" })
    @IsNotEmpty({ message: "Campo 'nome_completo' não pode ser vazio" })
    nome_completo: string;
    
    @ApiProperty({ description: "A senha do usuário", example: "senhaSegura123" })
    @MinLength(6, { message: "A 'senha' precisa ter pelo menos 6 caracteres" })
    @IsNotEmpty({ message: "Campo 'senha' não pode ser vazio" })
    senha: string;
    
    @ApiProperty({ description: "O papel do usuário", example: "admin" })
    @ValidRole({ message: "Tipo inválido: aceito apenas 'admin' ou 'viewer'" })
    @IsNotEmpty({ message: "Campo 'role' não pode ser vazio" })
    role: string;
    
    @ApiProperty({ description: "O apelido do usuário", example: "Apelido" })
    @IsNotEmpty({ message: "Campo 'apelido' não pode ser vazio" })
    apelido: string;
}