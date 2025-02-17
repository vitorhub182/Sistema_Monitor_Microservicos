import {IsNotEmpty, IsOptional} from "class-validator";

export class Scope {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    version: string;

}