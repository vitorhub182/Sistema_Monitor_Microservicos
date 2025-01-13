import { Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { ResourceSpanEntity } from "./entity/resourceSpan.entity";
import { ResourceEntity } from "./entity/resource.entity";
import { ScopeSpanEntity } from "./entity/scopeSpan.entity";
import { SpanEntity } from "./entity/span.entity";
import { CriaTraceDTO } from "./dto/CriaTrace.dto";

@Injectable()
export class TraceService{
    constructor(
    @InjectRepository(ResourceSpanEntity)
        private readonly resourceSpanRepository: Repository<ResourceSpanEntity>,

    @InjectRepository(ResourceEntity)
        private readonly resourceRepository: Repository<ResourceEntity>,
        
    @InjectRepository(ScopeSpanEntity)
        private readonly scopeSpanRepository: Repository<ScopeSpanEntity>,
        
    @InjectRepository(SpanEntity)
        private readonly spanRepository: Repository<SpanEntity>,
        
    private configService: ConfigService,
    ){}

    async salvar(dadosTrace: any){

        try{
            const TraceSalvo = await this.resourceSpanRepository.save(dadosTrace);
            return TraceSalvo;

        } catch (error) {
            if (error instanceof NotFoundException) {
              throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('Erro ao salvar trace');
        }
    }


}