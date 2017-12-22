const { map, into } = require("./utils");

const objectValues = obj =>
  into([], map(kv => kv[1]), obj);

console.log(
  objectValues({ one: 1, two: 2 })
);