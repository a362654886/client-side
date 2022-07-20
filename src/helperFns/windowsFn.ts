import { windowLink } from "../globalValues";

export const openNewWindow = (url: string): void => {
  window.open(url);
};

export const openNewWindowBlank = (url: string): void => {
  window.open(`${url}`, `_blank`);
};

export const openNewMarketPath = (): void => {
  window.open(`${windowLink}/marketplace/show/null`, `_blank`);
};

export const openNewWindowPath = (url: string): void => {
  window.open(`${windowLink}/oneNew/${url}`, `_blank`);
};

export const openAnimeNewWindowPath = (id: string): void => {
  window.open(`${windowLink}/anime?${id}`, `_blank`);
};

export const openReportContextPath = (): void => {
  window.open(`${windowLink}/adminManagement/BlockContext`, `_blank`);
};
