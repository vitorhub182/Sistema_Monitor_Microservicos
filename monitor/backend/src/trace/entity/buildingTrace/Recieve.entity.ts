import {IsNotEmpty } from "class-validator";
import { ResourceSpanEntity } from "./ResourceSpan.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'recieves'})
export class RecieveEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

    @OneToMany(() => ResourceSpanEntity, (resourceSpan) => resourceSpan.recieve,  { cascade: true, onDelete: 'CASCADE' })
    resourceSpans: ResourceSpanEntity[];
}