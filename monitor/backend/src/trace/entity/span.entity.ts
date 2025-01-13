import {Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from 'typeorm'
import { ScopeSpanEntity } from './scopeSpan.entity';

@Entity({name: 'spans'})
export class SpanEntity {

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;

    @Column({name: 'trace_id', length: 100, nullable: false})
    traceID: string;
    
    @Column({name: 'span_id', length: 100, nullable: false, primary: true})
    spanID: string;
    
    @Column({name: 'parent_id', length: 100, nullable: true})
    parentID: string;

    @Column()
    scopeSpanId: string;
    
    @ManyToOne(() => ScopeSpanEntity, (scopeSpan) => scopeSpan.span)
    @JoinColumn({name: "scopeSpanId"})
    scopeSpan:ScopeSpanEntity;

    @Column({ type: 'jsonb', name: 'spanAttributes', nullable: true })
    spanAttributes:  {key: string; value: { [type: string]: string | number }}[] = [];

}