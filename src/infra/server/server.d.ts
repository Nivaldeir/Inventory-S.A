export interface Server {
  start: (port: number) => void;
  settings: (settings: any) => void;
} 