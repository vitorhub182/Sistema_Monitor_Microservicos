"use client";
import React, { useEffect, useRef, useState } from "react";
import { AmbienteGrafico } from "@/components/metrica/AmbienteGrafico";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AmbienteGraficoProps } from "@/dto/metrica";
import { getListaServico } from "@/services/MetricaService";

const Home = () => {
  const [insumoGrafico, setInsumoGrafico] = useState<AmbienteGraficoProps | null>( 
    {
      servicoNome: "",
      rotaNome: "",
      listaServico: []
    } 
  )
  const [loading, setLoading] = useState(true);


  React.useEffect(() => {
    async function fetchData() {
      try {
        const resultado: [] = await getListaServico();
         setInsumoGrafico((prev) =>
           prev
             ? { ...prev, listaServico: resultado }
             : { servicoNome: "", rotaNome: "", listaServico: resultado}
         );
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Carregando gráficos...
      </div>
    );
  }
  
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-2 p-2 bg-white rounded-lg border"
    >
      {" "}
      <ResizablePanel defaultSize={50}>
        <div className="col-span-1 border border-gray-300 rounded p-4 h-full">
          <AmbienteGrafico
            graficoInicial={"Chamadas"}
            parametros={insumoGrafico}
          />
        <AmbienteGrafico
            graficoInicial={"Uso de CPU"}
            parametros={insumoGrafico}
          /> 
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="col-span-1 border border-gray-300 rounded p-4 h-full">
          <AmbienteGrafico
            graficoInicial={"Radar Chamadas"}
            parametros={insumoGrafico}
          />
          <AmbienteGrafico
            graficoInicial={"Requisições"}
            parametros={insumoGrafico}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Home;
