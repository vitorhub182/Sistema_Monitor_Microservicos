import { ObjGen } from "./objetoGenerico"

export interface FiltroLogInterface {
    servico: string,
    nivel: string, 
    hostname: string, 
    idContainer : string
  }

  export interface RetornoFiltroLogInterface {
    servico?: ObjGen[],
    nivel?: ObjGen[], 
    hostname?: ObjGen[], 
    idContainer? : ObjGen[]  
}