export const parseItemIntoArray = (item: string | undefined, divider: string) => {
  if (item) {
    return item
      .split(divider)
      .map(item => item.trim())
      .filter(item => item !== '');
  }
  return [];
};
