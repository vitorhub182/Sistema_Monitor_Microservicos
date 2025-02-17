import {IsNotEmpty, IsOptional} from "class-validator";
import { Attribute } from "./Attribute.dto";

export class Resource {

    @IsNotEmpty()
    attributes: Attribute[] = [];

}