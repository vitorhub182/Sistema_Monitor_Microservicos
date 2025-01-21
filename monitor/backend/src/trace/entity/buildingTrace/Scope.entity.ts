import {IsNotEmpty, IsOptional} from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ScopeSpanEntity } from "./ScopeSpan.entity";

@Entity({name: 'scopes'})
export class ScopeEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    version: string;

    @OneToOne(() => ScopeSpanEntity, (scopeSpan) => scopeSpan.scope)
  //  @JoinColumn({name: "scopeSpanId"})
    scopeSpan: ScopeSpanEntity;
  //  @Column()
//    scopeSpanId: string;
}