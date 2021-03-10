'use strict';

let i = 0;
const covertUnderToCamel = function (item) {
  const str = item + ''; //通过这个方式保证必定是字符串
  const splitStr = str.split('_');
  const [firstHalf, secondHalf] = splitStr;
  console.log(`firstHalf:`, firstHalf);
  console.log(`secondHalf:`, secondHalf);
  let newFirstHalf = '';
  for (const i of firstHalf) {
    if (i !== ' ') {
      newFirstHalf = firstHalf.slice(firstHalf.indexOf(i));
      console.log(`i：${i}`);
      console.log(newFirstHalf); //
      break; //不再继续循环
    }
  }

  const seconHalfChange = secondHalf.replace(
    secondHalf[0],
    secondHalf[0].toUpperCase()
  );
  const newStr = newFirstHalf + seconHalfChange;
  console.log(newStr);

  i++;
  //设定目标长度为20，然后从后面开始添加符号空格填满，这样的目的是让前面跟后面的内容分开
  console.log(newStr.padEnd(20, ' '), '🍕'.repeat(i));
};

// const obj = {
//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },
//   menu: ['Pizza', 'Pasta', 'Risotto'],
//   order: function (start) {
//     return [this.menu[start]]; //这里要用[]包裹起来
//   },
// };

// //Entire Object
// const entries = Object.entries(obj.openingHours);
// console.log(entries);

// for (const x of entries) {
//   console.log(x);
// }

// //[key, value]解构数组与解构变量
// for (const [index, { open, close }] of entries) {
//   console.log(index, open, close);
// }

// //Properties Value
// const values = Object.values(obj.openingHours);
// console.log(values);

// // Properties Names
// const properties = Object.keys(obj.openingHours);
// let coutDays = '';
// for (const day of properties) {
//   coutDays += `${day} `; //关键是要用``这个方法
//   console.log(coutDays);
// }
// console.log(`There has ${properties.length} days and It's ${coutDays}`);

// for (const key of Object.keys(properties)) console.log(key);

//Array
// const user = [];
// console.log(user[0]?.name ?? 'The array is empty!');

// Method
// console.log(obj.order?.(2) ?? 'Method is not undefined'); //order是个数组，得到具体值
// console.log(obj.order?.(4) ?? 'Method is not undefined'); //order这个方法存在，内容undefined
// console.log(obj.orderNoddle?.(3) ?? 'Method is not undefined'); //这里判断的是方法是否创建

// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   console.log(obj.openingHours[day]?.open ?? '对象中没有这个方法名'); //
// }

// console.log(obj.openingHours?.thu?.open);

// const { firstName: fsn, lastName: lsn, deep } = obj;
// const objCopy = { fsn, lsn, deep };

// // const objCopy = Object.assign({}, obj);
// const objCopy = { ...obj };

// objCopy.firstName = 'Xianxiao';
// objCopy.deep.food = 'noddle';
// console.log(obj);
// console.log(objCopy);

// const fn = () => {
//   console.log(this);
// };

// fn();
