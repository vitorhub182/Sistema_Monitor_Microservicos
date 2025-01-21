/*
import { ValueAttribute } from "./ValueAttribute.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'arrayvalueattribute'})

export class ArrayValueAttribute {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => ValueAttribute, (valueattribute) => valueattribute.arrayValue)
    valueAttribute:ValueAttribute;

    
    @OneToMany(() => ValueAttribute, (valueattribute) => valueattribute.arrayValue, )
    values: ValueAttribute[];
}
*/