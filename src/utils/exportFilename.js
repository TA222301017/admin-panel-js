export const makeFilename = (prefix) => {
  return `${prefix}_${Number(new Date())}.xlsx`;
};
