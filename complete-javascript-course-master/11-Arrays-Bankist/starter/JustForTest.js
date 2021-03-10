// //取余
// console.log(5 % 2);
// console.log(6 % 2);
// console.log(15 % 6);

// //求幂运算 a ** b 是 a 乘以自身 b 次。
// console.log(2 ** 2); //2的2次方
// console.log(3 ** 5); //3的5次方

// console.log(1 + '1'); //'11'
// console.log('2' + 3); //'23'
// console.log('string' + 3); //'string3'

// //在字符串前面加上+ 转化为数字
// console.log(+'3'); //3

// //只有加法会有连接作用，其他的几个运算，是将字符串转换为数字
// console.log(2 - '1'); //1
// console.log(4 / '2'); //2
// console.log(4 * '2'); //2

// console.log(3 - 2 + +'2');

// 原地修改
// let n = 2;
// n *= 2; //n = n * 2
// n /= 2; //n = n / 2
// n += 2; //n = n +2
// n -= 2; //n = n -2
// console.log(n); //n = 8

// n += 5 + 3; //这些运算符优先级和=运算符优先级一样，所以先计算5+3，最后就是n = n + 8
// console.log(n);

// //自增/自减
// let couter1 = 2;
// console.log(`++couter`, ++couter1); //couter是2，加之后的值，变成了3
// console.log(`couter1:`, couter1);

// console.log('---------------------------------');

// let couter2 = 100;
// console.log(`couter2++`, couter2++); //couter已经变成4，还是加之前的值，还是3
// console.log(`couter2:`, couter2);

// console.log('---------------------------------');

// let couter3 = 50;
// console.log(couter3--); //couter3在减之前，还是50

// let couter4 = 999;
// console.log(--couter4); //couter3减之后，就是998

// '10' - 1;
// false; // true + false  = 1 ???
// 2;
// 6;
// ('9px');
// ('$45');
// 2;
// 0; //7 / 0 = Infinity
// '-95' - 4; //字符串的空格要算上
// 1;
// 1; //NaN
// NaN; //-2

// '' + 1 + 0;
// '' - 1 + 0;
// true + false;
// 6 / '3';
// '2' * '3';
// 4 + 5 + 'px';
// '$' + 4 + 5;
// '4' - 2;
// '4px' - 2;
// 7 / 0;
// '  -9  ' + 5;
// '  -9  ' - 5;
// null + 1;
// undefined + 1;//将undefined转化为数字，NaN
// ' \t \n' - 2;

// console.log(+' \t \n'); //转换为0

// let a = Number(prompt('First number?', 1));
// let b = +prompt('Second number?', 2);

// alert(a + b); // 3

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// if (n < 0) {
//   alert(`Power ${n} is not supported`); //最好的方式，更具可读性
// }

// if (n < 0) alert(`Power ${n} is not supported`); //也可以

// // 回勾引号 ` 允许将字符串拆分为多行
// let str = `
//   ECMA International's TC39 is a group of JavaScript developers,
//   implementers, academics, and more, collaborating with the community
//   to maintain and evolve the definition of JavaScript.
// `;

// if (id === 123 && moonPhase === 'Waning Gibbous' && zodiacSign === 'Libra') {
//   letTheSorceryBegin();
// }

let calculator = {};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());
