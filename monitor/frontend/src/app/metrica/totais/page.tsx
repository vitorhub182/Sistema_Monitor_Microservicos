"use client";
import React, { useEffect, useRef, useState } from "react";
import { AmbienteGrafico } from "@/components/metrica/AmbienteGrafico";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
  const last = useRef({ w: 0, h: 0 });

  useEffect(() => {
    if (!graphContainerRef.current) return;

    const el = graphContainerRef.current;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      const rect = entry.contentRect ?? el.getBoundingClientRect();
      const w = Math.round(rect.width/2);
      const h = Math.round(rect.height);
      if (w !== last.current.w || h !== last.current.h) {
        last.current = { w, h };
        setDimensions({ width: w, height: h });
      }
    });
    ro.observe(el, { box: "content-box" });

    return () => ro.disconnect();
  }, []);

  const handleSubmitRastro = (rastro: {
    label: string;
    value: string;
    tempoInicial: string;
    tempoFinal: string;
  }) => setSelectedRastro(rastro);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-2 p-2 bg-white rounded-lg border"
    >          <ResizablePanel defaultSize={25}>
            <div className="col-span-1 border border-gray-300 rounded p-4 h-full">
              <AmbienteGrafico graficoInicial={"Requisições"} servicoNome={servicoSelec} rotaNome={rotaSelec} />
              <AmbienteGrafico graficoInicial={"Requisições"} servicoNome={servicoSelec} rotaNome={rotaSelec} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle  />
          <ResizablePanel defaultSize={25}>
            <div className="col-span-1 border border-gray-300 rounded p-4 h-full">
              <AmbienteGrafico graficoInicial={"Requisições"} servicoNome={servicoSelec} rotaNome={rotaSelec} />
              <AmbienteGrafico graficoInicial={"Requisições"} servicoNome={servicoSelec} rotaNome={rotaSelec} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
  );
};

export default Home;
