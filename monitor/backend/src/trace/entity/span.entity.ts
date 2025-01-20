import {Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from 'typeorm'
import { ScopeSpanEntity } from './scopeSpan.entity';
import { EventEntity } from './event.entity';

@Entity({name: 'spans'})
export class SpanEntity {

    @ManyToOne(() => ScopeSpanEntity, (scopeSpan) => scopeSpan.span)
    @JoinColumn({name: "scopeSpanId"})
    scopeSpan:ScopeSpanEntity;
    @Column()
    scopeSpanId: string;

    @OneToMany(() => EventEntity, (event) => event.span,  { cascade: true, onDelete: 'CASCADE' })
    events: EventEntity[];


    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;
    
    @Column({name: 'span_id', length: 100, nullable: false, primary: true})
    spanID: string;
    
    @Column({name: 'parent_id', length: 100, nullable: true})
    parentID: string;

    @Column({nullable: true})
    status: number;


    // ------ Variable Attributes -------------------------------------------------
    
    @Column({ nullable: true})
    thread_id: number;

    @Column({length: 200, nullable: true })
    thread_name: string;

    @Column({length: 100, nullable: true })
    code_function: string;

    @Column({ nullable: true })
    network_peer_port: number;
    
    @Column({length: 100, nullable: true })
    http_route: string;

    @Column({length: 100, nullable: true })
    http_request_method: string;
    
    @Column({length: 100, nullable: true })
    url_path: string;

    @Column({length: 100, nullable: true })
    error_type: string;
    
    @Column({length: 100, nullable: true })
    network_peer_address: string;

    @Column({length: 100, nullable: true })
    server_address: string;

    @Column({length: 100, nullable: true })
    client_address: string;

    @Column({length: 100, nullable: true })
    url_scheme: string;

    @Column({ nullable: true })
    http_response_status_code: number;
    
    @Column({ nullable: true })
    server_port: number;
    
    @Column({length: 100, nullable: true })
    network_protocol_version: string;
    
    @Column({length: 100, nullable: true })
    user_agent_original: string;

    @Column({length: 100, nullable: true })
    db_connection_string: string;

    @Column({length: 100, nullable: true })
    db_user: string;
    
    @Column({length: 100, nullable: true })
    db_statement: string;
    
    @Column({length: 100, nullable: true })
    db_system: string;
    
    @Column({length: 100, nullable: true })
    db_sql_table: string;
    
    @Column({length: 100, nullable: true })
    db_operation: string;
}