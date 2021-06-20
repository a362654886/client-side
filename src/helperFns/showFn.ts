export const showAlert = (
  stateFn: React.Dispatch<React.SetStateAction<string>>
): void => {
  stateFn("block");
  setTimeout(() => {
    stateFn("none");
  }, 3000);
};
