const { List, fromJS } = require("immutable");
const {
  into, seq, filter, map, compose,
  doubleTheNumber, evenOnly
} = require("./utils");

const doubleAndEven = compose(
  filter(evenOnly),
  map(doubleTheNumber)
);

console.log(
  into([], doubleAndEven, List([1,2,3,4]))
);