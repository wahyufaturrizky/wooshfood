export const requiredField = (value, msg) => {
  if (value) return true;

  return msg;
};
