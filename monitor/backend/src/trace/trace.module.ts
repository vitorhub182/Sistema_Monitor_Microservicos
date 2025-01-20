import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TraceController } from "./trace.controller";

import { TraceService } from "./service/trace.service";
import { AuthModule } from "src/auth/auth.module";
import { ResourceSpanEntity } from "./entity/resourceSpan.entity";
import { ScopeSpanEntity } from "./entity/scopeSpan.entity";
import { SpanEntity } from "./entity/span.entity";
import { TraceEntity } from "./entity/trace.entity";
import { EventEntity } from "./entity/event.entity";

import { Recieve } from "./entity/buildingTrace/Recieve.entity";
import { ResourceSpan } from "./entity/buildingTrace/ResourceSpan.entity";
import { Resource } from "./entity/buildingTrace/Resource.entity";
import { Scope } from "./entity/buildingTrace/Scope.entity";
import { ScopeSpan } from "./entity/buildingTrace/ScopeSpan.entity";
import { Span } from "./entity/buildingTrace/Span.entity";
import { Status } from "./entity/buildingTrace/Status.entity";
import { Event } from "./entity/buildingTrace/Event.entity";
import { Attribute } from "./entity/buildingTrace/Attribute.entity";
import { ArrayValueAttribute } from "./entity/buildingTrace/ArrayValueAttribute.entity";
import { ValueAttribute } from "./entity/buildingTrace/ValueAttribute.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature
        ([
            ResourceSpanEntity,
            ScopeSpanEntity,
            SpanEntity,
            TraceEntity,
            EventEntity,
            Resource,
            ResourceSpan,
            ArrayValueAttribute,
            Attribute,
            Recieve,
            Event,
            Scope,
            ScopeSpan,
            Span,
            Status,
            ValueAttribute,
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