export const getWidth = (): number => {
  const width = localStorage.getItem("animeWidth");
  return width ? parseFloat(width) : 0;
};
