const { isPlainObject } = require("lodash");
const { map, transduce, pushReducer, objectReducer } = require("./utils");

const seq = (xf, collection) => {
  if (Array.isArray(collection)) {
    return transduce(xf, pushReducer, [], collection);

  } else if (isPlainObject(collection)) {
    return transduce(xf, objectReducer, {}, collection);
  }

  throw new Error("unsupported collection type");
};

console.log(
  seq(map(x => x * 2), [1,2,3])
);

const flip = map(([k,v]) => ({[v]: k}));

console.log(
  seq(flip, { one: 1, two: 2, three: 3 })
);