'use strict';

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

// const [player1, player2] = game.players;

// //对于第一队创建一个变量gk，并把守门员的名字赋值给它s
// const [gk, ...fieldPlayers] = player1;
// console.log(gk, fieldPlayers);

// const allPlayers = [...player1, ...player2];
// console.log(allPlayers);

//--------------------------------------------------------------------------------------------
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (start, main) {
    // return [this.starterMenu(start), this.mainMenu(main)];//这里要用[]包裹起来,其次，startMenu是数组要用[]包裹索引值
    return [this.starterMenu[start], this.mainMenu[main]]; //这里要用[]包裹起来
  },

  openingHours,

  // orderDelivery: function ({ time = '19:00', address, mainIndex, startIndex }) {
  //   //对象中的方法中的函数的参数是对象时，且这个对象是解构对象
  //   console.log(
  //     `mainMenu:${this.mainMenu[mainIndex]},
  //     startMenu:${this.starterMenu[startIndex]},
  //     time=${time},
  //     address:${address}`
  //   );
  // },
  orderDelivery({ time = '19:00', address, mainIndex, startIndex }) {
    //对象中的方法中的函数的参数是对象时，且这个对象是解构对象
    console.log(
      `mainMenu:${this.mainMenu[mainIndex]},
      startMenu:${this.starterMenu[startIndex]},
      time=${time},
      address:${address}`
    );
  },

  // orderPasta: function (ing1, ing2, ing3) {
  //   console.log(`here is your delicious pasta with
  //   ${ing1},${ing2},${ing3}`);
  // },
  orderPasta(ing1, ing2, ing3) {
    console.log(`here is your delicious pasta with
    ${ing1},${ing2},${ing3}`);
  },

  orderPizza(mainS, ...ohters) {
    //作为parameter时，...是收集其他的元素到一个数组中
    console.log(mainS);
    console.log(ohters);
  },
};

// //普通的判断时0或空位否
// restaurant.numGuest = 0;
// const guest = restaurant.numGuest || 10;
// //Nullish:null and undefined(not 0 or '')只有是null或undefined时才为否
// const guestCopu = restaurant.numGuest ?? 10;
// console.log(guest);
// console.log(guestCopu);

// const objTest = {
//   arrow: function () {
//     console.log(this);
//   },
// };

// objTest.arrow();

// const add = function (...number) {
//   let num = 0;
//   for (let i = 0; i < number.length; i++) {
//     num += number[i];
//   }
//   console.log(number);
//   console.log(num);
// };

// const x = [7, 8, 9];
// add(...x);

// const { sat, ...otherDays } = restaurant.openingHours;
// console.log(sat, otherDays);

// const [Focaccia, , ...otherEls] = restaurant.starterMenu;
// console.log(Focaccia, otherEls);

//... on the = right side
// const spreadMethod = [1, 2, 3, ...[4, 5]];
// console.log(spreadMethod);

//... on the = left side
// const [a, b, ...others] = [1, 2, 4, 3];
// console.log(a, b, others);

// // prompt funciton
// const ingredents = [
//   prompt(["let's order pasta! ingredent 1  "]),
//   prompt(["let's order pasta! ingredent 2  "]),
//   prompt(["let's order pasta! ingredent 3  "]),
// ]; //为什么要放入数组中？
// console.log(ingredents);

// restaurant.orderPasta(ingredents[0], ingredents[1], ingredents[2]); //用展开语法代替，提取出其中的元素
// restaurant.orderPasta(ingredents);
// restaurant.orderPasta(...ingredents);

// const newRestaurant = { ex1: 1, ...restaurant, ex2: 2 };
// console.log(newRestaurant);

// // string use spread method
// const str = 'how are you!';
// const newStr = [...str]; //We cannot just use ...str without []
// console.log(newStr);
// console.log(...str);

// console.log(`${...newStr}`);
// console.log(`${[...newStr]}`);

// join two arrays
// const joinTwoMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(joinTwoMenu);

// // Copy array
// const newMainMenu = [...restaurant.mainMenu, 'Noddle']; //创造了一个新的数组
// console.log(newMainMenu);

// restaurant.orderDelivery({
//   // time: '20:00',
//   address: 'china',
//   mainIndex: 2,
//   startIndex: 0,
// });

//交换变量值mutating variable
// let a = 111;
// let b = 222;
// const obj = { a: 1, b: 2 };
// ({ a, b } = obj); //需要用括号包裹起来
// // console.log(a, b);

// //解构对象，赋新值
// const {
//   categories: resetCategories,
//   mainMenu: resetMainMenu,
//   order: resetOrder,
//   openingHours,
// } = restaurant;
// console.log(resetCategories, resetMainMenu, resetOrder, openingHours);

//解构嵌套对象
// const {
//   fri: { open: v, close: m },
// } = openingHours; //这里的openingHours已经从前方解构对象定义过了
// // console.log(v, m);

// //解构对象的默认值设置
// const { menu, name: resetName = ['default value'] } = restaurant;
// // console.log(menu, resetName);

// let [main, , , second] = restaurant.categories; //
// console.log(main, second);

//变换值，数值中mutating value
// const temp = main;
// main = second;
// second = temp;
// console.log(main, second);

// [main, second] = [second, main];
// console.log(main, second);

// console.log(restaurant.order(1, 2));
// const [startValue, mainValue] = restaurant.order(1, 2);
// // console.log(startValue, mainValue);

// //嵌套数组解构
// const nested = [1, 2, [3, 4]];
// const [x, , [y, z]] = nested;
// // console.log(x, y, z);

// //解构数组设置默认值
// const [p = 100, q = 100, r = 3] = [1, 2];
// // console.log(p, q, r);

// const obj2 = {
//   names: {
//     firstName: 'Xiao',
//     lastName: 'Li',
//   },
// };

// const {
//   names: { firstName: fsn, lastName: lsn },
// } = obj2;

// console.log(fsn, lsn);

// const arr = [3, 4, 5, [6, 7]];

// const newArr = [1, 2, ...arr];
// console.log(newArr);
// console.log(...newArr);
