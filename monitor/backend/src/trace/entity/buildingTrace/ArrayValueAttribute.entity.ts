

/*
import { ValueAttributeEntity } from "./ValueAttribute.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'arrayvalueattribute'})

export class ArrayValueAttribute {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => ValueAttributeEntity, (valueattribute) => valueattribute.)
    valueAttribute:ValueAttributeEntity;

    @OneToMany(() => ValueAttributeEntity, (valueattribute) => valueattribute.arrayValue, )
    values: ValueAttributeEntity[];
}
*/