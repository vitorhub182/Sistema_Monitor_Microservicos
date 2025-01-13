import { All, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { UsuarioService } from "./usuario.service";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RolesGuard } from "src/auth/roles.guard";
import { DescricaoUsuarioDTO } from "./dto/DescricaoUsuario.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('usuarios')
@ApiBearerAuth()
@Controller('/usuarios')
export class UsuarioController{
    
    constructor(
        private usuarioService: UsuarioService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiBody({ type: CriaUsuarioDTO })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.', type: DescricaoUsuarioDTO })
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        console.log(dadosDoUsuario);
   
        const usuarioSalvo = await this.usuarioService.salvar(dadosDoUsuario);
        return new DescricaoUsuarioDTO(usuarioSalvo)
    }
    
    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Lista todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários encontrada.', type: [ListaUsuarioDTO] })
    async listaUsuarios(){
        const usuariosLista = await this.usuarioService.listaUsuarios();
        
        const listaDeUsuarios = usuariosLista.map(
            usuario => new ListaUsuarioDTO(usuario)
        )

        return  listaDeUsuarios
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    @Roles(Role.Admin, Role.Viewer)
    @ApiOperation({ summary: 'Busca um usuário pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do usuário a ser buscado' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado.', type: DescricaoUsuarioDTO })
    async buscaPorId(@Param('id') id: string){
        const usuario = await this.usuarioService.buscaPorId(id);
        
        return new DescricaoUsuarioDTO(usuario)
    }

    @Patch('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin,Role.Viewer)
    @ApiOperation({ summary: 'Atualiza um usuário pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do usuário a ser atualizado' })
    @ApiBody({ type: AtualizaUsuarioDTO })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.', type: DescricaoUsuarioDTO })
    async atualizaUsuario( @Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO){
        const usuarioAtualizado = await this.usuarioService.atualiza(id,novosDados);
        return new DescricaoUsuarioDTO(usuarioAtualizado)
    }

    @Delete('/:id')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Admin,Role.Viewer)
    @ApiOperation({ summary: 'Remove um usuário pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do usuário a ser removido' })
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.', type: DescricaoUsuarioDTO })
    async removeUsuario(@Param('id') id: string){
        const usuarioRemovido = await this.usuarioService.remover(id);

        return new DescricaoUsuarioDTO(usuarioRemovido)

    }
}