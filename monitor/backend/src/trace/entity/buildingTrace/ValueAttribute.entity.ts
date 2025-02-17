import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
//import { ArrayValueAttribute } from "./ArrayValueAttribute.entity";
import { AttributeEntity } from "./Attribute.entity";
@Entity({name: 'valueattributes'})

export class ValueAttributeEntity {

    @ManyToOne(() => AttributeEntity, (attribute) => attribute.value)
    @JoinColumn({name: "attributeId"})
    attribute:AttributeEntity;
    @Column()
    attributeId:string;
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    stringValue: string;

    @Column({nullable: true})
    intValue: number;

    @Column({nullable: true})
    boolValue: boolean;
/*
    @ManyToOne(() => ArrayValueAttribute, (arrayValueAttribute) => arrayValueAttribute.values)
    @JoinColumn({name: "arrayValueAttributeId"})
    
    @OneToOne(() => ArrayValueAttribute, (arrayValueAttribute) => arrayValueAttribute.values, { cascade: true, onDelete: 'CASCADE', nullable: true })
    //@JoinColumn({name: "arrayValueAttributeId"})
    arrayValue: ArrayValueAttribute;

    @Column({nullable: true})
    arrayAttributeId: string;
*/
}