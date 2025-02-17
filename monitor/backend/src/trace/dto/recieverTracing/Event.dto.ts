import {IsNotEmpty, IsOptional} from "class-validator";
import { ValueAttribute } from "./ValueAttribute.dto";
import { Attribute } from "./Attribute.dto";

export class Event {

    @IsNotEmpty()
    timeUnixNano: bigint;
    
    @IsNotEmpty()
    name: string;

    attributes: Attribute[] = [];
}