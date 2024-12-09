import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { UsuarioService } from "../usuario.service";


@Injectable() // providers
@ValidatorConstraint({async: true }) // Configura com uma classe de validação assíncrona
export class EmailEhUnicoValidator implements ValidatorConstraintInterface{ // implementando a interface que define a classe com validador
    
    constructor(private usuarioService: UsuarioService ) {}

    async validate(value: any, validationArguments?: ValidationArguments):  Promise<boolean> {
        const usuarioEmail = await this.usuarioService.existeEmail(value);
        return usuarioEmail;
    }

}

// Crio o decorator que sera utilizado como validador assíncrono 
export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator
        })
    }
}