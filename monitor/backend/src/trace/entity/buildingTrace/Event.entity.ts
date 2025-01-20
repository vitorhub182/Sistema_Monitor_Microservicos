import {IsNotEmpty, IsOptional} from "class-validator";
import { ValueAttribute } from "./ValueAttribute.entity";
import { Attribute } from "./Attribute.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Span } from "./Span.entity";


@Entity({name: 'events'})
export class Event {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Span, (span) => span.events)
    @JoinColumn({name: "spanId"})
    span:Span;
    @Column()
    spanId: string;

    @OneToMany(() => Attribute, (attribute) => attribute.event,  { cascade: true, onDelete: 'CASCADE' })
    attributes: Attribute[];
/*
    @IsNotEmpty()
    @Column()
    timeUnixNano: Date;
    */
    @IsNotEmpty()
    @Column()
    name: string;
}