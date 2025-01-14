import {Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { ScopeSpanEntity } from './scopeSpan.entity';

@Entity({name: 'resourcespans'})
export class ResourceSpanEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;

    @OneToMany(() => ScopeSpanEntity, (scopeSpan) => scopeSpan.resourceSpan, {cascade: true, onDelete: 'CASCADE'})
    scopeSpan: ScopeSpanEntity[];

    @Column({name: 'schemaurl', length: 100, nullable: false})
    schemaUrl: string;

    @Column({ type: 'jsonb', name: 'resourceAttributes', nullable: true })
    resourceAttributes: { key: string; value: { [type: string]: string | number } }[] = [];
}