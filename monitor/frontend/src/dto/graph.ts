export interface Node {
  id: string;          
  label?: string;     
  group: string;      
  x?: number;         
  y?: number;          
  fx?: number | null;  
  fy?: number | null;  
}

export interface Link {
  source: string | Node; 
  target: string | Node; 
  value: number;        
  label?: string;
  x?: number;         
  y?: number;          
  fx?: number | null;  
  fy?: number | null;         
}

export interface GraphData {
  nodes: Node[]; 
  links: Link[]; 
}

  
export interface GraphProps {
  width: number;
  height: number;
  rastro: string | null;
}