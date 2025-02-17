
import {IsNotEmpty, IsOptional} from "class-validator";
import { ScopeEntity } from "./Scope.entity";
import { SpanEntity } from "./Span.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResourceSpanEntity } from "./ResourceSpan.entity";

@Entity({name: 'scopespans'})
export class ScopeSpanEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ResourceSpanEntity, (resourceSpan) => resourceSpan.scopeSpans)
    @JoinColumn({name: "resourceSpanId"})
    resourceSpan:ResourceSpanEntity;
    @Column()
    resourceSpanId: string;

    @OneToMany(() => SpanEntity, (span) => span.scopeSpan,  { cascade: true, onDelete: 'CASCADE' })
    spans: SpanEntity[];

    @OneToOne(() => ScopeEntity, (scope) => scope.scopeSpan,  { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({name: "scopeId"})
    scope: ScopeEntity;
    @Column()
    scopeId: string;
    
}