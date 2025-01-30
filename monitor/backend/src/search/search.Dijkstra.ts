import { GrafoPorRastroDTO } from "./graphTrace.dto";


function parseWeight(label: string): number {
  return parseFloat(label.replace("ms", ""));
}

export function execDijkstra(graph: GrafoPorRastroDTO, startId: string, endId: string): string[] {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const unvisited = new Set(graph.nodes.map((node) => node.id));

  for (const node of graph.nodes) {
    distances[node.id] = Infinity;
    previous[node.id] = null;
  }
  distances[startId] = 0;

  while (unvisited.size > 0) {
    const currentNode = Array.from(unvisited).reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );
    
    if (currentNode === endId) break;
    unvisited.delete(currentNode);
    
    const neighbors = graph.links.filter((link) =>
      link.source === currentNode || link.target === currentNode
    );
    
    for (const { source, target, label } of neighbors) {
      const neighbor = source === currentNode ? target : source;
      if (!unvisited.has(neighbor)) continue;
      
      const weight = parseWeight(label);
      const newDist = distances[currentNode] + weight;
      
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = currentNode;
      }
    }
  }
  
  const path: string[] = [];
  let step = endId;
  while (step) {
    path.unshift(step);
    step = previous[step] as string;
  }
  return path[0] === startId ? path : [];
}

/*
export function findFirstAndLastNodes(graph: GrafoPorRastroDTO): { firstNodes: string[], lastNodes: string[] } {
  const allNodes = new Set(graph.nodes.map(node => node.id));
  const targets = new Set(graph.links.map(link => link.target));
  const sources = new Set(graph.links.map(link => link.source));

  // Primeiro nó: nó que não está em "targets" (ninguém aponta para ele)
  const firstNodes = [...allNodes].filter(node => !targets.has(node));

  // Último nó: nó que não está em "sources" (ele não aponta para ninguém)
  const lastNodes = [...allNodes].filter(node => !sources.has(node));

  return { firstNodes, lastNodes };
}
*/
