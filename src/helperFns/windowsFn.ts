export const openNewWindow = (url: string): void => {
  console.log(window.location);
  window.open(url);
};

export const openNewWindowPath = (url: string): void => {
  window.location.href= `http://localhost:3001/oneNew/${url}`
};
