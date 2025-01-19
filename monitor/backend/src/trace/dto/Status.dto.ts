import {IsOptional} from "class-validator";
import { ValueAttribute } from "./ValueAttribute.dto";

export class Status {
    
    @IsOptional()
    code?: string;

    @IsOptional()
    message?:string;
}