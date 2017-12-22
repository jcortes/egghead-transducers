const { doubleTheNumber, evenOnly } = require("./utils");

const map = xf => (acc, value) => {
  acc.push(xf(value));
  return acc;
};

const filter = predicate => (acc, value) => {
  if (predicate(value)) {
    acc.push(value);
  }
  return acc;
};

console.log(
  [1,2,3,4,5]
    .reduce(filter(evenOnly), [])
    .reduce(map(doubleTheNumber), [])
);

const filterThatDoubles = predicate => (acc, value) => {
  if (predicate(value)) {
    return map(doubleTheNumber)(acc, value);
  }
  return acc;
};

console.log(
  [1,2,3,4,5]
    .reduce(filterThatDoubles(evenOnly), [])
);

const map2 = xf => reducer => (acc, value) => {
  reducer(acc, xf(value));
  return acc;
};

const filter2 = predicate => reducer => (acc, value) => {
  if (predicate(value)) {
    return reducer(acc, value);
  }
  return acc;
};

console.log(
  [1,2,3,4,5]
    .reduce(filter2(evenOnly)(map(doubleTheNumber)), [])
);

const isEvenFilter = filter2(evenOnly);
const isNot2Filter = filter2(x => x !== 2);

const doubleMap = map2(doubleTheNumber);

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

