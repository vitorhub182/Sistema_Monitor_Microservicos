"use client";
import React, { useEffect, useState } from "react";
import { SelecaoGenerica } from "@/components/Auxiliar/selecaoGenerica";
import { LogTableComplet } from "@/components/registro/log-table-complet";
import { Calendario } from "@/components/Auxiliar/Calendar";
import { Intervalo } from "@/dto/intervalo";
import { Button } from "@/components/ui/button";
import { ObjGen } from "@/dto/objetoGenerico";
import { getLogMetricas, listaFiltrosLog } from "@/services/logService";
import { FiltroLogInterface, RetornoFiltroLogInterface } from "@/dto/filtros";
import { LogGraficBar } from "@/components/registro/log-graficBar";
import { ChartRow } from "@/components/Auxiliar/TiposEspeciais";

const Home = () => {
  const [key, setKey] = React.useState(0);
  const [intervalo, setIntervalo] = useState<Intervalo>();
  const [filtro, setFiltro] = useState<FiltroLogInterface>();
  const [dadosIniciais, setDadosIniciais] =
    useState<RetornoFiltroLogInterface | null>(null);
  const [dadosMetricos, setDadosMetricos] = useState<ChartRow[]>([]);
  const [range, setRange] = useState<number>(90);
  useEffect(() => {
    async function buscaDadosIniciais() {
      try {
        const dados = await listaFiltrosLog();
        setDadosIniciais(dados);
      } catch (error) {
        console.error("Erro ao realizar busca inicial de logs:", error);
        setDadosIniciais(null);
      }
    }
    buscaDadosIniciais();
  }, []);

  useEffect(() => {
    async function buscaDadosMetricos() {
      try {
        const dados = await getLogMetricas(range);
        console.log(dados);
        setDadosMetricos(dados);
      } catch (error) {
        console.error("Erro ao buscar metricas:", error);
      }
    }
    buscaDadosMetricos();
  }, [range]);

  const ServicoSelecionado = (info: ObjGen) => {
    setFiltro(
      (prev) =>
        ({
          ...(prev ?? {}),
          servico: info.value,
        } as FiltroLogInterface)
    );
  };
  const NivelSelecionado = (info: ObjGen) => {
    setFiltro(
      (prev) =>
        ({
          ...(prev ?? {}),
          nivel: info.value,
        } as FiltroLogInterface)
    );
  };
  const buscaLog = (key: any) => {
    setKey((prev) => prev + 1);
  };
  return (
    <div className=" grid grid-rows-[auto_1fr_auto] grid-cols-6 gap-10 p-4 bg-white">
      <div className="col-span-6 border border-gray-300 rounded p-4">
        <LogGraficBar dados={dadosMetricos}></LogGraficBar>
      </div>
      {dadosIniciais?.servico !== undefined ? (
        <div className="col-span-1 flex  border-gray-300 rounded gap-2 items-center">
          Serviço{" "}
          <SelecaoGenerica
            lista={dadosIniciais?.servico}
            onSubmit={ServicoSelecionado}
          />
        </div>
      ) : null}
      {dadosIniciais?.nivel !== undefined ? (
        <div className="col-span-1 flex  gap-2 items-center">
          Nivel{" "}
          <SelecaoGenerica
            lista={dadosIniciais?.nivel}
            onSubmit={NivelSelecionado}
          />
        </div>
      ) : null}
      <div className="col-span-6 flex items-center gap-x-4">
        <Calendario
          tituloPadrao={"Data inicial"}
          onDateTimeChange={(dateISO: string) => {
            setIntervalo(
              (prev) =>
                ({
                  ...(prev ?? {}),
                  tempoInicial: dateISO,
                } as Intervalo)
            );
          }}
        ></Calendario>
        <Calendario
          tituloPadrao={"Data final"}
          onDateTimeChange={(dateISO: string) => {
            setIntervalo(
              (prev) =>
                ({
                  ...(prev ?? {}),
                  tempoFinal: dateISO,
                } as Intervalo)
            );
          }}
        ></Calendario>
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
