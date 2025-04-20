export const parseItemIntoArray = (item: string, divider: string) => {
    if (item) {
      const itemArray = item.split(divider).map(item => item.trim()).filter(item => item !== '');
      return itemArray;
    }
  };
  