const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
let scorers = {}; //创建一个对象
const players = game.scored.values();
for (const player of players) {
  if (scorers[player]) {
    //对象中未赋值的属性的值为undefined（而不是null）
    scorers[player]++; //如果第二次出现就开始自增
  } else {
    scorers[player] = 1;
    // 给属性赋值为1
  }
}
console.log(scorers);

// for (const player of players) {
//   scores[player] ? scorers[player]++ : (scorers[player] = 1);
// }

// const obj = {};
// console.log(obj.good);
// obj.good = 1;
// console.log(obj);
// scorers = scorers[player];
// console.log(scorers);

// // console.log(game.odds.entries())//这样不行，因为game.odds不是数组;
// const oddsEntries = Object.entries(game.odds);
// for (const [key, value] of oddsEntries) {
//   const teamStr = key === 'x' ? 'draw' : game[key]; //key是变量，这里作用方法，用[]
//   console.log(`Odd of victory ${teamStr}:${value}`);
// }

// const oddsValue = Object.values(game.odds); //得到索引值组成的数组
// const length = oddsValue.length; //得到数组的length，总赔率处于length就得到相关数字
// let sum = 0; //方便后面赔率相加
// for (const i of oddsValue) {
//   sum += i; //相加所有的赔率
// }
// let avaOdd = sum / length; //赔率处于length
// console.log(avaOdd);

// console.log(``);

// const oddsValue = Object.values(game.odds);
// let avaOdd = 0; //方便后面赔率相加
// for (const i of oddsValue) {
//   avaOdd += i; //相加所有的赔率
// }
// // avaOdd = avaOdd / oddsValue.length; //赔率除以length
// avaOdd /= oddsValue.length; //赔率除以length
// console.log(avaOdd);

// const gameScore = Object.entries(game.scored);

// console.log(gameScore);
// for (const i of gameScore) {
//   console.log(i);
// }

// console.log(game.scored.entries());
// for (const i of game.scored.entries()) {
//   console.log(i);
// }

// for (const [index, value] of gameScore) {
//   // console.log(`Goal ${parseInt(index) + 1}: ${value}`);
// }

// for (const [i, value] of game.scored.entries()) {
//   // console.log(`Goal ${i + 1}: ${value}`);
// }
