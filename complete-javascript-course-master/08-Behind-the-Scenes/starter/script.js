'use strict';
// var mei = 'beautiful';

// //1.windows对象
// console.log(this);

// //2.普通的函数中的this（严格模式和非严格模式）
// function normalFn() {
//   console.log(this); //严格模式下的函数中的this
// }
// normalFn(); //直接运行普通函数，这时其中的this，在严格模式上是undefined，普通模式下是指向window对象

// //3.箭头函数中，指向包围其的对象的this,如果没有，就是最外侧的window对象
// const objArrow = () => {
//   console.log(this);
// };
// objArrow();

// //4.在对象中的method中的函数，其中的this
// // 原理：正在调用method的那个Object就是this
// const obj = {
//   year: 2021,
//   calcAge: function () {
//     console.log(this);
//     console.log(2022 - this.year);
//   },
// };

// obj.calcAge();

// //5.正在调用method的那个Object就是this，这里在调用的是obj2
// let obj2 = {
//   year: 2022,
// };

// obj2.calcAge = obj.calcAge;
// obj2.calcAge(); //正在调用method的那个Object就是this，这里在调用的是obj2
// obj2.mei();

// const year = 2021; //var声明的变量会挂载在window上，而let和const声明的变量不会：

// const obj = {
//   year: 2021,
//   calcAge: () => {
//     console.log(this);
//     console.log(this.year);
//   },

//   greet: function () {
//     console.log(this);
//     console.log(this.year);

//     const insideMethodFn = () => {
//       console.log(this);
//       console.log(this.year);
//     };
//     insideMethodFn(); //调用一个普通的函数，这个函数的直接上一层也是函数，而不是对象。所以是Undefined

//     // greet: function () {
//     //   console.log(this);
//     //   console.log(this.year);
//     //   const that = this;
//     //   const insideMethodFn = function () {
//     //     console.log(that);
//     //     console.log(that.year);
//     //   };
//     //   insideMethodFn(); //调用一个普通的函数，这个函数的直接上一层也是函数，而不是对象。所以是Undefined
//     // },
//   },
// };

// obj.calcAge(); //调用对象中的方法，方法中的this就是这个对象Calling the method inside Object
// obj.greet();

// const regular = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// const arrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };

// regular(1, 2, 3);
// arrow(1, 2, 3);

const me = {
  firstName: 'xiao',
  lastName: 'li',
  extra: ['1993', '11'],
};

console.log(me);
console.log(meCopy);
