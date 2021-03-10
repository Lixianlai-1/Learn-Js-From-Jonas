// Remember, we're gonna use strict mode in all scripts now!
'use strict';

//问题：如何在一个数组判断出最大值和最小值，其中有不能用的，要跳过。计算器温度差

//第一步 理解问题
//1 数组中判断最大值？
//2 数组中判断最小值？
//3 skip the error part，使用typeof
//4 温差是一个什么值，数组中的值如何将它们相减？
//5 想要的效果是，随意输入一些参数，放入其中能够跟着变化，也就是目前的arrary1要变成参数
//6 if条件语句中，如何判断一个值是哪种类型？答：用typeof，typeof返回的结果是字符串

//第二步  分解问题
//子问题
//1用Math.max()得出的是字符串还是数值？可以相减吗？答：会返回number，如果不能返回数字，或转换成数字，就会返回NaN
//所以先把数组中的数字提取出来。遇到问题，有一个参数无法被转换为数字，结果被返回了NaN，所以这
// 里不适合使用Math.max或者Math.min方法

// 用另一种方法for循环，需要设定数组中的第一个值为最大，然后每循环一次就做比较。
// 设置第一个值
// for循环需要什么
// 如果 aarray[i] > temperatureMax ，那么temperatureMax = array[i]
// if语句中的i表示未定义，以为我没有用let或者var声明

//子问题2：数组中判断最小值？
//设置最小值，也以数组中第一个数
//逐个比较

//子问题3：如何跳过数组中不能转化为数字的数值？
//如何跳过？如果不能转化为数字就跳过，字符串不能转化为数字？通过判断来决定视为为数字？
//将字符串转化为数字
//字符串跟数字相比的结果是什么，先尝试将字符串转换为数字，然后进行对比。因为'error不能比较'，所以
//在计算最大最小值时被自动跳动了

//子问题4：最大温差是一个什么值，数组中的值如何将它们相减？
//- 找到最大值跟最小值，前提是已经定义了它们，然后让它们相减即可。
//- 需要定义最大温差值
const array1 = [1, 3, 2, 'error', 2, '100', 3, 5, 5, 32, -4, -9, 9999999];
const array2 = [9999, 22, 1];

// const tempAmplitude = function (tempsArray) {
//   let temperatureMax = tempsArray[0];
//   let temperatureMin = tempsArray[0];

//   for (let i = 0; i < tempsArray.length; i++) {
//     const currentTemps = tempsArray[i];

//     if (typeof currentTemps !== 'number') continue;
//     //如果没有上面这一步，那么字符串数字'100'，也会进入判断逻辑。typeof的结果是字符串包裹的类型，
//     //比如'number'  'string'

//     if (currentTemps > temperatureMax) {
//       temperatureMax = currentTemps;
//     }

//     if (currentTemps < temperatureMin) {
//       temperatureMin = currentTemps;
//     }
//   }

//   let tempsDiffer = temperatureMax - temperatureMin;
//   console.log(temperatureMax, temperatureMin, tempsDiffer);
// };

// tempAmplitude(array1);

//problem2 function要接受两组函数，将它们合并，然后计算温差值
//understand problem
//如何合并两组函数？
//计算温差值

//分解子问题
//子问题1 如何合并数组
//- 用concat合并，不会改变原有

//子问题2 合并之后，可以识别最大值，不能识别最小值
//- 那么是如何识别最小值的呢,找到相应位置后，发现写错了代码，查找最小值的地方写成了最大值

// const tempAmplitude2 = function (tempsArray1, tempsArray2) {
//   const mergeArray = tempsArray1.concat(tempsArray2);

//   let temperatureMax = mergeArray[0];
//   let temperatureMin = mergeArray[0];

//   for (let i = 0; i < mergeArray.length; i++) {
//     // debugger;
//     const currentTemps = mergeArray[i];
//     //有了上面这一步，我只需要改动了currentTemps右边的内容，下面的部分都不用动了

//     if (typeof currentTemps !== 'number') continue;
//     //如果没有上面这一步，那么字符串数字'100'，也会进入判断逻辑。typeof的结果是字符串包裹的类型，
//     //比如'number'  'string'

//     if (currentTemps > temperatureMax) {
//       temperatureMax = currentTemps;
//     }

//     if (currentTemps < temperatureMin) {
//       temperatureMin = currentTemps;
//     }
//   }

//   let tempsDiffer = temperatureMax - temperatureMin;
//   console.log(temperatureMax, temperatureMin, tempsDiffer);
//   console.log(mergeArray);
// };

// tempAmplitude2(array1, array2);

//计算开氏温标
//辨别问题：prompt返回的结果是字符串，所以需要用parseFloat转换成整数
// const measureKelvins = function () {
//   const measure = {
//     unit: 'celsius',
//     type: 'temps',
//     degree: parseFloat(prompt('输入温度')),
//     //how to string convert number
//   };

//   const kelvins = measure.degree + 100;
//   console.log(kelvins);
//   return kelvins;
// };

// measureKelvins();

// 第一步：理解问题
// 1.一个数字，包含预测的最大温度
// 2.数组中的内容被嵌入在一个字符串当中，如何将数组中的某个值，嵌入到字符串当中
// 3.创建一个函数protForecast，接受一个叫arr的的数组，然后 console.log();上面的那样的句子

// 第二步：分解成子问题
// 1.也就是数组中的每一个数字，代表某一天的最大温度
// 2.什么叫做接受一个叫arr的数组，是将其放入函数的参数当中吗
// - 这个数组是变动的，也就是说其中的值的数量是不定的，需要用循环打出，for-of还是for-in，有什么区别吗？

// 第三步：尝试其他的做法
// 1.如果有for-of，就需要设置一个天数,具体的问题就是天数
// 2.for-in跟for-of有什么区别，for-in遍历的是属性名（数组中就是索引值），for-of遍历的是属性值
const protForecast = function (arr) {
  // let curTemps;
  let str = '...';
  let curDay = 1;

  for (let i of arr) {
    str = str + `${i}C in ${curDay} days ...`;
    curDay++;
  }

  // for (let i = 0; i < arr.length; i++) {
  //   curTemps = arr[i];
  //   str = str + `${curTemps}C in ${i + 1} days ...`;
  // }

  console.log(str);
};

protForecast([1, 2, 44, 3]);
