import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/auth.dto';

@ApiTags('autenticacao')
@Controller('/login')
export class AuthController {
    constructor(private authService:AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiOperation({ summary: 'Realiza login do usuário' })
  @ApiBody({ type: loginDTO })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.'})
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })

  signIn(@Body() signInDto: loginDTO) {
    return this.authService.signIn(signInDto.email, signInDto.senha);
  }
}
