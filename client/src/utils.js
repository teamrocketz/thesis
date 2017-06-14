function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
}

const PAGE_SIZE = 50;
const MAX_RESULTS = 10000;

const utils = {
  updateObject,
  PAGE_SIZE,
  MAX_RESULTS,
};

export default utils;
