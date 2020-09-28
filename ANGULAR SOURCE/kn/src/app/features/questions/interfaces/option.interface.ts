export interface Option {
  id: number;
  text?: string;
  audio?: string;
  image?: string;
  video?: string;
  floor ?: number;
  ceil ?: number;
}

export interface SliderOption {
  floor: number;
  ceil: number;
}
