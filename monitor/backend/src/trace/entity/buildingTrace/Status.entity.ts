import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {IsNotEmpty, IsOptional} from "class-validator";
import { Span } from "./Span.entity";
@Entity({name: 'status'})
export class Status {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsNotEmpty()
    @OneToOne(() => Span, (span) => span.status)
    span: Span;

    @Column()
    code?: number;

}