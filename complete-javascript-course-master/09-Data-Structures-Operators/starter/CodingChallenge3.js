const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);

for (const [min, event] of gameEvents) {
  const firstOrSecond = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(` [${firstOrSecond} HALF] ${min}: ${event}`);
  //   console.log(min, event);
}

// const set = new Set([{ key: 2 }, { key2: 3 }]);
// const set = new Set([{ key: 2, key2: 3 }]); //Set中不能直接放对象，不然会报错

//1
// const events = [...new Set(gameEvents.values())];
// console.log(events);

//2
// gameEvents.delete(64);
// console.log(gameEvents);

//3
// console.log([...gameEvents.keys()]);
const time = [...gameEvents.keys()].pop(); //pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
const i = [...gameEvents.keys()].length - 1;
// console.log([...gameEvents.keys()][i]);

const howManyEvents = gameEvents.size; //size得到的是number
// console.log(time);
// console.log(howManyEvents);
// console.log(
//   `An event happened, on average, every ${parseInt(
//     time / howManyEvents
//   )} minutes`
// ); //用parseInt()去除小数点

const gameEventsTime = [...gameEvents.keys()]; //得到分钟数

function PrintEl(i) {
  if (i <= 45) {
    console.log(` [FIRST HALF] ${i}: ${gameEvents.get(i)}`);
  } else {
    console.log(` [SECOND HALF] ${i}: ${gameEvents.get(i)}`);
  }
} //创建这个函数，关键是用get()得到Map中的值

for (const item of gameEventsTime) {
  //遍历分钟数的数组
  //   PrintEl(item);
}
