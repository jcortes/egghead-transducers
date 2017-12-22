// reducer :: acc -> value -> acc
const reducer = (accumulation, value) => {
  // returns the new accumulation
  return accumulation + value;
};

reducer(10, 5);
const res = reducer("hello", " paul"); // hello paul
reducer(res, " again");

[1,2,3,4,5].reduce(reducer, 0); // 15

const objReducer =
  (acc, obj) => ({ ...acc, ...obj });

const user = {
  name: "Jorge", email: "jcortes@belatrix.com"
};

objReducer(user, { nickname: "jcortes" });

const setReducer =
  (acc, value) => acc.add(value);

const mySet = new Set([1,2,3,4]);
setReducer(mySet, 4); // Set {1,2,3,4}