import {IsNotEmpty, IsOptional} from "class-validator";
import { AttributeEntity } from "./Attribute.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResourceSpanEntity } from "./ResourceSpan.entity";

@Entity({name: 'resources'})

export class ResourceEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => AttributeEntity, (attribute) => attribute.resource,  { cascade: true, onDelete: 'CASCADE' })
    attributes: AttributeEntity[];

    @OneToOne(() => ResourceSpanEntity, (resourceSpan) => resourceSpan.resource)
//    @JoinColumn({name: "resourceSpanId"})
    resourceSpan: ResourceSpanEntity;
//    @Column()
//    resourceSpanId: string 
}
