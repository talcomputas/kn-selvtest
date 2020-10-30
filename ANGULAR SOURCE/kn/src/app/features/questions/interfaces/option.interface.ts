export interface Option {
  id: number;
  text?: string;
  audio?: string;
  image?: string;
  video?: string;
}

export interface SliderOption extends Option {
  floor: number;
  ceil: number;
}
