import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TraceController } from "./trace.controller";

import { TraceService } from "./trace.service";
import { AuthModule } from "src/auth/auth.module";
import { ResourceSpanEntity } from "./entity/resourceSpan.entity";
import { ScopeSpanEntity } from "./entity/scopeSpan.entity";
import { SpanEntity } from "./entity/span.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature
        ([
            ResourceSpanEntity,
            ScopeSpanEntity,
            SpanEntity,
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