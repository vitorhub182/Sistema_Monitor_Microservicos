import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {IsNotEmpty, IsOptional} from "class-validator";
import { SpanEntity } from "./Span.entity";
@Entity({name: 'status'})
export class StatusEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => SpanEntity, (span) => span.status)
//    @JoinColumn({name: "spanId"})
    span: SpanEntity;
//    @Column()
//    spanId: string;

    @Column({nullable: true})
    code: number;

}