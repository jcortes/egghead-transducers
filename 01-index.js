// arrayofRandoms :: Int -> Int -> [Int]
const arrayofRandoms = randomCeil => length =>
  Array.from({ length }, (v, i) =>
    Math.floor(Math.random() * randomCeil));

const timeIt = (label, fn) => {
  console.time(label);
  fn();
  console.timeEnd(label);
};

const arrayOfThousand = arrayofRandoms(100)(1000);
const arrayOfMillion = arrayofRandoms(100)(1e6);

const isEven = val => val % 2 === 0;
const tripleIt = val => val * 3;

timeIt("thousand - map", () => {
  arrayOfThousand
    .map(tripleIt);
});

timeIt("thousand - map && filter", () => {
  arrayOfThousand
    .map(tripleIt)
    .filter(isEven);
});

timeIt("million - map", () => {
  arrayOfMillion
    .map(tripleIt);
});

timeIt("million - map && filter", () => {
  arrayOfMillion
    .map(tripleIt)
    .filter(isEven);
});

timeIt("million - imperative", () => {
  const result = [];
  arrayOfMillion
    .forEach(val => {
      const tripled = tripleIt(val);
      if (isEven(tripled)) result.push(val);
    });
});