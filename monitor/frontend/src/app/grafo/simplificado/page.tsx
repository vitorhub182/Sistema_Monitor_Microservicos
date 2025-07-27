"use client"
import React, { useState, useEffect } from "react";
import Graph from "@/components/main/grafo_simplificado/grafo";
import { ComboboxForm } from "@/components/main/grafo_simplificado/select";

const Home = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [alturaGrafo, setAlturaGrafo] = useState<number | null>(null);
  
  const [selectedRastro, setSelectedRastro] = useState<{
    label: string;
    value: string;
    tempoInicial: string;
    tempoFinal: string;
  } | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth * 0.8; 
      const height = window.innerHeight * 0.8; 
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
    <div className="col-span-2 border border-gray-300 rounded p-4" style={{ height: `${alturaGrafo}px` }}>
      <div className="flex gap-x-4">
        <ComboboxForm onSubmit={handleSubmit} />
      </div>
      <Graph width={dimensions.width} rastro={selectedRastro?.value} 
       onMountGraph={(alturaGrafo) =>{
        setAlturaGrafo(alturaGrafo);
      }}
      />
    </div>
  );
};

export default Home;