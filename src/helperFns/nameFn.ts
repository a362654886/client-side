export const formatName = (name: string): string => {
  return name.length < 14
    ? name
    : `${name.slice(0, 14)}${name.slice(name.length - 2, name.length)}`;
};
