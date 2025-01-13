import {Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm'
import { SpanEntity } from './span.entity';
import { ResourceSpanEntity } from './resourceSpan.entity';

@Entity({name: 'scopespans'})
export class ScopeSpanEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;

    @Column()
    resourceSpanId: string;

    @Column({name: 'name', length: 200, nullable: false})
    name: string;

    @Column({name: 'version', length: 200, nullable: false})
    version: string;

    @ManyToOne(() => ResourceSpanEntity, (resourceSpan) => resourceSpan.scopeSpan)
    @JoinColumn({name: "resourceSpanId"})
    resourceSpan:ResourceSpanEntity;

    @OneToMany(() => SpanEntity, (scope) => scope.scopeSpan,  { cascade: true, onDelete: 'CASCADE' })
    span: SpanEntity[];
}