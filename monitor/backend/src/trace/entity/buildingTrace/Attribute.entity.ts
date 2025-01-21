import { ValueAttributeEntity } from "./ValueAttribute.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./Event.entity";
import { ResourceEntity } from "./Resource.entity";
import { SpanEntity } from "./Span.entity";

@Entity({name: 'attribute'})

export class AttributeEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => ValueAttributeEntity, (valueattribute) => valueattribute.attribute,  { cascade: true, onDelete: 'CASCADE' })
    value:ValueAttributeEntity[];
    
    @ManyToOne(() => SpanEntity, (span) => span.attributes, {nullable: true})
    @JoinColumn({name: "spanId"})
    span:SpanEntity;
    @Column({nullable: true})
    spanId: string;

    @ManyToOne(() => EventEntity, (event) => event.attributes, {nullable: true})
    @JoinColumn({name: "eventId"})
    event:Event;
    @Column({name: "eventId", nullable: true})
    eventId: string;

    @ManyToOne(() => ResourceEntity, (resource) => resource.attributes, {nullable: true})
    @JoinColumn({name: "resourceId",})
    resource:ResourceEntity;
    @Column({nullable: true})
    resourceId: string;

    @Column()
    key: string;
}