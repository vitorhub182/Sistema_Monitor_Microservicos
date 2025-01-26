export type Node = {
    id: string;
    group: number
  };
  
  export  type Link = {
    source: string;
    target: string;
    value: number;
  };
  
  export type GraphData = {
    nodes: Node[];
    links: Link[];
  };
  
  export  type GraphProps = {
    width: number;
    height: number;
  };