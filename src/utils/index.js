const isEmpty = value => {
  if (typeof Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  if (typeof value === 'string' && !value) return true;
  if (typeof value === 'number' && !value.toString()) return true;
  return false;
};

export {
  isEmpty
}