import {IsNotEmpty, IsOptional} from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ScopeSpan } from "./ScopeSpan.entity";

@Entity({name: 'scopes'})
export class Scope {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @Column()
    version: string;

    @IsNotEmpty()
    @OneToOne(() => ScopeSpan, (scopeSpan) => scopeSpan.scope)
    scopeSpan: ScopeSpan;

}