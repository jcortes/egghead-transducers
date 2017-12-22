const {
  compose,
  doubleTheNumber,
  evenOnly,
  filter,
  map,
  pushReducer,
  toUpper,
  isVowel
} = require("./utils");

const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(x => x !== 2);
const doubleMap = map(doubleTheNumber);

const transduce = (xf, reducer, seed, collection) => {
  // return collection.reduce(xf(reducer), seed);
  const transformedReducer = xf(reducer);
  let acc = seed;
  for (const value of collection) {
    acc = transformedReducer(acc, value);
  }
  return acc;
};

console.log(
  transduce(
    compose(isNot2Filter, isEvenFilter, doubleMap),
    pushReducer,
    [],
    [1, 2, 3, 4]
  )
);

console.log(
  transduce(
    compose(map(toUpper), filter(isVowel)),
    (str, char) => str + char,
    "",
    "jorge"
  )
);

const numMap = new Map();
numMap.set("a", 1);
numMap.set("b", 2);
numMap.set("c", 3);
numMap.set("d", 4);

console.log(
  transduce(
    compose(isNot2Filter, isEvenFilter, doubleMap),
    pushReducer,
    [],
    numMap.values()
  )
);