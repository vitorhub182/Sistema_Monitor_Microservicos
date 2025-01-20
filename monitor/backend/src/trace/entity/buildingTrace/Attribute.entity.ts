import {IsOptional} from "class-validator";
import { ValueAttribute } from "./ValueAttribute.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event.entity";
import { Resource } from "./Resource.entity";
import { Span } from "./Span.entity";

@Entity({name: 'attribute'})

export class Attribute {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => ValueAttribute, (valueattribute) => valueattribute.attribute,  { cascade: true, onDelete: 'CASCADE' })
    value: ValueAttribute;

    @ManyToOne(() => Event, (event) => event.attributes)
    @JoinColumn({name: "eventId"})
    event:Event;
    @Column()
    eventId: string;


    @ManyToOne(() => Resource, (resource) => resource.attributes)
    @JoinColumn({name: "resourceId"})
    resource:Resource;
    @Column()
    resourceId: string;


    @ManyToOne(() => Span, (span) => span.attributes)
    @JoinColumn({name: "spanId"})
    span:Span;
    @Column()
    spanId: string;

    key: string;
}