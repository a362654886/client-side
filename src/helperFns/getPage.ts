export const getShowCasePage = (search: string) => {
  return search.replace("?page=", "");
};

export const getShowCaseOnePage = (search: string) => {
  return search.replace("?id=", "");
};
