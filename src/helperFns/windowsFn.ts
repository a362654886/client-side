export const openNewWindow = (url: string): void => {
  console.log(window.location);
  window.open(url);
};

export const openNewWindowPath = (url: string): void => {
  window.open(`https://www.animepark.com/oneNew/${url}`,`_blank`);
 // window.location.href= `http://localhost:3001/oneNew/${url}`
};

export const openAnimeNewWindowPath = (id: string): void => {
  window.open(`https://www.animepark.com/oneAnime?${id}`,`_blank`);
 // window.location.href= `http://localhost:3001/oneNew/${url}`
};
