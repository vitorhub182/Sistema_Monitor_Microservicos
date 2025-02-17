import {IsNotEmpty, IsOptional} from "class-validator";
import { ValueAttributeEntity } from "./ValueAttribute.entity";
import { AttributeEntity } from "./Attribute.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SpanEntity } from "./Span.entity";


@Entity({name: 'events'})
export class EventEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => SpanEntity, (span) => span.events)
    @JoinColumn({name: "spanId"})
    span:SpanEntity;
    @Column()
    spanId: string;

    @OneToMany(() => AttributeEntity, (attribute) => attribute.event,  { cascade: true, onDelete: 'CASCADE' })
    attributes: AttributeEntity[];
/*
    @Column()
    timeUnixNano: Date;
    */

    @Column()
    name: string;
}