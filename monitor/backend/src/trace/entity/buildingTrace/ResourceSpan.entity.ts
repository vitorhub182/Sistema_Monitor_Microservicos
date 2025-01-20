import {IsNotEmpty, IsOptional} from "class-validator";
import { Attribute } from "./Attribute.entity";
import { Resource } from "./Resource.entity";
import { ScopeSpan } from "./ScopeSpan.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recieve } from "./Recieve.entity";

@Entity({name: 'resourcespans'})

export class ResourceSpan {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Recieve, (recieve) => recieve.resourceSpans)
    @JoinColumn({name: "recieveId"})
    recieve:Recieve;
    @Column()
    recieveId: string;

    @IsNotEmpty()
    @OneToMany(() => ScopeSpan, (scopeSpan) => scopeSpan.resourceSpan,  { cascade: true, onDelete: 'CASCADE' })
    scopeSpans: ScopeSpan[];
    
    @IsNotEmpty()
    @OneToOne(() => Resource, (resource) => resource.resourceSpan,  { cascade: true, onDelete: 'CASCADE' })
    resource: Resource;

    

    schemaUrl: string;
    
}