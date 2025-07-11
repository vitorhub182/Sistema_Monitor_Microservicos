import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GraphData, GraphProps, Link, Node } from "@/dto/graph";
import { getGrafoDetalhado } from "@/services/graphService";


const Graph: React.FC<GraphProps> = ({ width, height, rastro,  onNodeClick}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<GraphData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!rastro) return;
        const graphData = await getGrafoDetalhado(rastro);
        setData(graphData);
      } catch (error) {
        console.error("Erro ao buscar os dados do grafo:", error);
      }
    }
    fetchData();
  }, [rastro]);

  useEffect(() => {
    if (!svgRef.current || !data) return;
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const uniqueGroups = Array.from(
      new Set(data.nodes.map((node) => node.group))
    ).sort(); 

    const serviceMap = Object.fromEntries(
      data.nodes.map((node) => [node.group, node.nameService])
    );

    const color = d3.scaleOrdinal(uniqueGroups, d3.schemeCategory10);

    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 150}, 20)`);

    legend
      .selectAll("circle")
      .data(uniqueGroups)
      .enter()
      .append("circle")
      .attr("cx", 0)
      .attr("cy", (_, i) => i * 20)
      .attr("r", 6)
      .attr("fill", (d) => color(d));

    legend
      .selectAll("text")
      .data(uniqueGroups)
      .enter()
      .append("text")
      .attr("x", 12)
      .attr("y", (_, i) => i * 20 + 4)
      .attr("font-size", "12px")
      .attr("fill", "#000")
      .text((d) => serviceMap[d]);

      const simulation = d3
  .forceSimulation<Node>(data.nodes)
  .force(
    "link",
    d3.forceLink<Node, Link>(data.links).id((d) => d.spanId).distance(120)
  )
  .force("charge", d3.forceManyBody().strength(-1000)) 
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide(10)) 
  .force("x", d3.forceX(width / 2).strength(0.2)) 
  .force("y", d3.forceY(height / 2).strength(0.2)); 
    const link = svg
      .append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value))
      .attr("marker-end", "url(#arrow)");

      const linkLabels = svg
      .append("g")
      .selectAll("text")
      .data(data.links)
      .join("text")
      .attr("fill", "#555")
      .attr("font-size", "10px")
      .attr("text-anchor", "middle")
      .text((d) => d.label || "");	
      
      const node = svg
  .append("g")
  .selectAll<SVGGElement, Node>("g")
  .data(data.nodes)
  .join("g") 
  .call(
    d3
      .drag<SVGGElement, Node>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      })
  );

  node
  .append("circle")
  .attr("r", 10)
  .attr("fill", (d) => color(d.group))
  .style("cursor", "pointer")
  .on("click", function (event, d) {
    d3.selectAll("g > circle")
      .each(function () {
        const d = d3.select(this).datum() as Node;
        d3.select(this).attr("fill", color(d.group));
      });
  
    // Destacar o nó clicado
    d3.select(this).attr("fill", "#ff0000");
  
    if (typeof onNodeClick === "function") {
      onNodeClick(d.nameService, d.id || "", d.spanId);
    }
  });

node
  .append("text")
  .attr("text-anchor", "middle")
  .attr("dy", "0.35em")
  .attr("font-size", "10px")
  .attr("fill", "#fff")
  .text((d) => d.sequence || null ); 

node
  .append("text")
  .attr("text-anchor", "middle")
  .attr("dy", "-12")
  .attr("font-size", "12px")
  .attr("fill", "#000")
  .text((d) => d.label || d.id);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => (d.source as Node).x || 0)
      .attr("y1", (d) => (d.source as Node).y || 0)
      .attr("x2", (d) => (d.target as Node).x || 0)
      .attr("y2", (d) => (d.target as Node).y || 0);
  
    linkLabels
      .attr("x", (d) => ((d.source as Node).x + (d.target as Node).x) / 2 || 0)
      .attr("y", (d) => ((d.source as Node).y + (d.target as Node).y) / 2 || 0);
  
    node.attr("transform", (d) => {
      d.x = Math.max(0, Math.min(width, d.x || 0));
      d.y = Math.max(0, Math.min(height, d.y || 0));
      return `translate(${d.x}, ${d.y})`;
    });
  });

  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default Graph;
