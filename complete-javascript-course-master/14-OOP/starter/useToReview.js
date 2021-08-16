// //Inheritance Between "Classes": Constructor Functions

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// Student.prototype = Object.create(Person.prototype);

// Student.prototype.constructor = Student;

// Student.prototype.introduce = function () {
//   console.log(
//     `Hey, I am ${this.firstName}, I\'m ${
//       2021 - this.birthYear
//     } years old, I like ${this.course}`
//   );
// };

// //下面两步就会创立新的对象
// const jonas = new Student('jonas', 1990, 'Math');
// const mark = new Person('Mark', 1993);

// console.log(jonas);
// console.log(mark);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// //类之间的继承： Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(this);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const StudentProto = Object.create(PersonProto);

// //对象为常量，可以为其增加方法或属性
// StudentProto.init = function (firstName, birthYear, course) {
//   //this 为正在调用的对象，就是下面的Mark对象
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(
//     `Hello, I am ${this.firstName}, and I am ${
//       2021 - this.birthYear
//     } year old, I like ${this.course}`
//   );
// };

// const Mark = Object.create(StudentProto);
// Mark.init('Mark', 1993, 'Math');
// Mark.introduce();

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// // //类之间的继承：ES6 Classes
// class PersonCl {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(firstName, birthYear, course) {
//     super(firstName, birthYear);
//     // this.firstName = firstName;
//     // this.birthYear = birthYear;
//     this.course = course;
//   }
// }

// const jonas = new StudentCl('Jonas', 1990, 'Math');
// console.log(jonas);

// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////
// // 封装 protect
// // 1. 关键在于_movements
// // 2. 在于设定getMovements，让真正设置private properties时外部可以直接获得movements却无法进行修改
// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.pin = pin;
//     this._movements = [];
//     this.local = navigator.language;
//   }

//   deposit(val) {
//     this._movements.push(val);
//   }

//   withdraw(val) {
//     this.deposit(-val);
//   }

//   approveLoan(val) {
//     return true;
//   }

//   requestLoan(val) {
//     if (this.approveLoan(val)) {
//       this.deposit(val);
//       console.log('Allow to Loan');
//     }
//   }

//   //得到
//   getMovements() {
//     console.log(this._movements);
//   }
// }

// const jonas = new Account('Jonas', 'EU', 1111);

// jonas.requestLoan(1000);
// jonas.withdraw(100);
// jonas.deposit(122);

// // console.log(jonas);
// jonas.getMovements();

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// // 封装 Private Class Fields and Methods
// // 1. 关键在于 #movements 这种私密字段
// // 2. 在于设定getMovements，让真正设置private properties时外部可以直接获得movements却无法进行修改
// class Account {
//   //this is public instances fields
//   local = navigator.language;

//   //这些是private instances fields
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.#pin = pin;
//     // this.local = navigator.language;
//   }

//   deposit(val) {
//     this.#movements.push(val);
//   }

//   withdraw(val) {
//     this.deposit(-val);
//   }

//   approveLoan(val) {
//     return true;
//   }

//   requestLoan(val) {
//     if (this.approveLoan(val)) {
//       this.deposit(val);
//       console.log('Allow to Loan');
//     }
//   }

//   //得到
//   getMovements() {
//     console.log(this.#movements);
//   }
// }

// const jonas = new Account('Jonas', 'EU', 1111);

// jonas.requestLoan(1000);
// jonas.withdraw(100);
// jonas.deposit(122);

// console.log(jonas);
// jonas.getMovements();
