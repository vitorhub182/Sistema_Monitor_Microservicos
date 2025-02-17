import {Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm'
import { SpanEntity } from './span.entity';
import { ResourceSpanEntity } from './resourceSpan.entity';

@Entity({name: 'scopespans'})
export class ScopeSpanEntity {

    @ManyToOne(() => ResourceSpanEntity, (resourceSpan) => resourceSpan.scopeSpan)
    @JoinColumn({name: "resourceSpanId"})
    resourceSpan:ResourceSpanEntity;
    @Column()
    resourceSpanId: string;

    @OneToMany(() => SpanEntity, (span) => span.scopeSpan,  { cascade: true, onDelete: 'CASCADE' })
    span: SpanEntity[];

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;

    @Column({length: 200, nullable: false})
    name: string;

    @Column({length: 200, nullable: false})
    version: string;

    // ------ Variable Attributes -------------------------------------------------


}