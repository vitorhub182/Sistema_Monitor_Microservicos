import {IsNotEmpty, IsOptional} from "class-validator";
import { AttributeEntity } from "./Attribute.entity";
import { ResourceEntity } from "./Resource.entity";
import { ScopeSpanEntity } from "./ScopeSpan.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RecieveEntity } from "./Recieve.entity";

@Entity({name: 'resourcespans'})

export class ResourceSpanEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => RecieveEntity, (recieve) => recieve.resourceSpans)
    @JoinColumn({name: "recieveId"})
    recieve:RecieveEntity;
    @Column()
    recieveId: string;

    @OneToMany(() => ScopeSpanEntity, (scopeSpan) => scopeSpan.resourceSpan,  { cascade: true, onDelete: 'CASCADE' })
    scopeSpans: ScopeSpanEntity[];
    
    @OneToOne(() => ResourceEntity, (resource) => resource.resourceSpan,  { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({name: "resourceId"})
    resource: ResourceEntity;
    @Column()
    resourceId: string;

    schemaUrl: string;
    
}