import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm'
import { ResourceSpanEntity } from './resourceSpan.entity';

@Entity({name: 'resources'})
export class ResourceEntity {

    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;

    @Column()
    resourcespanId: string;

    @ManyToOne(() => ResourceSpanEntity, (resourcespan) => resourcespan.resource)
    @JoinColumn({name: "resourcespanId"})
    resourceSpan:ResourceSpanEntity;
}