"use client"
import React, { useState } from "react";
import Graph from "../../components/d3/graph";
import { ComboboxForm } from "@/components/d3/select";

const Home = () => {
  const [selectedRastro, setSelectedRastro] = useState<string | null>(null);

  const handleSubmit = (rastro: string) => {
    setSelectedRastro(rastro);
  };

  return (
    <div>
      <div>
        <ComboboxForm onSubmit={handleSubmit} />
        <Graph width={600} height={400} rastro={selectedRastro} />
      </div>
    </div>
  );
};

export default Home;
