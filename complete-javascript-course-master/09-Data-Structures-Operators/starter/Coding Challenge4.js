// let i = 0;
// const covertUnderToCamel = function (item) {
//   const lowerItem = item.toLowerCase(); //让item变成小写
//   //   console.log(`lowerItem`, lowerItem);
//   const UpperWordIndex = lowerItem.indexOf('_') + 1; //下划线后面一位的索引值,方便截取后边比分的字符串

//   let firstHalf = lowerItem.slice(0, lowerItem.indexOf('_')).trim(); //找到下划线之前的索引，然后截取不包括'_'之前的部分
//   //   console.log(`firstHalf:`, firstHalf);

//   let secondHalf = lowerItem.slice(UpperWordIndex);
//   //   console.log(`secondHalf:`, secondHalf);

//   const changedSecondHalf = secondHalf.replace(
//     secondHalf[0],
//     secondHalf[0].toUpperCase()
//   );
//   //   console.log(`changeSecondHalf:`, changedSecondHalf);
//   const newString = firstHalf + changedSecondHalf;
//   i++;
//   //设定目标长度为20，然后从后面开始添加符号空格填满，这样的目的是让前面跟后面的内容分开
//   console.log(newString.padEnd(20, ' '), '🍕'.repeat(i));
// };

// let test = 'abccc';
// test = test.replace(test[3], 1); //如何替换不是第一个找到的，而是自己想要替代的那个呢？

// // console.log(test);

// // 截取下划线以后的字符串
// // lowerItem.slice(UpperWordIndex)
// //截取下划线之前的字符串

// document.body.append(document.createElement('textarea'));
// //如何获取文本数据
// document.body.append(document.createElement('button'));

// let content;
// const button = document.querySelector('button');
// button.addEventListener('click', function () {
//   //   console.log('clicked');
//   content = document.querySelector('textarea').value;
//   //   console.log(content);
//   button.addEventListener('click', covertUnderToCamel(content));
// });
// // covertUnderToCamel('first_name');
// // covertUnderToCamel('Some_variable');
// // covertUnderToCamel('Dalculate_aGE');
// // covertUnderToCamel('delayed_departure');

//--------------------------------------------------------------------------------------
//--------------------------------第二次尝试，用split
//--------------------------------------------------------------------------------------

// let i = 0;
// const covertUnderToCamel = function (item) {
//   const str = (item + '').toLowerCase().trim(); //通过这个方式保证必定是字符串，且都是小写
//   console.log(str);
//   console.log(str.indexOf('_'));
//   if (str.indexOf('_') === -1) {
//     console.log("It's not a right input ");
//   } else {
//     // const splitStr = str.split('_');
//     // const [firstHalf, secondHalf] = splitStr.trim();
//     const [firstHalf, secondHalf] = str.split('_');
//     const seconHalfChange = secondHalf.replace(
//       secondHalf[0],
//       secondHalf[0].toUpperCase()
//     );
//     const newStr = firstHalf + seconHalfChange;
//     i++;
//     console.log(newStr.padEnd(20, ' '), '✅'.repeat(i));
//     //   console.log(`firstHalf:`, firstHalf);
//     //   console.log(`secondHalf:`, secondHalf);
//     // let newFirstHalf = '';
//     // for (const i of firstHalf) {
//     //   if (i !== ' ') {
//     //     newFirstHalf = firstHalf.slice(firstHalf.indexOf(i));
//     //     //   console.log(`i：${i}`);
//     //     //   console.log(newFirstHalf);
//     //     break; //不再继续循环
//     //   }
//     // }

//     // let newFirstHalf = firstHalf.trim();

//     // const seconHalfChange = secondHalf.replace(
//     //   secondHalf[0],
//     //   secondHalf[0].toUpperCase()
//     // );

//     // const newStr = newFirstHalf + seconHalfChange;
//     // // console.log(newStr);

//     // i++;
//     // //设定目标长度为20，然后从后面开始添加符号空格填满，这样的目的是让前面跟后面的内容分开
//     // console.log(newStr.padEnd(20, ' '), '✅'.repeat(i));
//   }
// };

// //创造文本框
// document.body.append(document.createElement('textarea'));
// //创造按钮
// document.body.append(document.createElement('button'));

// let content;
// let seperateContent;
// const button = document.querySelector('button');
// button.addEventListener('click', function () {
//   content = document.querySelector('textarea').value;
//   //将字符串用\n分开，将不同行的内容分割为不同的字符串，放入数组中
//   let seperateContent = content.split('\n');
//   //将数组中的字符串拆分出来，然后执行函数
//   for (const s of seperateContent) {
//     button.addEventListener('click', covertUnderToCamel(s));
//   }
// });

let i = 0;
const covertUnderToCamel = function (i, item) {
  const str = (item + '').toLowerCase().trim();
  if (str.indexOf('_') === -1) {
    console.log("It's not a right input ");
  } else {
    const [firstHalf, secondHalf] = str.split('_');
    const seconHalfChange = secondHalf.replace(
      secondHalf[0],
      secondHalf[0].toUpperCase()
    );
    const newStr = firstHalf + seconHalfChange;
    i++;
    console.log(newStr.padEnd(20, ' '), '✅'.repeat(i));
  }
};

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

let content;
let seperateContent;
const button = document.querySelector('button');
button.addEventListener('click', function () {
  content = document.querySelector('textarea').value;
  let seperateContent = content.split('\n');
  for (const [i, value] of seperateContent.entries()) {
    button.addEventListener('click', covertUnderToCamel(i, value));
  }
});
