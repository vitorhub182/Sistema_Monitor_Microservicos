import { ValueAttribute } from "./ValueAttribute.entity";
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'arrayvalueattribute'})

export class ArrayValueAttribute {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ValueAttribute, (valueattribute) => valueattribute.arrayValue)
    @JoinColumn({name: "valueAttributeId"})
    valueAttribute:ValueAttribute;
    @Column()
    valueAttributeId: string;

    @OneToMany(() => ValueAttribute, (valueattribute) => valueattribute.arrayValue,  { cascade: true, onDelete: 'CASCADE' })
    values: ValueAttribute[];
}