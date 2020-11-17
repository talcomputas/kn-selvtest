import { Option } from './option.interface';

export interface SliderOption extends Option {
  floor: number;
  ceil: number;
  steps: number;
}
