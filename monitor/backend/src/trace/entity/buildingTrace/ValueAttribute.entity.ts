import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ArrayValueAttribute } from "./ArrayValueAttribute.entity";
import { Attribute } from "./Attribute.entity";
@Entity({name: 'valueattributes'})

export class ValueAttribute {
    
    @ManyToOne(() => Attribute, (attribute) => attribute.value)
    @JoinColumn({name: "attributeId"})
    attribute:Attribute;
    @Column()
    attributeId: string;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    stringValue?: string;

    @Column()
    intValue?: number;

    @Column()
    boolValue?: boolean;

    @ManyToOne(() => ArrayValueAttribute, (arrayValueAttribute) => arrayValueAttribute.values)
    @JoinColumn({name: "arrayValueAttributeId"})

    @OneToOne(() => ArrayValueAttribute, (arrayValueAttribute) => arrayValueAttribute.values)
    arrayValue?: ArrayValueAttribute;

    @Column()
    arrayAttributeId: string;

    




}