import {IsEmpty, IsNotEmpty, IsOptional} from "class-validator";
import { AttributeEntity } from "./Attribute.entity";
import { EventEntity } from "./Event.entity";
import { StatusEntity } from "./Status.entity";

import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ScopeSpanEntity } from "./ScopeSpan.entity";

@Entity({name: 'spans'})
export class SpanEntity {

    @ManyToOne(() => ScopeSpanEntity, (scopeSpan) => scopeSpan.spans)
    @JoinColumn({name: "scopeSpanId"})
    scopeSpan:ScopeSpanEntity;
    @Column()
    scopeSpanId: string;

    @OneToMany(() => EventEntity, (event) => event.span,  { cascade: true, onDelete: 'CASCADE', nullable:true })
    events: Event[];
    
    @Column()
    traceId: string;
    
    @Column()
    spanId: string;
    
    @Column({ primary: true})
    parentSpanId: string;

    @Column()
    flags: number;
    
    @Column()
    name: string;

    @Column()
    kind:number;
/*
    @IsNotEmpty()
    @Column()
    startTimeUnixNano: Date
    
    @IsNotEmpty()
    @Column()
    endTimeUnixNano: Date

*/ 
    @OneToMany(() => AttributeEntity, (attribute) => attribute.event,  { cascade: true, onDelete: 'CASCADE' })
    attributes: AttributeEntity[];

    @OneToOne(() => StatusEntity, (status) => status.span,  { cascade: true, onDelete: 'CASCADE', nullable: true })
    @JoinColumn({name: "statusId"})
    status: StatusEntity;
    @Column()
    statusId: string;
}