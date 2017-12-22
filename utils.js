const { isPlainObject, entries } = require("lodash");

const compose = (...functions) =>
  functions.reduce((acc, fn) =>
    (...args) => acc(fn(...args)),
    x => x
  );

const doubleTheNumber = number => number * 2;

const evenOnly = number => number % 2 === 0;

const toUpper = str => str.toUpperCase();

const isVowel = char =>
  ['a', 'e', 'i', 'o', 'u', 'y']
    .includes(char.toLowerCase());

const shout = str => `${str}!!`;

const doubleAndEven = number =>
  doubleTheNumber(evenOnly(number));

const map = xf => reducer => (acc, value) =>
  reducer(acc, xf(value));

const filter = predicate => reducer => (acc, value) =>
  predicate(value)
    ? reducer(acc, value)
    : acc;

const pushReducer = (acc, value) => {
  acc.push(value);
  return acc;
};

const objectReducer = (acc, value) =>
  Object.assign(acc, value);

const transduce = (xf, reducer, seed, _collection) => {
  const transformedReducer = xf(reducer);
  let acc = seed;

  const collection = isPlainObject(_collection)
    ? entries(_collection)
    : _collection;

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

  } else if (collection["@@transducer/step"]) {

  }

  throw new Error("into only supports arrays and objects as `to`");
};

const seq = (xf, collection) => {
  if (Array.isArray(collection)) {
    return transduce(xf, pushReducer, [], collection);

  } else if (isPlainObject(collection)) {
    return transduce(xf, objectReducer, {}, collection);
  }

  throw new Error("unsupported collection type");
};

const addsSingleValue = x => x;

module.exports = {
  compose,
  shout,
  pushReducer,
  objectReducer,
  doubleAndEven,
  toUpper,
  isVowel,
  doubleTheNumber,
  evenOnly,
  map,
  filter,
  addsSingleValue,
  into,
  transduce,
  seq
};