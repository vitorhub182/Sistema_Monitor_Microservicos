import { Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Entity, Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { ResourceSpanEntity } from "../entity/resourceSpan.entity";
import { TraceEntity } from "../entity/trace.entity";
import { Data } from "../dto/recieverTracing/Data.dto";
import { Recieve } from "../entity/buildingTrace/Recieve.entity";

@Injectable()
export class TraceService{
    constructor(
    
        @InjectRepository(Recieve)
        private readonly recieveRepository: Repository<Recieve>,
    
    private configService: ConfigService,
    ){}

    async salvar(dadosTrace: any){

        try{
            const TraceSalvo = await this.recieveRepository.save(dadosTrace);
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