import {IsNotEmpty, IsOptional} from "class-validator";
import { Attribute } from "./Attribute.dto";
import { Resource } from "./Resource.dto";
import { ScopeSpan } from "./ScopeSpan.dto";

export class ResourceSpan {

    @IsNotEmpty()
    resource: Resource;

    @IsNotEmpty()
    scopeSpans: ScopeSpan[] = [];

    schemaUrl: string;
    
}