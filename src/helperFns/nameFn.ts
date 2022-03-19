export const formatName = (name: string): string => {
  console.log(name.slice(0, 10));
  return name.length < 14
    ? name
    : `${name.slice(0, 14)}${name.slice(name.length - 2, name.length)}`;
};
