"use client"
import React, { useState, useEffect, useRef } from "react";
import Graph from "@/components/d3/grafo_detalhado/grafo";
import { ComboboxForm } from "@/components/d3/grafo_detalhado/select";
import { LogTable } from "@/components/log/log-table";
import { GraficoQuantReq } from "@/components/metrica/graficoQuantReq";
import { SheetComponent } from "@/components/d3/grafo_detalhado/sheet";
import { GraficoMSReq } from "@/components/metrica/graficoMSReq";

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
const graphContainerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new ResizeObserver((entries) => {
    const entry = entries[0];
    if (entry && entry.contentRect) {
      const { width, height } = entry.contentRect;
      setDimensions({ width, height });
    }
  });
  if (graphContainerRef.current) {
    observer.observe(graphContainerRef.current);
  }

  return () => observer.disconnect();
}, []);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth * 0.2; 
      const height = window.innerHeight * 0.4; 
      setDimensions({ width, height });
    };

    updateDimensions(); 
    window.addEventListener("resize", updateDimensions); 

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  
  const handleSubmit = (rastro: { label: string; value: string; tempoInicial: string; tempoFinal: string }) => {
    setSelectedRastro(rastro);
  };

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-2 p-4 bg-white">
      <div className="col-span-1 flex items-center">
          <ComboboxForm onSubmit={handleSubmit}/>
      </div>
      <div className="col-span-1 flex items-end">
        <SheetComponent spanId={spanIdSelec}></SheetComponent>
      </div>
      
      <div className="col-span-2" ref={graphContainerRef}>
        <Graph
          width={dimensions.width}
          height={dimensions.height}
          rastro={selectedRastro?.value}
          onNodeClick={(servicoSelec, rotaSelec, spanIdSelec) => {
          setServicoSelec(servicoSelec);
          setRotaSelec(rotaSelec);
          setSpanIdSelec(spanIdSelec);
          }}
        />
      </div>
      <div className="col-span-1">
        <GraficoQuantReq servicoNome={servicoSelec} rotaNome={rotaSelec} />
      </div>
      <div className="col-span-1">
        <GraficoMSReq servicoNome={servicoSelec} rotaNome={rotaSelec} />
      </div>
      <div className="col-span-2">
        <LogTable
          tempoI={selectedRastro?.tempoInicial}
          tempoF={selectedRastro?.tempoFinal}
        />
      </div>
    </div>
  );
};

export default Home;