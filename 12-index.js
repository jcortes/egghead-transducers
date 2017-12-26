const t = require("transducers.js");
const {
  into, seq, filter, map, compose, timeIt,
  doubleTheNumber, evenOnly, arrayofRandoms
} = require("./utils");

const isEven = val => val % 2 === 0;
const tripleIt = val => val * 3;
const arrayOfMillion = arrayofRandoms(100)(1e6);

timeIt("million - chained", () => {
  arrayOfMillion
    .map(tripleIt)
    .filter(isEven);
});

timeIt("million - chained x2", () => {
  arrayOfMillion
    .map(tripleIt)
    .map(tripleIt)
    .filter(isEven);
});

timeIt("million - chained x4", () => {
  arrayOfMillion
    .map(tripleIt)
    .map(tripleIt)
    .map(tripleIt)
    .map(tripleIt)
    .filter(isEven);
});

timeIt("million - imperative", () => {
  const result = [];
  arrayOfMillion
    .forEach(val => {
      const tripled = tripleIt(val);
      if (isEven(tripled)) {
        result.push(val);
      }
    });
});

timeIt("million - transduce", () => {
  seq(
    compose(
      filter(isEven),
      map(tripleIt)
    ),
    arrayOfMillion
  );
});

timeIt("million - transduce x2", () => {
  seq(
    compose(
      filter(isEven),
      map(tripleIt),
      map(tripleIt)
    ),
    arrayOfMillion
  );
});

timeIt("million - transduce x4", () => {
  seq(
    compose(
      filter(isEven),
      map(tripleIt),
      map(tripleIt),
      map(tripleIt),
      map(tripleIt)
    ),
    arrayOfMillion
  );
});

timeIt("million - transduce lib", () => {
  t.seq(
    arrayOfMillion,
    t.compose(
      t.filter(isEven),
      t.map(tripleIt),
      t.map(tripleIt),
      t.map(tripleIt),
      t.map(tripleIt)
    )
  );
});