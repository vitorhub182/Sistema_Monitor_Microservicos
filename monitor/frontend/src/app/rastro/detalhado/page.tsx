"use client";
import React, { useState, useEffect, useRef } from "react";
import Graph from "@/components/rastro/rastro_detalhado/grafo";
import { ComboboxForm } from "@/components/rastro/rastro_detalhado/select";
import { LogTable } from "@/components/registro/log-table";
import { AmbienteGrafico } from "@/components/metrica/AmbienteGrafico";
import { AmbienteGraficoProps } from "@/dto/metrica";

const Home = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedRastro, setSelectedRastro] = useState<{
    label: string;
    value: string;
    tempoInicial: string;
    tempoFinal: string;
  } | null>(null);
  const [servicoSelec, setServicoSelec] = useState<string | null>(null);
  const [rotaSelec, setRotaSelec] = useState<string | null>(null);
  const [spanIdSelec, setSpanIdSelec] = useState<string | null>(null);
  const [alturaGrafo, setAlturaGrafo] = useState<number | null>(null);
  const [insumoGrafico, setInsumoGrafico] = useState<AmbienteGraficoProps | null>(null)

  const graphContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.target) {
        const el = entry.target as HTMLDivElement;
        setDimensions({
          width: el.clientWidth,
          height: el.clientHeight,
        });
      }
    });

    if (graphContainerRef.current) {
      observer.observe(graphContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmitRastro = (rastro: {
    label: string;
    value: string;
    tempoInicial: string;
    tempoFinal: string;
  }) => {
    setSelectedRastro(rastro);
  };

  return (
    // <div className="h-dvh w-screen p-2 bg-white">
    // <div className="h-screen grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-2 p-4 bg-white">
    <div className="h-full grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-2 border border-gray-300 rounded p-4 overflow-auto">

    {/* <div className="grid grid-rows-[auto_1fr_auto] grid-cols-6 gap-10 p-4 bg-white"> */}
      <div className="col-span-2 flex items-center gap-2 p-4">
        <ComboboxForm onSubmit={handleSubmitRastro} spanIdSelec={spanIdSelec} />
      </div>

      <div
        className="col-span-2 border border-gray-300 rounded p-4"
        style={{ height: `${alturaGrafo}px` }}
        ref={graphContainerRef}
      >
        <Graph
          width={dimensions.width}
          rastro={selectedRastro?.value}
          onNodeClick={(servicoSelec, rotaSelec, spanIdSelec) => {
            setServicoSelec(servicoSelec);
            setRotaSelec(rotaSelec);
            setSpanIdSelec(spanIdSelec);
            setInsumoGrafico((prev) =>
              prev
                ? { ...prev, servicoNome: servicoSelec, rotaNome: rotaSelec } : { servicoNome: servicoSelec, rotaNome: rotaSelec }
            );
          }}
          onMountGraph={(alturaGrafo) => {
            setAlturaGrafo(alturaGrafo);
          }}
        />
      </div>
      <div className="col-span-2 border border-gray-300 rounded p-4">
        <LogTable
          tempoI={selectedRastro?.tempoInicial}
          tempoF={selectedRastro?.tempoFinal}
        />
      </div>
      <div className="col-span-1 border border-gray-300 rounded p-4">
        <AmbienteGrafico
          graficoInicial={"1.Requisições"}
          parametros={insumoGrafico}

        ></AmbienteGrafico>
      </div>
      <div className="col-span-1 border border-gray-300 rounded p-4">
        <AmbienteGrafico
          graficoInicial={"2.Milissegundos"}
          parametros={insumoGrafico}  
        ></AmbienteGrafico>
      </div>
    </div>
  );
};

export default Home;