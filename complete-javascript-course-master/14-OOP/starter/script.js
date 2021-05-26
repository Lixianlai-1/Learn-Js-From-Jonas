'use strict';

//构造函数的首字母要大写，这是惯例convention
//必须要使用regular function，而不是箭头函数，因为需要用到this
const Person = function (firstName, lastName) {
  //在添加属性之前的this
  console.log(this);

  //在创建实例后，相当于实例创建的那个对象，添加了一个firstName的属性，然后把参数firstName赋值给这个属性。
  this.firstName = firstName;
  this.lastName = lastName;

  //构造函数最终会自动返回那个对象
};

//构造函数调用，创建新的实例
const Mark = new Person('Mark', 'Li');
console.log(Mark);

//1. New {} is created
//2. function is called
//3. {} linked to the prototype
//4. function automatically return {}
