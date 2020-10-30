export interface PossibleLevel {
  id: string;
  title: string;
  text: string;
  minScore: number;
}

export interface PossibleLevels {
  image: string;
  levels: {
    [index: number]: PossibleLevel;
  };
}
