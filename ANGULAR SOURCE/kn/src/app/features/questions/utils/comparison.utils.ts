export const compareCodes = (v1: any, v2: any): boolean => parseInt(v1, 10) === parseInt(v2, 10);
export const compareSingle = (v1: any, v2: any): boolean => v1 === v2;
export const compareMultiple = (v1: any[], v2: any[], sorting = true): boolean =>
  sorting ? v1.sort().toString() === v2.sort().toString() : (v1 && v1.toString()) === (v1 && v2.toString());
