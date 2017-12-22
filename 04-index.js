const doubleTheNumber = number => number * 2;

console.log(
  [1,2,3,4].map(doubleTheNumber)
);

const doubleTwice = number =>
  doubleTheNumber(doubleTheNumber(number));

console.log(
  [1,2,3,4].map(doubleTwice)
);

const evenOnly = number => number % 2 === 0;

const doubleAndEven = number =>
  doubleTheNumber(evenOnly(number));

console.log(
  [1,2,3,4,5].filter(doubleAndEven),
  "wrong!"
);

const map = (xf, array) => {
  return array.reduce((acc, value) => {
    acc.push(xf(value));
    return acc;
  }, []);
};

const filter = (predicate, array) => {
  return array.reduce((acc, value) => {
    if (predicate(value)) {
      acc.push(value);
    }
    return acc;
  }, []);
};

console.log(
  map(doubleTheNumber, [1,2,3,4])
);

console.log(
  filter(evenOnly, [1,2,3,4])
);