"use client"
import React, { useEffect, useState,} from "react";
import {SelecaoGenerica} from "@/components/log/selecaoGenerica";
import { LogTableComplet } from "@/components/log/log-table-complet";
import { CalendarInic } from "@/components/filtro/CalendarInic";
import { CalendarFinal } from "@/components/filtro/CalendarFinal";
import { Intervalo } from "@/dto/intervalo";
import { Button } from "@/components/ui/button";
import { ObjGen } from "@/dto/objetoGenerico";
import { listaFiltrosLog } from "@/services/logService";
import { FiltroLogInterface, RetornoFiltroLogInterface } from "@/dto/filtros";


const Home = () => {
  const [key, setKey] = React.useState(0);
  const [intervalo, setIntervalo] = useState<Intervalo> ();
  const [filtro, setFiltro] = useState<  FiltroLogInterface >()

  const [ dadosIniciais, setDadosIniciais] = useState < RetornoFiltroLogInterface | null >(null)

  useEffect(() => {
    async function buscaDadosIniciais() {
      try {
        const dados = await listaFiltrosLog();
        setDadosIniciais(dados);
      } catch (error) {
        console.error("Erro ao realizar busca inicial:", error);
        setDadosIniciais(null);
      }
    }
    buscaDadosIniciais();
  }, []);

  const ServicoSelecionado = (info: ObjGen) => {
    setFiltro(prev => ({
      ...(prev ?? {}),         
      servico: info.value
    } as FiltroLogInterface));
  };
  const NivelSelecionado = (info: ObjGen) => {
    setFiltro(prev => ({
      ...(prev ?? {}),         
      nivel: info.value
    } as FiltroLogInterface));
  };
  const HostnameSelecionado = (info: ObjGen) => {
    setFiltro(prev => ({
      ...(prev ?? {}),         
      hostname: info.value
    } as FiltroLogInterface));
  };
  const IdContainerSelecionado = (info: ObjGen) => {
    setFiltro(prev => ({
      ...(prev ?? {}),         
      idContainer: info.value
    } as FiltroLogInterface));
  };
  const buscaLog = (key: any) => {
    setKey(prev => prev + 1);
  }
  return (
    <div className=" grid grid-rows-[auto_1fr_auto] grid-cols-6 gap-10 p-4 bg-white">
      { dadosIniciais?.servico !== undefined ?
      <div className="col-span-1 flex gap-2 items-center">
         Serviço <SelecaoGenerica lista={dadosIniciais?.servico} onSubmit={ServicoSelecionado} />
      </div>
      : null
      }
      { dadosIniciais?.nivel !== undefined ?
      <div className="col-span-1 flex  gap-2 items-center">
        Nivel <SelecaoGenerica lista={dadosIniciais?.nivel} onSubmit={NivelSelecionado} />
      </div>
      : null
      }
      { dadosIniciais?.hostname !== undefined ?
      <div className="col-span-1 flex  gap-2 items-center">
        Hostname <SelecaoGenerica lista={dadosIniciais?.hostname} onSubmit={HostnameSelecionado} />
      </div>
      : null
      }
      { dadosIniciais?.idContainer !== undefined ?
      <div className="col-span-1 flex  gap-2 items-center">
        IdContainer <SelecaoGenerica lista={dadosIniciais?.idContainer} onSubmit={IdContainerSelecionado} />
      </div> : null
      }
      <div className="col-span-6 flex items-center gap-x-4">
          <CalendarInic 
          onDateTimeChange= {(dateISO: string) => {
            setIntervalo(prev => ({
              ...(prev ?? {}),         
              tempoInicial: dateISO
            } as Intervalo));
          }}
          ></CalendarInic>
          <CalendarFinal
          onDateTimeChange= {(dateISO: string) => {
            setIntervalo(prev => ({
              ...(prev ?? {}),         
              tempoFinal: dateISO
            } as Intervalo));
          }}
          ></CalendarFinal>
          <Button onClick={buscaLog}>Buscar</Button>
      </div>
         <div className="col-span-6 border border-gray-300 rounded p-4">

        <LogTableComplet
          key={key}
          tempoI={intervalo?.tempoInicial}
          tempoF={intervalo?.tempoFinal}
          filtros={filtro}
        />
      </div>
    </div>
  );
};

export default Home;