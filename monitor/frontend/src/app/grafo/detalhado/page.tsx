"use client"
import React, { useState, useEffect } from "react";
import Graph from "@/components/d3/grafo_detalhado/grafo";
import { ComboboxForm } from "@/components/d3/grafo_detalhado/select";
import { DataTable } from "@/components/log/log-table";

const Home = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedRastro, setSelectedRastro] = useState<{
    label: string;
    value: string;
    tempoInicial: string;
    tempoFinal: string;
  } | null>(null);
  
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth * 0.4; 
      const height = window.innerHeight * 0.6; 
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
    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-2 h-screen p-4 bg-white">
       <div className="col-span-2 p-4">
          <ComboboxForm onSubmit={handleSubmit} />
       </div>

       <div className="p-2">
          <Graph width={dimensions.width} height={dimensions.height} rastro={selectedRastro?.value} />
       </div>
       <div className="p-2">
       <Graph width={dimensions.width} height={dimensions.height} rastro={selectedRastro?.value} />
       
       </div>

         <div className="col-span-2">
          <DataTable tempoI={selectedRastro?.tempoInicial} tempoF={selectedRastro?.tempoFinal} />
       </div>
    </div>
  );
};

export default Home;