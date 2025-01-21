import { Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
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
            console.log(error);

            if (error instanceof NotFoundException) {
              throw error;
            }
            throw new InternalServerErrorException('Erro ao salvar trace');
        }
    }
}