export const getSplitText = (value: string): string[] => {
  const ary = value.split('%s');

  let result = [];

  for (let i = 0; i < ary.length; i++) {
    if (ary[i] === '' && i < ary.length - 1) {
      result.push(i);
    } else {
      result.push(ary[i]);
      if (i < ary.length - 1) {
        result.push(i);
      }
    }
  }

  result = result.filter((e) => {
    return e === 0 || e;
  });
  return result;
};
