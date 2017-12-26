const t = require("transducers.js");
const { doubleTheNumber, evenOnly } = require("./utils");

const doubleAndEven = t.compose(
  t.filter(evenOnly),
  t.map(doubleTheNumber)
);

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const res = t.seq(
  t.iterator(arr),
  t.compose(doubleAndEven, t.take(2))
);

console.log(res.next(), res.next(), res.next());

function* makeNumbers () {
  let num = 1;
  while (true) {
    yield num += 1;
  }
}

const lazyNums = t.seq(makeNumbers(), doubleAndEven);

console.log(
  lazyNums.next(),
  lazyNums.next(),
  lazyNums.next(),
  lazyNums.next(),
  lazyNums.next(),
  lazyNums.next(),
  lazyNums.next()
);
