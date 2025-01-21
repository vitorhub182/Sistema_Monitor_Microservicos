import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { Attribute } from "../dto/recieverTracing/Attribute.dto";
import { ValueAttribute } from "../dto/recieverTracing/ValueAttribute.dto";
import { Receive } from "../dto/recieverTracing/Receive.dto";
import { ResourceSpan } from "../dto/recieverTracing/ResourceSpan.dto";
import { RecieveEntity } from "../entity/buildingTrace/Recieve.entity";

export function convertValues(data: Receive) {
    try{
        let dadoFormatado = new RecieveEntity;

        dadoFormatado.resourceSpans[0].scopeSpans[0].spans[0].attributes[0].value

        data.resourceSpans.forEach(( resourceSpan: ResourceSpan, indexRS) => {
            resourceSpan.resource.attributes.forEach(( attribute: Attribute, indexA) => {
                attribute.value.arrayValue?.values.forEach((
                    dadoFormatado.resourceSpans[0].scopeSpans[0].spans[0].attributes[0].value
                ))
            })
        })
        if( data.value.arrayValue === null){
            throw new ExceptionsHandler;
        }
        let valueFormatted: ValueAttribute[] = [];
        arrayAttributeValue.value.arrayValue.values.forEach((attribute: ValueAttribute, index) => {
            valueFormatted[index].boolValue = attribute.boolValue;
            valueFormatted[index].intValue = attribute.intValue;
            valueFormatted[index].stringValue = attribute.stringValue;
          });

        return valueFormatted;
} catch (error){
    console.log(error);
    return null;
}    
}
