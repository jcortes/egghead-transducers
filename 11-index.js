const { List, fromJS } = require("immutable");
const { isPlainObject } = require("lodash");
const {
  into, seq, filter, map, compose,
  doubleTheNumber, evenOnly
} = require("./utils");

List.prototype["@@transducer/step"] = (list, value) => list.push(value);
List.prototype["@@transducer/init"] = () => List();

const doubleAndEven = compose(
  filter(evenOnly),
  map(doubleTheNumber)
);

console.log(
  fromJS(into([], doubleAndEven, List([1,2,3,4])))
);

console.log(
  seq(doubleAndEven, List([1,2,3,4]))
);

console.log(
  into(List(), doubleAndEven, [1,2,3,4])
);