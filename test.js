const mySymbol = Symbol('hiddenProperty');
const myObject = {
  visibleProperty: 'visible',
  [mySymbol]: 'hidden',
};

console.log(myObject);
