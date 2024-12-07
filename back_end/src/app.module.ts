import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    UsuarioModule,

    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    AuthModule
  ],
  providers: []
})
export class AppModule {}
