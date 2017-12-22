const { isPlainObject, isNumber } = require("lodash");
const { compose, map, filter, pushReducer, objectReducer } = require("./utils");

const transduce = (xf, reducer, seed, collection) => {
  const transformedReducer = xf(reducer);
  let acc = seed;
  for (const value of collection) {
    acc = transformedReducer(acc, value);
  }
  return acc;
};

const into = (to, xf, collection) => {
  if (Array.isArray(to)) {
    return transduce(xf, pushReducer, to, collection);

  } else if (isPlainObject(to)) {
    return transduce(xf, objectReducer, to, collection);
  }

  throw new Error("into only supports arrays and objects as `to`");
};

console.log(
  into(
    [],
    compose(
      map(x => x / 2),
      map(x => x * 10)
    ),
    [1,2,3,4]
  )
);

console.log(
  into(
    {},
    compose(
      filter(isNumber),
      map(val => ({ [val]: val }))
    ),
    [1,2,3,4, "hello", () => "world"]
  )
);
