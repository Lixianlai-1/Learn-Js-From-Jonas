// const testSwitch = function (i) {
//   const b = 0;
//   switch (+i) {
//     case b + 1:
//       console.log('case b+1');
//       break; //不设置就会继续执行下面的代码
//     case 2:
//       console.log('equal 2');
//       break;
//     default:
//       console.log('default case'); //最后的默认位置，不用设置break
//   }
// };

// testSwitch(1); // case b+1符合等于1
// testSwitch(2);

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

////数字型转化
// console.log(Number(undefined));
// console.log(Number(null));
// console.log(Number(NaN));

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// //布尔值转化
// console.log(Boolean(NaN));
// console.log(Boolean(null));
// console.log(Boolean(undefined));
// console.log(Boolean(0));
// console.log(Boolean(''));

// console.log(Boolean(1));
// console.log(Boolean(' ')); //有空格，不是空字符串

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

//prompt
// let age = prompt('How are you?', "I'm good!");
// console.log(age);

//confirm
// let isBoss = confirm('Are you boss?');
// console.log(isBoss);

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

//检测string.split()和arr.join()
// const arr = [1, 2, 3];
// const str = 'a,b,c';

// console.log(arr.join(','));
// console.log(str.split(','));

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// //逻辑||
// let hour = 1;
// let n = null;
// let u = undefined;
// let zero = 0;

// hour || console.log(n); //hour为1，转化为true，不再执行后面的内容
// n || console.log(hour); //n为null，转化为false，继续执行后面的内容
// hour && console.log(' 111');

// // if (hour < 10 || hour > 9 || hour == true) {
// //   //非严格相等，可以转为布尔值比较
// //   console.log(hour);
// // }

// // console.log(hour > 9 || hour > 7 || hour > 6); //如果是比较大小，注意是返回判断的结果，true或false
// // console.log(hour > 9 || hour > 7 || hour > 0); //注意这里是返回判断的结果
// // console.log(hour > 9 || hour > 7 || hour);
// // console.log(hour > 9 || hour > 7 || n);
// // console.log(hour > 9 || hour > 7 || u); //返回最后的值
// // console.log(hour > 9 || hour > 7 || zero); //0的布尔值为false
// // console.log(null || 1 || 0); //1的布尔值为true，返回1，不再继续执行

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// //逻辑&&
// console.log(2 && undefined && 1);
// console.log(1 && 2 && null && 3);
// console.log(1 && 2 && 3 && 4);

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
const obj = {
  a: 1,
  b: 2,
};

const arr = [3, 2, 7];

// for (const i of obj) {
//   console.log(i);
// } //对象不能用for-of

for (const i in obj) {
  console.log(`key: ${i}`, `key value： ${obj[i]}`);
}

for (const i of arr) {
  console.log(`arr`, i);
}
