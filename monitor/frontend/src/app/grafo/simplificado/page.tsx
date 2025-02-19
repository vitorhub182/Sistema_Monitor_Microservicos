"use client"
import React, { useState, useEffect } from "react";
import Graph from "@/components/d3/grafo_simplificado/grafo";
import { ComboboxForm } from "@/components/d3/grafo_simplificado/select";

const Home = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedRastro, setSelectedRastro] = useState<string | null>(null);

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

  const handleSubmit = (rastro: string) => {
    setSelectedRastro(rastro);
  };

  return (
    <div>
      <div className="flex gap-x-4">
        <ComboboxForm onSubmit={handleSubmit} />
      </div>
      <Graph width={dimensions.width} height={dimensions.height} rastro={selectedRastro} />
    </div>
  );
};

export default Home;