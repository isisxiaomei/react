<!-- TOC -->

- [数组的扩展](#%e6%95%b0%e7%bb%84%e7%9a%84%e6%89%a9%e5%b1%95)
- [1. 扩展运算符](#1-%e6%89%a9%e5%b1%95%e8%bf%90%e7%ae%97%e7%ac%a6)
  - [1.1 概念](#11-%e6%a6%82%e5%bf%b5)
- [2. 数组的静态方法](#2-%e6%95%b0%e7%bb%84%e7%9a%84%e9%9d%99%e6%80%81%e6%96%b9%e6%b3%95)
  - [2.1 Array.from()](#21-arrayfrom)
  - [2.2 Array.of()](#22-arrayof)
- [3. 数组实例方法](#3-%e6%95%b0%e7%bb%84%e5%ae%9e%e4%be%8b%e6%96%b9%e6%b3%95)
  - [3.1 copyWithin()](#31-copywithin)
  - [3.2 find() & findIndex()](#32-find--findindex)
  - [3.3 fill()](#33-fill)
  - [3.4 entries() & keys() & values()](#34-entries--keys--values)
  - [3.5 includes()](#35-includes)
  - [3.6 flat()，flatMap()](#36-flatflatmap)
    - [3.6.1 flat()](#361-flat)
    - [3.6.2 flatMap()](#362-flatmap)
- [4. Array.prototype.sort() 的排序稳定性](#4-arrayprototypesort-%e7%9a%84%e6%8e%92%e5%ba%8f%e7%a8%b3%e5%ae%9a%e6%80%a7)
- [5. 数组的空位](#5-%e6%95%b0%e7%bb%84%e7%9a%84%e7%a9%ba%e4%bd%8d)

<!-- /TOC -->
# 数组的扩展
# 1. 扩展运算符
## 1.1 概念
+ 扩展运算符 `...` 将一个数组转为用逗号分隔的参数序列
+ 扩展运算符背后调用的是遍历器接口（Symbol.iterator），所以可遍历的结构都可以用扩展运算符
+ 注意点：扩展运算符是引用拷贝，不是深拷贝
```js
// 示例1：
console.log(1, ...[2, 3, 4], 5) // 1 2 3 4 5

// 示例2：
[...document.querySelectorAll('div')]   // [<div>, <div>, <div>]

// 示例3：
[...'hello']
// [ "h", "e", "l", "l", "o" ]

// 示例4：扩展运算符用于数组赋值，只能放在参数的最后一位
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]


// 示例5：map结构
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]

// 示例6：Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};
[...go()] // [1, 2, 3]
```
# 2. 数组的静态方法
## 2.1 Array.from()
+ 定义：Array.from方法用于将两类对象转为真正的数组（类似数组的对象和可遍历的对象（包括 ES6 新增的数据结构 Set 和 Map））。
+ 类似数组的对象常见（所谓类似数组的对象，本质特征只有一点，即必须有length属性）：DOM 操作返回的节点集合 和 函数内部的arguments对象
+ 可遍历集合`Array.from`都能将其转为数组
```js
// 示例1：将类似数组的对象转成数组
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']；slice不传参数时copy原数组返回新数组

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']


// 示例2：
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

// 示例3:
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
```
+ 如果参数是一个真正的数组，Array.from会返回一个一模一样的"新数组"
```js
// 示例1：
Array.from([1, 2, 3])
// [1, 2, 3]
```

+ Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
+ 如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this
```js
// 示例1：
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```
## 2.2 Array.of()
+ 定义：`Array.of`: 方法用于将一组值，转换为数组
+ 背景：弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异（Array.of可以基本替代Array构造函数）
+ `Array.of`: 总是返回参数值组成的数组。如果没有参数，就返回一个空数组
```js
// 示例1：
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of() // []
Array.of(undefined) // [undefined]

// 示例2：
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```
+ Array.of实现
```js
// Array.of实现
function ArrayOf(){
  return [].slice.call(arguments);
}
```
# 3. 数组实例方法
## 3.1 copyWithin()
+ 定义：当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组；使用这个方法，会修改当前数组。
+ 语法：`Array.prototype.copyWithin(target, start = 0, end = this.length)`
  - target（必需）：从该位置开始替换数据。如果为负值，表示倒数
  - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算
  - end（可选并且开区间）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算;
```js
// 示例1：
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]


// 示例2：-2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 示例3： 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

```


## 3.2 find() & findIndex()
+ find()定义: 参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
+ 回调函数参数：回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组
+ findIndex()定义：返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1
+ 语法：
```js
// find语法：
[].find(function(value, index, arr){}, 用来绑定回调函数的this对象)

// findIndex语法：
[].findIndex(function(value, index, arr){}, 用来绑定回调函数的this对象)
```
```js
// 示例1：
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2


// 示例2：
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```
+ 注意点：这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足
```js
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```
## 3.3 fill()
+ fill定义：使用给定值，填充一个数组；填充的过程是引用赋值不是深拷贝
+ 语法：`fill(value, [start], [end])`
```js
// 示例1：
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

// 示例2：
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```
+ 注意点：如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
```js
// 示例1：
let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]
```
## 3.4 entries() & keys() & values()
+ 定义：都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历
```js
// 示例1：
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

// 示例2：
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

## 3.5 includes()
+ 定义：返回一个布尔值，表示某个数组是否包含给定的值
+ 注意点：第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始
```js
// 示例1：
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true

// 示例2：
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

## 3.6 flat()，flatMap()
### 3.6.1 flat()
+ flat()定义：数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响
+ 注意点：flat()默认只会“拉平”一层；可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1
```js
// 示例1：
[1, 2, [3, 4]].flat() // [1, 2, 3, 4]
[1, 2, [3, [4, 5]]].flat()  // [1, 2, 3, [4, 5]]
[1, 2, [3, [4, 5]]].flat(2) // [1, 2, 3, 4, 5]
```
+ 如果不管有多少层嵌套，都要转成一维数组，可以用`Infinity关键字作为参数`。
```js

[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]
```
+ 如果原数组有空位，flat()方法会跳过空位
```js
// 示例1：
[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]
```
### 3.6.2 flatMap()
+ flatMap(): 对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。
+ 语法：
```js
// 第二个参数用于绑定回调函数内部this
arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])
```
```js
// 示例1:
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```
+ 注意点：flatMap()只能展开一层数组
```js
// 示例1：
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]
```
# 4. Array.prototype.sort() 的排序稳定性
# 5. 数组的空位
