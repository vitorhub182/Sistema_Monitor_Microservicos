import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario.service';
import { Role } from 'src/enums/role.enum';

@Injectable() // providers
@ValidatorConstraint({ async: true }) // Configuro com uma classe de validação assíncrona
export class TipoRoleValidator implements ValidatorConstraintInterface {
  // implementando a interface que define a classe com validador

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (value === Role.Viewer || value === Role.Admin) {
      return true;
    } else {
      return false;
    }
  }
}

// Crio o decorator que sera utilizado como validador assíncrono
export const ValidRole = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: TipoRoleValidator,
    });
  };
};
