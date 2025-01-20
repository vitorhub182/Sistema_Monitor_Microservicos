import {IsEmpty, IsNotEmpty, IsOptional} from "class-validator";
import { Attribute } from "./Attribute.entity";
import { Event } from "./Event.entity";
import { Status } from "./Status.entity";

import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ScopeSpan } from "./ScopeSpan.entity";

@Entity({name: 'spans'})
export class Span {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ScopeSpan, (scopeSpan) => scopeSpan.spans)
    @JoinColumn({name: "scopeSpanId"})
    scopeSpan:ScopeSpan;
    @Column()
    scopeSpanId: string;

    @OneToMany(() => Event, (event) => event.span,  { cascade: true, onDelete: 'CASCADE' })
    events: Event[];
    
    @IsNotEmpty()
    @Column()
    traceId: string;
    
    @IsNotEmpty()
    @Column()
    spanId: string;

    @IsOptional()
    @Column()
    parentSpanId: string;

    @Column()
    flags: number;
    
    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
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
    @OneToMany(() => Attribute, (attribute) => attribute.event,  { cascade: true, onDelete: 'CASCADE' })
    attributes: Attribute[];

    @IsNotEmpty()
    @OneToOne(() => Status, (status) => status.span,  { cascade: true, onDelete: 'CASCADE' })
    status?: Status;
}