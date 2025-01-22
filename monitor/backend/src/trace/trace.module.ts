/*
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TraceController } from "./trace.controller";

import { TraceService } from "./service/trace.service";
import { AuthModule } from "src/auth/auth.module";

import { RecieveEntity } from "./entity/buildingTrace/Recieve.entity";
import { ResourceSpanEntity } from "./entity/buildingTrace/ResourceSpan.entity";
import { ResourceEntity } from "./entity/buildingTrace/Resource.entity";
import { ScopeEntity } from "./entity/buildingTrace/Scope.entity";
import { ScopeSpanEntity } from "./entity/buildingTrace/ScopeSpan.entity";
import { SpanEntity } from "./entity/buildingTrace/Span.entity";
import { StatusEntity } from "./entity/buildingTrace/Status.entity";
import { EventEntity } from "./entity/buildingTrace/Event.entity";
import { AttributeEntity } from "./entity/buildingTrace/Attribute.entity";
import { ValueAttributeEntity } from "./entity/buildingTrace/ValueAttribute.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature
        ([
            ResourceSpanEntity,
            ScopeSpanEntity,
            SpanEntity,
            EventEntity,
            ResourceEntity,
            ResourceSpanEntity,
            AttributeEntity,
            RecieveEntity,
            Event,
            ScopeEntity,
            ScopeSpanEntity,
            SpanEntity,
            StatusEntity,
            ValueAttributeEntity,
        ]),
        forwardRef(() => AuthModule),
        
    ],
    controllers: [TraceController],
    providers:[
        TraceService,
    ],
    exports: [TypeOrmModule],
    
})

export class TraceModule {}
*/