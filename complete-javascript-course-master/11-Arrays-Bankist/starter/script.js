'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  // owner: 'Jonas Schmedtmann',
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//创建显示活动的函数
const displayMovements = function (movements, sort = false) {
  //在遍历之外,清空原有的内容
  containerMovements.innerHTML = '';

  //数组排序，执行升序功能;slice()保证不影响原数组
  const movs = sort
    ? movements.slice().sort((firstEl, secondEl) => firstEl - secondEl)
    : movements;

  //将数组中的遍历
  movs.forEach(function (mov, i) {
    //注意，后面的两个判断内容要为字符串
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type     movements__type--${type}">${i} ${type}</div>
      <div class="movements__value">${mov}￥</div>
   </div>
    `;
    //  <div class="movements__date">${i}</div>
    //用insertAdjacentHTML添加进HTML当中，第一个参数是添加位置，第二个是添加的内容
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// 将对象中的数组作为参数;
// displayMovements(account1.movements);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// map方法给每一个对象都增加username的属性;
const converFirstNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner //创建一个新的属性，输入小写的首字母
      .toLowerCase() //将字符串小写
      .split(' ') //将字符串用空格隔开，转化为数组
      .map(name => name[0]) //得到每个单词的首字母，然后把它们放入一个新的数组
      .join(''); //将数组中的内容用指定字符链接起来（这里是不留间隙）
  });
  accs.forEach(acc => {
    // console.log(acc);
    // console.log(acc.username);
  });
};
//这一步不能少，执行之后才会给里面的对象添加username属性
converFirstNames(accounts);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//计算剩余的钱
const calcDisplayPrintPrice = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0); //不要忘记设置初始值
  labelBalance.textContent = `${account.balance}￥`;
};
// calcDisplayPrintPrice(account2.movements);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//计算总收入，总支出, 总利润
const calcDisplaySummaryValueIn = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curValue) => acc + curValue, 0);
  labelSumIn.textContent = `${income}￥`;

  const expense = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curValue) => acc + curValue);
  labelSumOut.textContent = `${Math.abs(expense)}￥`;

  const interests = account.movements
    .filter(mov => mov > 0)
    .map((deposit, i, arr) => {
      // console.log(arr);
      return (deposit * account.interestRate) / 100;
    })
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, curValue) => acc + curValue, 0);
  // const interests = income + expense;
  labelSumInterest.textContent = `${interests.toFixed(2)}￥`;
};
// calcDisplaySummaryValueIn(account1.movements);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//升级UI，这个部分是在最后才开始做的，方便复用
const updateUI = function (acc) {
  calcDisplayPrintPrice(acc);
  displayMovements(acc.movements);
  calcDisplaySummaryValueIn(acc);
};

// console.log(account2.movements);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//计算数组中最大的值
const maxNumber = account2.movements.reduce(function (acc, cur, i) {
  // console.log(`index${i} acc:${acc}   cur:${cur}`);
  if (cur > acc) {
    return cur; //当前值大于累加器时，返回当前值，作为新的累加器的值
  } else {
    return acc; //当前值小于累加器时，返回累加器，值不变
  }
}, account2.movements[0]);

// console.log(maxNumber);
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//实现登录功能
btnLogin.addEventListener('click', function (e) {
  //在表单提交button,会导致页面重新加载，因为要使用e.preventDefault();阻止加载
  e.preventDefault();
  //找到input输入的值就用
  // const inputLoginUsername = document.querySelector('.login__input--user');
  const currentAccount = accounts.find(function (account) {
    //返回第一个满足input输入值与对象username相等的那个对象,没有合适的会返回undefined
    return account.username === inputLoginUsername.value;
  }); //显示这个点击事件
  console.log(`测试在input输入${inputLoginUsername.value}`);
  console.log(`currentAccount`, currentAccount);
  // console.log(currentAccount);

  //如果currentAccount是undefined，直接undefined.pin会报错，而使用可选链之后，只会显示undefined，不会执行后面的.pin
  console.log(currentAccount?.pin);

  // -------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------

  //使用可选链防止报错，判断pin是否正确.把用户名和pin情况并删除键盘焦点
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');
    //显示整个页面，让透明度变为100
    containerApp.style.opacity = 100;

    //让用户名和pin的位置变成空，并消除使用状态
    // inputLoginUsername.value = '';
    // inputLoginPin.value = '';
    inputLoginUsername.value = inputLoginPin.value = '';

    //blur方法用来移除当前元素所获得的键盘焦点.
    inputLoginPin.blur();

    //用户登录后，欢迎用户，更改相应位置的textContent
    //用split()将原字符串用空格隔开为数组，然后获取firstName
    labelWelcome.textContent = `Welcome back: ${
      currentAccount.owner.split(' ')[0]
    }`;

    // -------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------

    //显示UI
    updateUI(currentAccount);
    // //display Movements
    // displayMovements(currentAccount.movements);

    // //Display balance
    // calcDisplayPrintPrice(currentAccount);

    // //Display summary
    // calcDisplaySummaryValueIn(currentAccount);
  }

  // -------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------

  //实现转账功能与UI升级
  btnTransfer.addEventListener('click', function (e) {
    //HTML中使用了form时，必须阻止默认点击事件
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    //找到所有的对象，遍历它们，返回属性username与用户输入值相等的那个对象
    const receiveAcount = accounts.find(function (account) {
      return account.username === inputTransferTo.value;
    });

    //因为上方已经执行了一次Display balance，所以balance属性已经存在了
    if (
      amount > 0 &&
      currentAccount.balance >= amount &&
      currentAccount.username !== receiveAcount.username
    ) {
      //当前用户的movement数组增加一个-amount值，到数组的最后
      //要得到当前数组，那么就需要用到前面的currentAcount，也就是必须把这个监听事件放在前一个监听事件当中
      // currentAccount.movements.push(Number(`-${amount}`));
      currentAccount.movements.push(-amount);
      //让receivAcount的金额数组增加一个正数
      receiveAcount.movements.push(amount);

      //更新所有地方的UI
      updateUI(currentAccount);
      // calcDisplayPrintPrice(currentAccount);
      // displayMovements(currentAccount.movements);
      // calcDisplaySummaryValueIn(currentAccount);
    }
    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferAmount.blur();
  });

  // -------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------

  //The loan part
  btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    //.value返回的是string，要先转化为数字
    const amount = Number(inputLoanAmount.value);
    //如果借款数字大于0；大于amout的百分之10。
    //至少有一笔押金大于借款的百分之10
    if (
      amount > 0 &&
      currentAccount.movements.some(function (deposit) {
        return deposit >= amount * 0.1;
      })
    ) {
      //往活动数组中添加借款
      currentAccount.movements.push(amount);

      //以当前账户升级UI，再次说明UI集成的重要性
      updateUI(currentAccount);

      //让输入位置重新变成空
      inputLoanAmount.value = '';

      //消除焦点
      inputLoanAmount.blur();
      console.log(currentAccount.movements);
    }
  });

  // -------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------

  // Close account 放在了登录功能的里面
  btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    //判断用户输入的close名称和当前账号相同，同时Pin也要相同
    if (
      currentAccount.username === inputCloseUsername.value &&
      currentAccount?.pin === Number(inputClosePin.value)
    ) {
      const deleteAccountIndex = accounts.findIndex(
        acc => acc.username === inputCloseUsername.value
      );
      console.log(deleteAccountIndex);
      accounts.splice(deleteAccountIndex, 1);
      console.log(accounts);
      containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
  });

  // -------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------
});

// LECTURES

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//几种普通的方法
// //Slice Method
// const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// console.log(arr.slice(0)); //从索引为0开始到最后
// console.log(arr.slice(2, 5)); //索引为2开始，索引为5位置不保留
// console.log(arr.slice(-2)); //从倒数第二个位置开始到最后
// console.log(arr.slice(1, -2)); //从索引为1开始，到负2索引，负2索引不保留
// console.log(arr.slice()); //浅拷贝
// console.log([...arr]); //同样是浅拷贝
// console.log(arr.slice(arr.indexOf('c'))); //可以跟indexOf结合
// console.log(arr.slice(arr.lastIndexOf('e'))); //可以跟lastIndexOf结合

//Splice Methods
// const arr2 = ['a', 'b', 'c', 'd', 'e', 'f'];
// arr2.splice(2, 3); //从索引2开始，删除3个数
// console.log(arr2);
// arr2.splice(-1); //从索引-1开始删除,也就是把'f'删掉
// console.log(arr2);
// arr2.splice(1, 0, 'added'); //从索引值1开始，删除0个，添加一个'added'字符
// console.log(arr2);
// arr2.splice(3, 0, 'added2'); //在实际上没有设置的地方开始设置一个值
// console.log(arr2);
// arr2.splice(0, 1, 'replace index 0'); //替换掉原有的索引0的值，原来是a
// console.log(arr2);

//Reverse Method
// const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// console.log(arr);
// arr.reverse(); //会改变原有数组
// console.log(arr);

// Concat Method
// const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// const arr2 = [1, 'a', 'b', 'c', 'd', 'e', 'f', 2];
// //如果使用push，知识将一个完整的数组传入进去，不是分散的
// console.log(arr.push(arr2)); //添加到数组的末尾，返回该数组的新长度
// console.log(arr); //
// console.log(arr2);
// // console.log(arr.concat(arr2)); //合并数组，不会改变原数组

// //Join Method
// const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// console.log(arr.join(' ')); //不会改变原数组
// console.log(arr);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i} You deposited ${movement}`);
//   } else {
//     //Math.abs(x) 函数返回指定数字 “x“ 的绝对值
//     console.log(`Movement ${i} You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log(`------------------ForEach--------------------------`);

// movements.forEach((movement, i, arr) => {
//   //参数顺序：值、索引值、第三个参数是完整的数组
//   if (movement > 0) {
//     console.log(`Movement ${i} You deposited ${movement} `);
//   } else {
//     console.log(`Movement ${i} You withdrew ${Math.abs(movement)} arr:${arr} `); //Math.abs删除负号
//   }
// });

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//forEach use in Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, index, totalMap) {
//   console.log(`${index}:${value}`);
// });

// //forEach use in Set
// const currenciesUnique = new Set(['USD', 'USD', 'EU', 'RMB', 'EU']);
// console.log(currenciesUnique);
// currenciesUnique.forEach((value, noUse, Set) => {
//   //Set没有index，但是如果要得到第三个参数，第二个参数不能少
//   console.log(`${value}:${value}`);
// });

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//Coding Challenge #1
// const juliasData = [3, 5, 2, 12, 7];
// const katesData = [4, 1, 15, 8, 3];

// const checkDogs = function (juliasData, katesDate) {
//   //不要改变原数组，用slice()浅拷贝
//   const juliasDataCorrect = juliasData.slice();
//   //从索引0开始，删除1个
//   juliasDataCorrect.splice(0, 1);
//   //从索引-2开始，删除后面所有
//   juliasDataCorrect.splice(-2);
//   //用展开语法合并
//   // const combineDogs = [...juliasDataCorrect, ...katesDate];
//   const combineDogs = juliasDataCorrect.concat(katesDate);
//   console.log(combineDogs);

//   combineDogs.forEach(function (dogYears, i) {
//     if (dogYears >= 3) {
//       console.log(
//         `Dog number ${i + 1} is an adult, and is ${dogYears} years old`
//       );
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log('--------------------------------');
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// console.log(correctJuliaData);
// console.log(juliasData);

// 如果是对象的话,用Object.assign(target, ...sources)
//将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
// const obj = {
//   a: 1,
//   b: 2,
// };
// const obj2 = {
//   c: 3,
//   d: 4,
// };
// const obj3 = Object.assign(obj, obj2);

// console.log(obj3);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

const usdToRmb = 7;

//将美元换成人民币
// const movementRmb = movements.map(
//   mov => mov * usdToRmb
//   // //padEnd是用在字符串上的方法，从字符串指定位置开始，从末尾填充指定字符
//   // console.log(`mov:${mov}$`.padEnd(10, '-'), ` i:${i}`);
//   // // console.log(`mov:${mov}$i:${i}`);
// );
// // console.log(movements); //没有改变原数组
// console.log(movementRmb);

//用for-of产生相同的结果
// const movementRmbForOf = [];
// for (const mov of movements) {
//   movementRmbForOf.push(mov * usdToRmb);
// }
// console.log(movementRmbForOf);

//测试forEach的返回值，是undefined
// const movementRmbForEach = movements.forEach(function (mov, i) {
//   return mov * usdToRmb;
//   // //padEnd是用在字符串上的方法，从字符串指定位置开始，从末尾填充指定字符
//   // console.log(`mov:${mov}$`.padEnd(10, '-'), ` i:${i}`);
//   // // console.log(`mov:${mov}$i:${i}`);
// });

// // console.log(movementRmbForEach);

//三元运算符与简化后的箭头函数
// const returnMovementsUseMap = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1} You ${mov > 0 ? 'deposited' : 'withdrew'} ${mov}`
//   // if (mov > 0) {
//   //   return `Movement ${i + 1} You deposited ${mov}`;
//   // } else {
//   //   //Math.abs(x) 函数返回指定数字 “x“ 的绝对值
//   //   return `Movement ${i + 1} You withdrew ${Math.abs(mov)}`;
//   // }
// );
// console.log(returnMovementsUseMap);

//用函数得到名字的首字母组成的字符串'stw'
// const converFirstNames = function (names) {
//   const nameSmall = names
//     .toLowerCase() //将字符串小写
//     .split(' ') //将字符串用空格隔开，转化为数组
//     .map(name => name[0]) //得到每个单词的首字母，然后把它们放入一个新的数组
//     .join(''); //将数组中的内容用指定字符链接起来（这里是不留间隙）
//   console.log(nameSmall);
// };

// converFirstNames('Steven Thomas Williams');

// map集成修改
// const converFirstNames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner //创建一个新的属性，输入小写的首字母
//       .toLowerCase() //将字符串小写
//       .split(' ') //将字符串用空格隔开，转化为数组
//       .map(name => name[0]) //得到每个单词的首字母，然后把它们放入一个新的数组
//       .join(''); //将数组中的内容用指定字符链接起来（这里是不留间隙）
//   });
//   accs.forEach(acc => {
//     console.log(acc);
//     console.log(acc.username);
//   });
// };

// converFirstNames(accounts);

//filter方法
// const deposit = movements.filter(mov => {
//   return mov > 0;
// });

// console.log(deposit);

// //用for-of达到相同效果
// const deposit = [];
// for (const mov of movements) {
//   if (mov > 0) {
//     deposit.push(mov);
//   }
// }
// console.log(deposit);

//制作成函数
// const withdrawal = function (movs) {
//   console.log(
//     movs.filter(mov => {
//       return mov < 0;
//     })
//   );
// };

// withdrawal(movements);

// const withdrawal = movements

//The reduce Method
// console.log(movements);
// const afterReduce = movements.reduce((acc, cur, i) => {
//   console.log(`index:${i}  accmulator:${acc}  curValue:${cur}`);
//   return acc + cur;
// }, 0); //设置了初始值，从index 0开始；没有设置就从index 1开始

// const afterReduce = movements.reduce((acc, cur) => acc + cur, 0); //设置了初始值，从index 0开始；没有设置就从index 1

// console.log(afterReduce);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//Coding Challenge #2 和#3
//将年龄数组作为参数
// const calcAverageHumanAge = function (dogsAgeArr) {
//第一题，得到狗的年龄
// const humanAge = dogsAgeArr.map(dogAge =>
//   dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
// );
// console.log(`humanAge:`, humanAge);

// console.log(`dogs age:`, dogsAgeArr);
// const humanAge = dogsAgeArr.map(function (dogAge) {
//   if (dogAge <= 2) {
//     return 2 * dogAge;
//   } else {
//     return 16 + dogAge * 4;
//   }
// });
// console.log(`humanAge:`, humanAge);

//第二题，刨除人类年纪未满18的狗
// const adultDogs = humanAge.filter(dogHumanAge => dogHumanAge > 18);
// console.log(`adultDogs:`, adultDogs);

//第三题，求得狗的人类平均年龄，用reduce相加，然后除以数组的Length
// const allHumanAgeAva = humanAge.reduce(
//   // ( 5+ 4) / 2 === (5 / 2 + 4 / 2)
//   (acc, curValue, curIndex, arr) => acc + curValue / arr.length,
//   0
// );
// console.log(allHumanAgeAva);

// const allHumanAgeAva = Math.round(
//   humanAge.reduce((acc, curValue) => acc + curValue, 0) / humanAge.length
// );
// console.log(allHumanAgeAva);
//   const allHumanAgeAva = dogsAgeArr
//     .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
//     .filter(dogHumanAge => dogHumanAge > 18)
//     .reduce(
//       // ( 5+ 4) / 2 === (5 / 2 + 4 / 2)
//       (acc, curValue, curIndex, arr) => acc + curValue / arr.length,
//       0
//     );
//   console.log(`allHumanAgeAva`, allHumanAgeAva);
// };

// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// if the dog is <= 2 years old, humanAge = 2 * dogAge

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//find method
// console.log(movements);
// const firstWithdarwal = movements.find(mov => mov < 0);
// console.log(firstWithdarwal);

// console.log(accounts);
// //找到owner是"Jonas Schmedtmann"的那个对象
// const accout = accounts.find(accout => {
//   return accout.owner === 'Jonas Schmedtmann';
// });
// console.log(accout);

//用for-of实现相同的效果
// for (const account of accounts) {
//   // 如果有多个相同的属性怎么处理？加上一个break就可以了，break 语句中止当前循环
//   if (account.owner === 'Jonas Schmedtmann') {
//     console.log(account);
//     break;
//   }
// }

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// //some返回布尔值
// console.log(
//   movements.some(function (e) {
//     return e === 200;
//   })
// );

// console.log(
//   movements.some(function (e) {
//     return e > 0;
//   })
// );

// // every method
// console.log(account4.movements);

// //当数组中的所有元素都通过条件后，返回true，否则返回false
// console.log(
//   account4.movements.every(function (mov) {
//     return mov > 0;
//   })
// );

//the separate method，分开使用callback函数

// //设置一个函数返回大于0的数
// const deposit = mov => mov > 0;

// //筛选数组中大于0的数
// console.log(account4.movements.filter(deposit));

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//flat()和flatMap()

// //展开语法，将数组中的第一层元素单独拿出来
// const arr = [[1, 2, 3], [4, 5], 6, 7];
// console.log(...arr);

// //flat method，将数组中的值不分层次的分开
// // console.log(arr.flat());

// // const arrDepth4 = [[[[[1, 2, 3]]]]];

// // console.log(arrDepth4.flat());
// // console.log(arrDepth4.flat(2));
// // console.log(arrDepth4.flat(3));
// // console.log(arrDepth4.flat(4));

// //找到所有的accounts的movements，将它们集合为一个数据
// //返回所有的movements到一个数组中
// const allMovements = accounts.map(acount => acount.movements);

// //将嵌套的数组中的值拿出来，用flat()
// const allMovementsFlat = allMovements.flat();
// console.log(allMovementsFlat);

// const allMovementsFlatReduce = allMovementsFlat.reduce(function (
//   acc,
//   curValue
// ) {
//   return acc + curValue;
// },
// 0);
// console.log(allMovementsFlatReduce);

// //使用chaining method
// const allMovementsChaining = accounts
//   .flatMap(acount => acount.movements)
//   .reduce(function (acc, curValue) {
//     return acc + curValue;
//   }, 0);
// console.log(allMovementsChaining);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//sort method

//string
const str = ['March', 'Jan', 'Feb', 'Dec'];
str.sort();

//sort method 会影响元素组
// console.log(str);

console.log(movements);
//如果比较顺序[a, b] 返回值 < 0  保持顺序[a, b]
//如果比较顺序[a, b] 返回值 > 0  调换顺序[b, a]

//若fistEl > secondEl 那么返回值是大于0，切换位置，小的在前，是升序
movements.sort((firstEl, secondEl) => firstEl - secondEl);
console.log(movements);

//若SecondEl > firstEl 那么返回值是大于0，切换位置，大的在前，是降序
movements.sort((firstEl, secondEl) => secondEl - firstEl);
console.log(movements);
