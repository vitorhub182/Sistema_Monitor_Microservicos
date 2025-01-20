import {Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm'
import { ScopeSpanEntity } from './scopeSpan.entity';
import { TraceEntity } from './trace.entity';
import { ValueAttribute } from '../dto/recieverTracing/ValueAttribute.dto';

@Entity({name: 'resourcespans'})
export class ResourceSpanEntity {

    @ManyToOne(() => TraceEntity, (trace) => trace.resourceSpans)
    @JoinColumn({name: "traceId"})
    trace:TraceEntity;
    @Column()
    traceId: string;

    @OneToMany(() => ScopeSpanEntity, (scopeSpan) => scopeSpan.resourceSpan, {cascade: true, onDelete: 'CASCADE'})
    scopeSpan: ScopeSpanEntity[];


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;

    @Column({name: 'schemaurl', length: 100, nullable: false})
    schemaUrl: string;

    // ------ Variable Attributes -------------------------------------------------
    @Column({length: 100, nullable: true})
    container_id: string;
    @Column({length: 100, nullable: true})
    host_arch: string;
    @Column({length: 100, nullable: true})
    host_name: string;
    @Column({length: 100, nullable: true})
    os_description: string;
    @Column({length: 100, nullable: true})
    os_type: string;
    @Column({length: 300, nullable: true})
    process_command_args: string;
    //.join(" ");
}