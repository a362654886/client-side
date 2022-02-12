export const getWidth = () => {
  const width = localStorage.getItem("animeWidth");
  return width ? parseFloat(width) : 0;
};
