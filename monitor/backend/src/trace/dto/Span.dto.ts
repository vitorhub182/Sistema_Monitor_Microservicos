import {IsNotEmpty, IsOptional} from "class-validator";
import { Attribute } from "./Attribute.dto";

export class Span {
    
    @IsNotEmpty()
    traceId: string;
    
    @IsNotEmpty()
    spanId: string;

    @IsOptional()
    parentSpanId: string;

    flags: number;
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    kind:number;

    @IsNotEmpty()
    startTimeUnixNano: BigInt
    
    @IsNotEmpty()
    endTimeUnixNano: BigInt

    @IsNotEmpty()
    attributes: Attribute[] = [];
    
}