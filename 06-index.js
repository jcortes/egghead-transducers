const {
  doubleTheNumber,
  evenOnly,
  filter,
  map
} = require("./utils");

const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(x => x !== 2);
const doubleMap = map(doubleTheNumber);

const pushReducer = (acc, value) => {
  acc.push(value);
  return acc;
};

console.log(
  [1,2,3,4]
    .reduce(
      isNot2Filter(isEvenFilter(doubleMap(pushReducer))),
      []
    )
);

// compose(f, g)(x) == f(g(x));
// compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer)
//   === isNot2Filter(isEvenFilter(doubleMap(pushReducer)))

const compose = (...functions) =>
  functions.reduce((acc, fn) =>
    (...args) => acc(fn(...args)),
    x => x
  );

const clearNumbersXF = compose(
  isNot2Filter,
  isEvenFilter,
  doubleMap
);

console.log(
  [1,2,3,4]
    .reduce(
      clearNumbersXF(pushReducer),
      []
    )
);

