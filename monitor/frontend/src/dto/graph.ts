export interface Node {
  id: string;          
  label?: string;     
  group: string;
  spanId: string;   
  x: number;         
  y: number;          
  fx?: number | null;  
  fy?: number | null;
  sequence?: number | null;
  nameService: string;
}

export interface Link {
  source: string | Node; 
  target: string | Node;
  value: number;        
  label?: string;
  x: number;         
  y: number;          
  fx?: number | null;  
  fy?: number | null;         
}

export interface GraphData {
  nodes: Node[]; 
  links: Link[]; 
}

export interface DijkstraDTO {
  firstNode: string; 
  lastNode: string; 
}
  
export interface GraphProps {
  width: number;
  height: number;
  rastro: string | undefined;
  onNodeClick?: (serviceName: string, routeName: string) => void;
}