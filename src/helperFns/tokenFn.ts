export const setToken = (token: string): void => {
  localStorage.setItem("react-cookie", token);
};

export const getToken = (): string | null =>
  localStorage.getItem("react-cookie");
