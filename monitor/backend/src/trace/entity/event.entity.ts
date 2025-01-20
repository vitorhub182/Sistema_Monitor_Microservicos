import {Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from 'typeorm'
import { ScopeSpanEntity } from './scopeSpan.entity';
import { SpanEntity } from './span.entity';

@Entity({name: 'events'})
export class EventEntity {

    @ManyToOne(() => SpanEntity, (span) => span.events)
    @JoinColumn({name: "spanId"})
    span:SpanEntity;
    @Column()
    spanId: string;



    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;

    @Column({name: 'EventTime', nullable: false})
    timeUnixNano: Date;

    @Column({length: 100, nullable: false})
    name: string;

    // ------ Variable Attributes -------------------------------------------------

    @Column({ length: 300, nullable: true})
    exception_message: string;

    @Column({length: 200, nullable: true })
    exception_type: string;
}