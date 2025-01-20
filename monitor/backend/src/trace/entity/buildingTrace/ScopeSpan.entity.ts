
import {IsNotEmpty, IsOptional} from "class-validator";
import { Scope } from "./Scope.entity";
import { Span } from "./Span.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResourceSpan } from "./ResourceSpan.entity";

@Entity({name: 'scopespans'})
export class ScopeSpan {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ResourceSpan, (resourceSpan) => resourceSpan.scopeSpans)
    @JoinColumn({name: "resourceSpanId"})
    resourceSpan:ResourceSpan;
    @Column()
    resourceSpanId: string;

    @IsNotEmpty()
    @OneToMany(() => Span, (span) => span.scopeSpan,  { cascade: true, onDelete: 'CASCADE' })
    spans: Span[];

    @IsNotEmpty()
    @OneToOne(() => Scope, (scope) => scope.scopeSpan,  { cascade: true, onDelete: 'CASCADE' })
    scope: Scope;
    
    
}