import {IsNotEmpty } from "class-validator";
import { ResourceSpan } from "./ResourceSpan.dto";

export class Receive {
  @IsNotEmpty()
  resourceSpans: ResourceSpan[] = [];
}