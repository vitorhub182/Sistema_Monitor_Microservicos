import {IsNotEmpty, IsOptional} from "class-validator";
import { Attribute } from "./Attribute.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResourceSpan } from "./ResourceSpan.entity";

@Entity({name: 'resources'})

export class Resource {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsNotEmpty()
    @OneToMany(() => Attribute, (attribute) => attribute.resource,  { cascade: true, onDelete: 'CASCADE' })
    attributes: Attribute[];

    @IsNotEmpty()
    @OneToOne(() => ResourceSpan, (resourceSpan) => resourceSpan.resource)
    resourceSpan: ResourceSpan;
}