// 'use strict';

// //构造函数的首字母要大写，这是惯例convention
// //必须要使用regular function，而不是箭头函数，因为需要用到this
// const Person = function (firstName, birthYear) {
//   //在添加属性之前的this
//   // console.log(this);

//   //在创建实例后，相当于实例创建的那个对象，添加了一个firstName的属性，然后把参数firstName赋值给这个属性。
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.hey = function () {
//   // console.log('Hey there!😎');
// };

// // console.log(Person);
// Person.hey();

// //构造函数调用，创建新的实例
// const Mark = new Person('Mark', 1993);
// const Jonas = new Person('Jonas', 1991);

// //判断变量Mark是否为Person的实例
// // console.log(Mark instanceof Person);

// //1. New {} is created
// //2. function is called
// //3. {} linked to the prototype
// //4. function automatically return {}

// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
// //Prototypes

// //给构造函数的创造method
// Person.prototype.calcAge = function () {
//   console.log(2049 - this.birthYear);
// };

// //给构造函数创造属性
// Person.prototype.shuxing = 'whatever';

// //构造函数本身Person没有变化
// // console.log(Person);

// //它的实例都能用Person的prototype的方法
// // Mark.calcAge();
// // Jonas.calcAge();

// //它的实例都能读取Person的prototype的属性
// // console.log(Mark.shuxing);

// //得到实例的原型
// // console.log(Mark.__proto__);

// //判断实例的__proto__是否与构造函数的prototype相等
// // console.log(Mark.__proto__ === Person.prototype);  //true
// // console.log(Person.prototype.isPrototypeOf(Mark));  //true
// // console.log(Person.prototype.isPrototypeOf(Person)); //构造函数后面跟着的prototype，实际上代表的是protoOfLinkedObjects，不是构造函数本身的原型，所以这里是false

// //判断实例是否有某个属性
// // console.log(Mark.hasOwnProperty('firstName'));

// // console.log(Mark.__proto__ === Person.prototype); //true
// // console.log(Mark.__proto__.__proto__ === Object.prototype); //true
// // console.log(Mark.__proto__.__proto__.__proto__ === Object.prototype.__proto__); //true, null

// // console.dir(Person.prototype.constructor);

// const arr = [2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 8, 8, 9];
// // console.log(arr.__proto__ === Array.prototype); //true
// // console.log(arr.__proto__.__proto__); //Object.prototype
// // console.log(arr.__proto__.__proto__.__proto__); //null

// //给Array的原型上增加一个属性whatever
// Array.prototype.whatever = 'this can use instance like arr';
// //在arr中可以读取到whatever属性
// // console.log(arr.whatever); //'this can use instance like arr'

// Array.prototype.unique = function () {
//   console.log(this);
//   return [...new Set(this)];
// };

// // console.log(arr.unique());

// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
// //Code Challenge#1
// const Car = function (take, speed) {
//   this.take = take;
//   this.speed = speed;
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// Car.prototype.accelerate = function () {
//   this.speed = this.speed + 10;
//   console.log(this.speed);
// };

// Car.prototype.brake = function () {
//   this.speed = this.speed - 5;
//   console.log(this.speed);
// };

// // console.log(bmw);
// // console.log(Car.prototype);

// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
// //Class
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(`use class to print firstName :${this.fullName}`);
//   }

//   get Age() {
//     return 2021 - this.birthYear;
//   }

//   //set a property that already exsits
//   //?这里的name是怎么传到进去的？
//   set fullName(name) {
//     //判断条件为true，创建一个新的属性_fullName，并将set参数赋值给它
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name`);
//   }

//   //通过get获得set中的值
//   get fullName() {
//     return this._fullName;
//   }
// }

// const Lee = new PersonCl('Mark Li', 1993);
// // console.log(Lee.fullName);
// // console.log(Lee);

// // PersonCl.prototype.greet = function () {
// //   console.log(`Welcome ${this.LastName}`);
// // };

// //1.Classes are not hoisted 它不是提升的，所以不能再声明之前调用
// //2.Classes are first-class citizes 可以把它们传输函数中，也可以从函数中返回（因为其实际上也是函数）
// //3.Classes are excuted in strict mode 即使没有在全局中执行严格模式，Classes中的内容也是严格模式的

// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
// //Getter and Setter
// const account = {
//   movements: [200, 100, -100, 300],
//   owner: 'Mark',

//   get latest() {
//     //slice(-1)得到数组的最后一个值，然后用pop()将这个值从数组中删除，最后再返回这个值
//     console.log(this.movements.slice(-1).pop());
//     return this.movements.slice(-1).pop();
//   },

//   //必须要有参数
//   // set latest(mov) {
//   //   //将set中的值传输到movements的数组中
//   //   this.movements.push(mov);
//   // },
// };

// //如果用了get，不需要用latest()
// // console.log(account.latest);

// //右边的10000就是set中的那个参数
// // account.latest = 10000;
// // console.log(account.movements);

// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// //Object.creat

// //创建了一个正常的对象，其中拥有方法
// const PersonSteve = {
//   calcAge() {
//     console.log(2021 - this.birthYear);
//   },

//   //因为后面不是用new，所以这里不是构造函数constructor，这里的init也可以改成别的名字
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// //创建一个新的空对象，这个空对象的prototype就是PersonSteven
// const steven = Object.create(PersonSteve);

// //给这个对象创造新的属性
// steven.name = 'steven';
// steven.birthYear = 2002;

// //这下能从this中找到birthYear了
// // console.log(steven);
// // steven.calcAge();

// const sarah = Object.create(PersonSteve);
// sarah.init('sarah', 1991);
// // console.log(sarah);
// // sarah.calcAge();

// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// //Coding Chanllenge #2
// // const Car = function (take, speed) {
// //   this.take = take;
// //   this.speed = speed;
// // };

// /*
// const Car = function(take, speed) {
//   this.take = take;
//   this.speed = speed;
// }
// */

// class Carcl {
//   constructor(take, speed) {
//     this.take = take;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed = this.speed + 10;
//     console.log(this.speed);
//   }

//   brake() {
//     this.speed = this.speed - 5;
//     console.log(this.speed);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.3;
//   }
// }

// const Ford = new Carcl('Ford', 120);

// // console.log(Ford.speedUS);

// // Ford.accelerate();
// // Ford.accelerate();
// // Ford.accelerate();
// // Ford.brake();
// // Ford.speedUS = 50;
// // console.log(Ford);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// //Inheritance Between "Classes": Constructor Functions

// const PersonA = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// PersonA.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// // console.log(PersonA);

// const Student = function (firstName, birthYear, course) {
//   //没有使用New,普通函数执行时，this是undefine，所以会报错
//   // PersonA(firstName, birthYear);
//   // console.log(this);
//   //this是正在被动用的Student
//   PersonA.call(this, firstName, birthYear);
//   this.course = course;
// };

// //Linking Prototypes
// Student.prototype = Object.create(PersonA.prototype); //这里会返回一个{}，所以要把这部分，放置在设置Student的属性之前

// Student.prototype.introduce = function () {
//   console.log(
//     `Hello, I am ${this.firstName}, and I am ${
//       2021 - this.birthYear
//     } year old, I like ${this.course}`
//   );
// };

// Student.prototype.constructor = Student;

// const mike = new Student('Mike', 1992, 'Math');
// // mike.introduce();
// // mike.calcAge();

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// //Coding Challenge #3

// //通过之前的Car类和Call来创建EV
// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   console.log((this.chargeTo = chargeTo));
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.take} going at ${this.speed}km/h, with a charge of %${this.charge}`
//   );
// };

// const BYD = new EV('BYD', 300, 90);
// // console.log(BYD.accelerate());
// // console.log(BYD.brake());
// // BYD.chargeBattery(90);

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// //类之间的继承：ES6 Classes

// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(`use class to print firstName :${2021 - this.birthYear}`);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get Age() {
//     return 2021 - this.birthYear;
//   }

//   //set a property that already exsits
//   //?这里的name是怎么传到进去的？fullName的值
//   set fullName(name) {
//     //判断条件为true，为当前对象创建一个新的属性_fullName，并将set参数赋值给它
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name`);
//   }

//   //通过get获得set中的值
//   get fullName() {
//     return this._fullName;
//   }

//   //static method
//   static hey() {
//     console.log('Hey there!');
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     //Always need to happen first!这是必须被继承的部分
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(
//       `Hello, I am ${this.fullName}, and I am ${
//         2021 - this.birthYear
//       } year old, I like ${this.course}`
//     );
//   }

//   calcAge() {
//     console.log(
//       `I am ${2021 - this.birthYear} year old, but as a student, I feel like ${
//         2021 - this.birthYear + 10
//       } years old`
//     );
//   }
// }

// const jessica = new StudentCl('Jessica david', 1990, 'Computer Science');
// jessica.introduce();
// jessica.calcAge(); //在父类和子类有相同方法名的情况下，先从浅层的子类开始找，没有再往父类找

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//类之间的继承： Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   },
// };

// const StudentProto = Object.create(PersonProto);

// StudentProto.init = function (fullName, birthYear, course) {
//   console.log(this);
//   //call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
//   //这里的this就是实际调用的新创建的对象jay
//   PersonProto.init.call(this, fullName, birthYear);

//   this.course = course;
// };

// //增加introduce方法
// StudentProto.introduce = function () {
//   console.log(
//     `Hello, I am ${this.fullName}, and I am ${
//       2021 - this.birthYear
//     } year old, I like ${this.course}`
//   );
// };

// const jay = Object.create(StudentProto);
// jay.test = 'Object jay';

// //注意jay通过init方法输入相应的参数
// jay.init('Jay', 2001, 'Computer Science');
// console.log(jay);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
// //封装的各种知识

// class Account {
//   static #pinin; //在static method中调用
//   static local = navigator.language;
//   //----------------------------------------------------------------------------------------

//   // 1) Public fields (instances)
//   // local = navigator.language; //结尾必须要有冒号

//   // 2) Private fields (instances) 特点是前面有#
//   #movements = [];
//   #pin; //未定义的公共字段

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;

//     //Private property 先找到私密字段#pin，然后将参数pin赋值给它
//     this.#pin = pin;
//     // this.#movements = [];
//     // this.local = navigator.language;
//   }

//   // 3) Public methods   这些就是Public interface
//   //让外部人员能够得到数据，却无法直接设置数据
//   getMovements() {
//     return this.#movements;
//   }

//   deposit(val) {
//     this.#movements.push(val);
//     //this就是当前那个对象
//     return this;
//   }

//   withdraw(val) {
//     this.deposit(-val);
//     return this;
//   }

//   requestLoan(val) {
//     if (this._approveLoan(val)) {
//       this.deposit(val);
//       console.log(`Approve Loan`);
//       return this;
//     }
//   }

//   // 4) Private methods # 目前尚无法展示，用_代替
//   _approveLoan(val) {
//     return true;
//   }

//   //Static也可以使用这四种方式,只能被原型调用，无法被实例调用
//   static helper() {
//     console.log(this.#pinin);
//   }
// }

// const jonas = new Account('Jonas', 'CN', 1111, 2222);

// //Chaining methods  对象的方法要返回this，也就是当前对象，才能继续执行对象方法，形成方法链
// jonas
//   .deposit(100)
//   .deposit(100)
//   .deposit(13200)
//   .withdraw(2232)
//   .requestLoan(423120);

// //通过public interface得到内部的private properties
// console.log(jonas.getMovements());
// // console.log(jonas);

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// // ES6 Classes Summary

// class Person {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
// }

// class Student extends Person {
//   static numSubjects = 10;

//   //Private fields
//   #course;
//   #university = 'Sichuan University';
//   #studyHours = 0;

//   constructor(fullName, birthYear, startYear, course) {
//     super(fullName, birthYear);
//     this.startYear = startYear;

//     //给pravite fields赋值
//     this.#course = course;
//   }

//   introduce() {
//     console.log(`I study ${this.#course} at ${this.#university}`);//外部可以通过introduce方法得到#course和#university数据，却无法进行修改
//   }

//   #makeCoffee() {
//     return 'Here is a coffee for you';
//   }

//   study(h) {
//     this.#studyHours = this.#studyHours + h;
//     this.#makeCoffee();
//     // this.#studyHours +=h;
//   }

//   get testsCore() {
//     return this._testScore;
//   }

//   set testsCore(score) {
//     //这里相当于对象中创建了一个_testScore属性
//     this._testScore = score <= 20 ? score : 0;
//   }

//   static printCurriculum() {
//     console.log(`There are ${this.numSubjects} subjects`);
//   }
// }

// const student = new Student('Jonas', 2020, 2037, 'Medicine');
// console.log(student);

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//挑战4

class Carcl {
  constructor(take, speed) {
    this.take = take;
    this.speed = speed;
  }

  accelerate() {
    this.speed = this.speed + 10;
    console.log(this.speed);
    return this;
  }

  brake() {
    this.speed = this.speed - 5;
    console.log(this.speed);
    console.log(this);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.3;
  }
}

class EVcl extends Carcl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(this);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.take} going at ${this.speed}km/h, with a charge of %${
        this.#charge
      }`
    );
    return this;
  }
}

const jili = new EVcl('JILI', 120, 30);
// console.log(jili);

jili.accelerate().accelerate().accelerate().brake().chargeBattery(30);
