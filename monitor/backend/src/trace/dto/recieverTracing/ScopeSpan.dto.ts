
import {IsNotEmpty, IsOptional} from "class-validator";
import { Scope } from "./Scope.dto";
import { Span } from "./Span.dto";

export class ScopeSpan {

    @IsNotEmpty()
    scope: Scope;
    
    @IsNotEmpty()
    spans: Span[] = [];
}