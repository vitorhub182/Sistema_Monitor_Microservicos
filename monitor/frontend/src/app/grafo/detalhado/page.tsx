"use client"
import React, { useState, useEffect, useRef, Suspense } from "react";
import Graph from "@/components/d3/grafo_detalhado/grafo";
import { ComboboxForm } from "@/components/d3/grafo_detalhado/select";
import { LogTable } from "@/components/log/log-table";
import { GraficoQuantReq } from "@/components/metrica/graficoQuantReq";
import { SheetComponent } from "@/components/d3/grafo_detalhado/sheet";
import { GraficoMSReq } from "@/components/metrica/graficoMSReq";
import { AmbienteGrafico } from "@/components/metrica/AmbienteGrafico";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/loading";





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

  const handleSubmitRastro = (rastro: { label: string; value: string; tempoInicial: string; tempoFinal: string }) => {
    setSelectedRastro(rastro);
  };

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-2 p-4 bg-white">
      <div className="col-span-1 flex items-center">
          <ComboboxForm onSubmit={handleSubmitRastro}/>
      </div>
      <div className="col-span-1 flex items-end">
        <SheetComponent spanId={spanIdSelec}></SheetComponent>
      </div>
      
      <div className="col-span-2 border border-gray-300 rounded p-4" style={{ height: `${alturaGrafo}px` }} ref={graphContainerRef}>
        <Graph
          width={dimensions.width}
          rastro={selectedRastro?.value}
          onNodeClick={(servicoSelec, rotaSelec, spanIdSelec) => {
          setServicoSelec(servicoSelec);
          setRotaSelec(rotaSelec);
          setSpanIdSelec(spanIdSelec);
          }}
          onMountGraph={(alturaGrafo) =>{
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
      <div className="col-span-2 border border-gray-300 rounded p-4" >
        
        <AmbienteGrafico servicoNome={servicoSelec} rotaNome={rotaSelec} ></AmbienteGrafico>
      
      </div>
    </div>
  );
};

export default Home;