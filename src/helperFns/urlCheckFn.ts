export const urlCheck = (URL: string) => {
  const regExp = new RegExp(
    "^http[s]?://([\\w\\-\\.]+)+[w-]*([\\w\\-\\.\\/\\?%&=]+)?$",
    "ig"
  );
  const regExp1 = new RegExp(
    "^//([\\w\\-\\.]+)+[w-]*([\\w\\-\\.\\/\\?%&=]+)?$",
    "ig"
  );
  if (regExp.test(URL) || regExp1.test(URL)) {
    return true;
  } else {
    return false;
  }
};
