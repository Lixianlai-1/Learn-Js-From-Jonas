// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// const odds = new Map(Object.keys(game.odds)); //
// const odds2 = Object.value(game.odds);
// console.log(odds);
// console.log(odds2);

const question = new Map([
  ['question', 'What is the best programing language in the world'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'You are right'],
  [false, 'You are wrong'],
  //   true
  //   1,
  //   2,
  //   3,
  //   'string',
  //   { ['hello']: 2 },
]);
console.log(question);
// console.log([question]);
console.log(question.keys());
console.log(question.values());

// const map = new Map([
//   [1, 2],
//   [1, 2],
//   [1, 3],
// ]);
// console.log(map);

// const arr = [
//   [1, 2],
//   [1, 2],
//   [1, 3],
// ];

// console.log(arr);

// for (const [key, value] of question) {
//   if (typeof key === 'number') {
//     console.log(`Answer ${key} : ${value}`);
//   }
// }

// const userEnter = 3;
// console.log(userEnter);
// console.log(typeof userEnter); //prompt得到的是字符串
// console.log(Number(userEnter));

// console.log(question.get(Number(userEnter) === question.get('correct')));

//convert to array
// const questionArray = [...question];
// console.log(questionArray);
//严格相等，必须将字符串转化为数字
//如果输入的数字跟正确的值相等，就是true，反之是false,非常秒啊

// if (userEnter == question.get('correct')) {
//   console.log(question.get(true));
// } else {
//   console.log(question.get(false));
// }

//--------------------------------------------------------------------------------
// const rest = new Map();
// console.log(rest);
// rest
//   .set(1, 2)
//   .set(1, 'good')
//   .set(false, 'We close the door')
//   .set(true, 'We open the door')
//   .set('open', 8)
//   .set('close', 22)
//   .set('test', false)
//   .set(22, "if don't use time ")
//   .set(document.querySelector('h1'), 'Healing');

// console.log(rest);
// rest.set([1, 2], 'in heap somewhere');
// console.log(rest.get([1, 2])); //和set的[1,2]在heap的不同地址上

// const arr = [3, 4];
// rest.set(arr, 'in heap');
// console.log(rest.get(arr));

// rest.delete(1); //删除
// console.log(rest.size); //删除一个后只有6个键值对了
// console.log(rest.has(false)); //是否有false这个key，有，所以为true
// rest.clear(); //清空
// console.log(rest); //清空后的状态

// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); //必须要用time对比
// //也就是在time大于8时，且小于22点时，判断为true，找到key为true的值，是开门的状态

// console.log(rest.get('test'));
// console.log(rest.get(true));
// console.log(rest.get(1));

// console.log(new Set(['noodle', 'pizza', 'tofu', 'tofu', 'pizza']).size); //不重复的有几个

// const foodSet = new Set(food);
// console.log(foodSet);

// const foodUniqueArray = [...foodSet];
// console.log(foodUniqueArray);

// for (const item of food) {
//   console.log(item);
// }
// console.log(food);
// console.log(food.size);

// const myName = new Set('lllixiaoxxx');
// myName.clear();
// console.log(myName);

// const myName2 = new Set(['lllixiaoxxx', 'li']);
// console.log(myName2);
// console.log(myName2.has('li')); //如果要删除多个字符，除非原本有存在，例如用数组包裹的
// // myName.delete('x');
// myName2.delete('li'); //可以删除单个字符
// console.log(myName2);
