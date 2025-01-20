import {IsEmpty, IsNotEmpty, IsOptional} from "class-validator";
import { Attribute } from "./Attribute.dto";
import { Event } from "./Event.dto";
import { Status } from "./Status.dto";

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
    startTimeUnixNano: bigint
    
    @IsNotEmpty()
    endTimeUnixNano: bigint

    @IsNotEmpty()
    attributes: Attribute[] = [];
    
    @IsOptional()
    events: Event[] = [];

    status?: Status = null;
}