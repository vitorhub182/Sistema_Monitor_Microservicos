import {IsOptional} from "class-validator";
import { ValueAttribute } from "./ValueAttribute.dto";

export class Attribute {
    @IsOptional()
    key: string;
    value: ValueAttribute;
}