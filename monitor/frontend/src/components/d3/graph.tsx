import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GraphData, GraphProps, Link, Node } from "@/dto/graph";
import { makeGraph } from "@/services/graphService";

const Graph: React.FC<GraphProps> = ({ width, height, rastro }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<GraphData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!rastro) return;

        const graphData = await makeGraph(rastro);
        setData(graphData);
      } catch (error) {
        console.error("Erro ao buscar os dados do grafo:", error);
      }
    }

    fetchData();
  }, [rastro]);

  useEffect(() => {
    if (!svgRef.current || !data ) return;
  
    d3.select(svgRef.current).selectAll("*").remove();
  
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
  
    const simulation = d3
      .forceSimulation<Node>(data.nodes)
      .force(
        "link",
        d3.forceLink<Node, Link>(data.links).id((d) => d.id).distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide(20));
  
    const link = svg
      .append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value));
  
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
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", "#69b3a2")
      .call(
        d3
          .drag<SVGCircleElement, Node>()
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
  
    const nodeLabels = svg
      .append("g")
      .selectAll("text")
      .data(data.nodes)
      .join("text")
      .attr("fill", "#000")
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("dy", -12)
      .text((d) => d.label || d.id);
  
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => Math.max(0, Math.min(width, (d.source as Node).x || 0)))
        .attr("y1", (d) => Math.max(0, Math.min(height, (d.source as Node).y || 0)))
        .attr("x2", (d) => Math.max(0, Math.min(width, (d.target as Node).x || 0)))
        .attr("y2", (d) => Math.max(0, Math.min(height, (d.target as Node).y || 0)));
  
        
        linkLabels
        .attr("x", (d) => ((d.source as Node).x + (d.target as Node).x) / 2 || 0)
        .attr("y", (d) => ((d.source as Node).y + (d.target as Node).y) / 2 || 0);
        

      node
        .attr("cx", (d) => {
          d.x = Math.max(0, Math.min(width, d.x || 0));
          return d.x;
        })
        .attr("cy", (d) => {
          d.y = Math.max(0, Math.min(height, d.y || 0));
          return d.y;
        });
  
      nodeLabels.attr("x", (d) => d.x || 0).attr("y", (d) => d.y || 0);
    });
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default Graph;
