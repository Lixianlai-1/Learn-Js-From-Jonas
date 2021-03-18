'use strict';

// const bookings = [];
// const creatBooking = function (
//   flightNum,
//   numPassagers = 1,
//   priceNum = 100 * numPassagers
// ) {
//   //   //ES5设置默认值的方式
//   //   numPassagers = numPassagers || 1;
//   //   priceNum = priceNum || 100;

//   const booking = {
//     //增强对象字面量，属性与其值相同，可省略值的部分
//     flightNum,
//     numPassagers,
//     priceNum,
//   };

//   console.log(booking);
//   //将creatBooking带来的参数所形成的booking，传入之前所定义的空数组之中
//   bookings.push(booking);
// };

// //当没有输入第二个和第三个参数的时候，如何设置默认值
// creatBooking('Beijing');
// creatBooking('Beijing', undefined, 10);
// creatBooking('Beijing', 2, undefined);

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// //2.创建一个函数，在函数中改变参数的值，原始类型的值本身不会被变化，引用类型会变
// const flight = 'BeiJing123';
// const xiao = {
//   name: 'Li xiao',
//   passport: 123456,
// };

// const checkIn = function (flightNum, passenger) {
//   //给形参重新赋值
//   flightNum = 'ChongQing456';
//   passenger.name = 'Mr. ' + passenger.name;

//   //判断用户输入的argument所形成的passport是否与xiao这个参数中的passport相等
//   if (passenger.passport === 123456) {
//     console.log('Check In!');
//   } else {
//     console.log('Wrong passport!');
//   }
// };

// checkIn('MianYang789', xiao);
// //判断原始类型的值是否变化
// console.log(flight);
// //判断引用类型的值是否变化
// console.log(xiao);

// //创建一个函数，改变对象的passport，用以佐证引用类型：对象的值被改变了，以致于'Wrong passport
// const newPassport = function (passenger) {
//   passenger.passport = Math.trunc(Math.random() * 1231231);
// };

// newPassport(xiao);
// checkIn('MianYang789', xiao);

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// //3.Higher-Order函数，用return或使用回调函数
// const oneWord = function (str) {
//   //用后者的''代替全局中的空格，也就是取消字符串的空格
//   // return str.replace(/ /g, '');
//   return str.replaceAll(' ', '');
// };

// //将首字母大写的函数
// const upperFirstWord = function (str) {
//   const [first, ...ohters] = str.split(' ');
//   return [first.toUpperCase(), ...ohters].join(' ');
// };

// //transform的抽象级别高，它不在乎其中的功能细节是如何实现的，不如下一级的oneWord可以变化
// const transform = function (str, fn) {
//   console.log(`Original String: ${str}`);
//   //在函数内执行函数
//   console.log(`Use Function: ${fn(str)}`);
//   //得到函数的name属性，也就是输入的函数的名称
//   console.log(`Use Function: ${fn.name}`);
// };

// //Js use callback function all the time
// //这里的upperFirstWord和oneWord函数没有执行，只是作为一个值传入，是higher-order高阶
// //一个函数传入另一个函数中作为实参时，就是回调函数
// transform('li xian xiao', upperFirstWord);
// transform('li xian xiao', oneWord);

// const high5 = function () {
//   console.log('🌭');
// };

// document.body.addEventListener('click', high5);

// const arr = ['Jonas', 'Xiao', 'Adam'];
// ['Jonas', 'Xiao', 'Adam'].forEach(high5);
// // arr.forEach(high5);

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// // function return funciton
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting}, ${name}`);
//   };
// };

// greet('Hi')('Lixiao');

// //用箭头函数代替
// // const greet = greeting => name => console.log(`${greeting}, ${name}`);
// // greet('Hi')('Lixiao');

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

//call和apply方法
const SiCuanAirline = {
  airline: 'SiCuan',
  iataCode: 'SC',
  booking: [],
  //增强字面量方法，省略函数
  book(name, num) {
    console.log(`${name} booked a flight on ${this.airline}
    flight:${this.iataCode}${num}
    `);
    //将相关值push到空数组之中
    this.booking.push({
      flight: `${this.airline}
    ${this.iataCode}${num},${name}`,
    });
  },
};

// SiCuanAirline.book('li xiao', 123);

//创建一个新的对象
const euroWings = {
  airline: 'euroWings',
  iataCode: 'EU',
  booking: [],
};

//将SiCuanAirline的book方法赋值给bookFn
const book = SiCuanAirline.book;

// //函数.call(想要绑定的位置，函数后续的参数)
// book.call(SiCuanAirline, 'Li Xianxiao', 789);
// book.call(euroWings, 'Li Jiaxing', 754);

// //apply method
// const euroWings2 = {
//   airline: 'euroWings2',
//   iataCode: 'EUtwo',
//   booking: [],
// };
// //apply后面必须跟上数组，第一个参数还是指向的this，后面是把数组的内容作为函数的参数
// const arr = ['LiYu', 908];
// book.apply(euroWings2, arr);

// //如果要一个数组中的元素作为函数的实参时，可以用call加展开语法
// //当作为函数的实参时，是展开语法；作为形参时，是剩余模板
// // book.call(euroWings2, ...arr);

// //bind method
// //将book方法的this绑定到具体的作用域，然后返回一个新的函数，将这个函数赋值给bookEW
// const bookEW = book.bind(euroWings);
// bookEW('Mark', 564);

// //this绑定到euroWings然后设置一个参数，返回一个新的函数，赋值给bookjogh
// const bookEWjogh = book.bind(euroWings, 'John');
// bookEWjogh(921);

// //因为是返回的函数，所以如果要执行下面这段代码，还得加()
// book.bind(euroWings, 'John', 852);

// //with event listener
// euroWings2.planes = 300;
// euroWings2.buyPlane = function () {
//   this.planes++;
//   console.log(this);
//   console.log(this.planes);
// };

// document.querySelector('.buy').addEventListener('click', euroWings2.buyPlane);

// //partial application
// const addTax = (rate, value) => {
//   return value + rate * value;
// };

// //当不需要指定某个特定的this时，可以直接用null，后面跟的参数顺序很重要
// const preSetAddTax = addTax.bind(null, 0.1);
// console.log(preSetAddTax(10));

// //用return函数的方式
// const preSetAddTax2 = function (rate) {
//   return function (value) {
//     return value + rate * value;
//   };
// };

// const addTax2 = preSetAddTax2(0.1);
// console.log(addTax2(10));

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

//Coding Challenge #1
//错误纠正：不是让我直接把这段写出来，而是从对象中通过this读取
// const prommptValue = prompt(
//   `What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)`,
//   0
// );
// // console.log(prommptValue);
// const poll = {
//   registerNewAnswer: function () {
//     const bestLanguage = ['JavaScript', 'Python', 'Rust', ' C++'];
//     console.log(prommptValue);

//     if (prommptValue === 0) {
//       console.log('You are right! JavaScript is the best!');
//     } else if (typeof +prommptValue !== 'number' || prommptValue > 3) {
//       console.log('Please chosen 0-3 number');
//     } else {
//       console.log(
//         `You are wrong ${bestLanguage[prommptValue]} is not the best!`
//       );
//     }
//   },
// };

// //对象中的方法，需要下列这样操作才能执行。
// poll.registerNewAnswer();

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// //Coding Challenge #1

// //上面的内容，就是因为审题不准确，实际上题目本身给了这个对象，不用我自己去创建
// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0), //[0,0,0,0]
//   registerNewAnswer: function () {
//     //这里是让我获取上面的question和otion中的内容，然后按照上面的文本样式排列好
//     //如何使用换行符
//     console.log(this.options);
//     const prommptValue = prompt(
//       //这里又犯了个错误，split是用在字符串上的，需要先把数组用join()其转化为字符串
//       //'\n'就是换行
//       `${this.question}${'\n'}${this.options.join('\n')}`,
//       0
//     );
//     //把输入的内容数字化，方便后面设置条件
//     const optionInput = Number(prommptValue); //如果参数无法被转换为数字，则返回 NaN。
//     console.log(optionInput);
//     console.log(typeof optionInput);
//     //if the option is 3, increase the value at position 3 of the array by 1
//     //找到answers这个数组，通过具体的option找到相应的索引位置
//     // this.answers[optionInput]++;

//     // // Make sure to check if the input is a number,这里关键是要用typeof啊
//     // if (optionInput <= this.answer.length) {
//     //   this.answers[optionInput]++; //this.answers[optionInput] = this.answers[optionInput] + 1
//     //   console.log(this.answers);
//     // } else {
//     //   alert('Plese enter 0 to 3 number');
//     // }

//     //Jonas的第一题判断大小的做法，如果&&成立，就会执行右边的
//     //大于等于0并且小于数组的length
//     typeof optionInput === 'number' &&
//       // optionInput >= 0 &&
//       optionInput < this.answers.length &&
//       this.answers[optionInput]++; //如果这里的optionInput是负数，因为没有负数的索引值，可以不用管

//     this.displayResults('string');
//     this.displayResults(); //没有设置时，参数就是下方的默认值array
//   },

//   //Create a method 'displayResults' which displays the poll results.
//   //The method takes a string as an input (called 'type'),这一步理解对了吗

//   //这里的值是从prompt中输入的吗？
//   displayResults: function (type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       console.log(`Poll results are  ${this.answers.join(',')}`);
//     }

//     // if (typeof type === 'string') {
//     //   console.log(`Poll results are  ${type}`);
//     // } else if (typeof type === 'object') {
//     //   console.log(type);
//     // } else {
//     //   console.log('Please enter string or array');
//     // }
//   },
// };

// //2. Call this method whenever the user clicks the "Answer poll" button.
// //找到这个button的位置，执行这个函数，然后用bind把this绑定在poll对象上
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// //3.Create a method 'displayResults' which displays the poll results.
// // 创建一个集成 registerNewAnswer和displayResults方法的函数，方便执行
// // const methodRunner = function () {
// //   poll.registerNewAnswer.call(poll); //用call时立即执行
// //   poll.displayResults.call(poll, this.answers);//没有执行
// // };

// //5.Use the 'displayResults' method to display the 2 arrays in the test data
// // - 这里的展示2组数据是什么意思？是要用这些数据替换掉原有的answer数据吗？
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }); //默认参数'array'
// // 但是这样，输入的值，并不是
// // poll.displayResults([1, 5, 3, 9, 6, 1]);

// // - 我在这里用typeof判断它们的类型，然后执行不同的段落
// // 但是当输入值为数组时，判断的结果是对象，这样是有错误的
// //需要输入的是

// // - 不要把数据放到poll这个对象中，也就是说不用替代吗
// // - 如何用this关键字

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

//立即执行函数表达式
// (function () {
//   console.log('Never run it again!');
// })(); //没有函数名，先包裹，再立刻执行

// (() => {
//   console.log('Arrow funciton never run it again!');
// })(); //必须要包裹起来，可以选择不执行

// let num = {
//   hello: 'you',
// };

// 代码块中，用let和const声明的变量，值在该代码块中可见
// {
//   var helloOut = 'out!';
//   let helloLet = 'Let';
//   const helloConst = 'Const';
// }

// if (true) {
//   let phrase = 'Hello';
// }
// // console.log(phrase);

// for (let i = 0; i < 3; i++) {
//   let total = i;
//   console.log(total);
// }
// // console.log(total);
// console.log(i);

// let i = 2;
// while (i < 3) {
//   i++;
//   let a = i + 100;
//   console.log(a);
// }

// console.log(a);

// // console.log(hello);
// // console.log(this.helloVar);
// console.log(helloOut);
// console.log(helloLet);
// console.log(helloConst);

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// // 闭包

// const secureBooking = function () {
//   let passengerCount = 0;
//   return function () {
//     passengerCount++;
//     console.log(`passengerCout ${passengerCount}`);
//     alert(passengerCount);
//   };
// };

// const booker = secureBooking(); //相当于把secureBooking的返回值传给它了
// console.dir(booker);

// let f;
// const g = function () {
//   let a = 3;
//   f = function () {
//     console.log(a * 2);
//   };
// };
// g();
// console.dir(f);

// const boardPassengers = function (n, waitSeconds) {
//   let perGroup = n / 3;
//   setTimeout(function () {
//     console.log(`There are ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup}`);
//   }, waitSeconds * 1000);
//   console.log(`After ${waitSeconds}s`);
// };

// boardPassengers(120, 3);
// console.dir(boardPassengers);

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

//Coding Challenge #2

//做法1
// const change = function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';
//   return function () {
//     header.style.color = 'blue';
//   };
// };

// const changeColor = change(); //将change的返回值传递给changeColor
// console.dir(changeColor);
// document.body.addEventListener('click', changeColor);

// 做法2;
// const change = (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';
//   return function () {
//     header.style.color = 'blue';
//   };
// })();
// console.dir(change);
// document.addEventListener('click', change);

//做法3:Jonas的方法
//   function () {
//     const header = document.querySelector('h1');
//     header.style.color = 'red';

//     document.body.addEventListener('click', function () {
//       header.style.color = 'blue'; //是callback函数，点击以后再执行
//     });
//   }
// )();
