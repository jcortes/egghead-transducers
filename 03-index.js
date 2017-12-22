const myString = "hello";

myString.toUpperCase();

const toUpper = str => str.toUpperCase();

toUpper(myString); // HELLO

const shout = str => `${str}!!`;

const scream = str => toUpper(shout(str));
console.log(scream(myString));