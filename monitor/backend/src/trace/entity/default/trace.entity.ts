import {Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { ResourceSpanEntity } from './resourceSpan.entity';

@Entity({name: 'traces'})
export class TraceEntity {

    @OneToMany(() => ResourceSpanEntity, (resourceSpan) => resourceSpan.trace, {cascade: true, onDelete: 'CASCADE'})
    resourceSpans: ResourceSpanEntity[];

    @Column({length: 100, nullable: false, primary: true})
    id: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;
}