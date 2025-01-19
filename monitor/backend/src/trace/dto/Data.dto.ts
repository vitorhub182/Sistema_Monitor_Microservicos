import {IsNotEmpty } from "class-validator";
import { ResourceSpan } from "./ResourceSpan.dto";

export class Data {
  @IsNotEmpty()
  resourceSpans: ResourceSpan[] = [];
}