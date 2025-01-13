import {IsNotEmpty, IsOptional } from "class-validator";

export class CriaTraceDTO {
  @IsOptional()
  trace: string;
}