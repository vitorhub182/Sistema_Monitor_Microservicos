import {IsNotEmpty } from "class-validator";
import { ResourceSpan } from "./ResourceSpan.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'recieves'})
export class Recieve {

  @PrimaryGeneratedColumn('uuid')
  id: string;

    @IsNotEmpty()
    @OneToMany(() => ResourceSpan, (resourceSpan) => resourceSpan.recieve,  { cascade: true, onDelete: 'CASCADE' })
    resourceSpans: ResourceSpan[];
}