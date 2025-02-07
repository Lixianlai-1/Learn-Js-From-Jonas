'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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

//用来显示货币数值，并实现自动出现2位的小数点
const formatCalc = function (locale, currency, value) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const formateMovementsDate = function (movDates, locale) {
  //用Math.round()四舍五入
  const calcNumber = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  //计算事件发生的时间与现在的时间差，多少天之前
  const dayPassed = calcNumber(new Date(), movDates);

  if (dayPassed === 0) return 'today';
  if (dayPassed === 1) return 'yesterday';
  if (dayPassed <= 7) {
    return `${dayPassed} days ago`;
  } else {
    // const year = movDates.getFullYear();
    // const month = movDates.getMonth() + 1; //注意月份要加上1
    // const day = `${movDates.getDate()}`.padStart(2, 0);
    // // const day = movDates.getDate();
    // return `${year}/${month}/${day}`;

    //这里不需要小时和分钟，就不需要用options
    // const options = {
    //   minute: 'numeric',
    //   hour: 'numeric',
    //   day: 'numeric',
    //   weekday: 'short', //仅支持short/long/narrow
    //   month: 'numeric',
    //   year: 'numeric',
    // };
    // const locale = navigator.language; //zh-CN，这是代表当前浏览器的语言

    //https://seiryu.cn/353/是iso code
    //记得这里需要return

    //这里不需要小时和分钟，就不需要用options
    return new Intl.DateTimeFormat(locale).format(movDates);
  }
};

//创建显示活动的函数
const displayMovements = function (acc, sort = false) {
  //在遍历之外,清空原有的内容
  containerMovements.innerHTML = '';

  console.log(acc.movementsDates);

  //数组排序，执行升序功能;slice()保证不影响原数组
  const movs = sort
    ? acc.movements.slice().sort((firstEl, secondEl) => firstEl - secondEl)
    : acc.movements;

  //将数组中的遍历，forEach遍历数组的第二个参数是索引值
  movs.forEach(function (mov, i) {
    //注意，后面的两个判断内容要为字符串
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //得到数组中的单一日期，forEach中的i联合起来运用
    const movDates = new Date(acc.movementsDates[i]);
    const displayDates = formateMovementsDate(movDates, acc.locale);
    const formateNumberAndCurrency = formatCalc(acc.locale, acc.currency, mov);

    const html = `
    <div class="movements__row">
      <div class="movements__type     movements__type--${type}">${i} ${type}</div>
      <div class="movements__date">${displayDates}</div> 
      <div class="movements__value">${formateNumberAndCurrency}</div>
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

  labelBalance.textContent = formatCalc(
    account.locale,
    account.currency,
    account.balance
  );

  // labelBalance.textContent = new Intl.NumberFormat(account.locale, {
  //   style: 'currency',
  //   currency: `${account.currency}`,
  // }).format(account.balance);
  // labelBalance.textContent = `${account.balance.toFixed(2)}￥`;
};
// calcDisplayPrintPrice(account2.movements);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//计算总收入，总支出, 总利润
const calcDisplaySummaryValueIn = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curValue) => acc + curValue, 0);

  labelSumIn.textContent = formatCalc(account.locale, account.currency, income);

  // labelSumIn.textContent = new Intl.NumberFormat(account.locale, {
  //   style: 'currency',
  //   currency: `${account.currency}`,
  // }).format(income);

  // labelSumIn.textContent = `${income.toFixed(2)}￥`;

  const expense = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curValue) => acc + curValue);

  labelSumOut.textContent = formatCalc(
    account.locale,
    account.currency,
    expense
  );

  // labelSumOut.textContent = new Intl.NumberFormat(account.locale, {
  //   style: 'currency',
  //   currency: `${account.currency}`,
  // }).format(expense);

  // labelSumOut.textContent = `${Math.abs(expense).toFixed(2)}￥`;

  const interests = account.movements
    .filter(mov => mov > 0)
    .map((deposit, i, arr) => {
      // console.log(arr);
      return (deposit * account.interestRate) / 100;
    })
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, curValue) => acc + curValue, 0);
  // const interests = income + expense;

  labelSumInterest.textContent = formatCalc(
    account.locale,
    account.currency,
    interests
  );

  // labelSumInterest.textContent = new Intl.NumberFormat(account.locale, {
  //   style: 'currency',
  //   currency: `${account.currency}`,
  // }).format(interests);

  // labelSumInterest.textContent = `${interests.toFixed(2)}￥`;
};
// calcDisplaySummaryValueIn(account1.movements);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//升级UI，这个部分是在最后才开始做的，方便复用
const updateUI = function (acc) {
  calcDisplayPrintPrice(acc);
  displayMovements(acc);
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

const countRemaingTimer = function () {
  let time = 30;

  const tick = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    //取余得到分钟剩余的秒数
    let sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      //恢复原来的欢迎语
      labelWelcome.textContent = `Log in to get started`;

      //删除之前的计时器
      clearInterval(timer);

      //隐身
      containerApp.style.opacity = 0;
    }

    //每次减少1s
    time--;
  };

  //先立刻执行一次
  tick();

  const timer = setInterval(tick, 1000);

  return timer;
};

let timer;
//实现登录功能
btnLogin.addEventListener('click', function (e) {
  //在表单提交button,会导致页面重新加载，因为要使用e.preventDefault();阻止加载
  e.preventDefault();

  clearInterval();

  //调用计时器功能
  if (timer) clearInterval(timer);
  timer = countRemaingTimer();

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

  // //Creat current Date
  // const now = new Date();
  // const day = `${now.getDate()}`.padStart(2, '0');
  // const month = now.getMonth() + 1; // 以0开始，所以加上了1
  // const year = now.getFullYear();
  // const hours = `${now.getHours()}`.padStart(2, '0');
  // const minutes = `${now.getMinutes()}`.padStart(2, '0');
  // labelDate.textContent = `${year}/${month}/${day} ${hours}:${minutes}`;

  const now = new Date();
  const options = {
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    weekday: 'short',
    month: 'numeric',
    year: 'numeric',
  };
  // const locale = navigator.language; //zh-CN，这是代表当前浏览器的语言
  const locale = currentAccount.locale; //currentAccount中有locale属性，直接读取
  console.log(locale);

  //https://seiryu.cn/353/是iso code
  labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

  //使用可选链防止报错，判断pin是否正确.把用户名和pin情况并删除键盘焦点
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');
    //显示整个页面，让透明度变为100
    containerApp.style.opacity = 100;

    //让用户名和pin的位置变成空，并消除使用状态s
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
    //重新设置timer
    clearInterval(timer);
    timer = countRemaingTimer();

    //HTML中使用了form时，必须阻止默认点击事件
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);

    //找到所有的对象，遍历它们，返回属性username与用户输入值相等的那个对象
    //也就是接受转账的那个对象
    const receiveAcount = accounts.find(function (account) {
      return account.username === inputTransferTo.value;
    });
    console.log(receiveAcount);

    //因为上方已经执行了一次Display balance，所以balance属性已经存在了
    if (
      amount > 0 &&
      currentAccount.balance >= amount &&
      currentAccount.username !== receiveAcount.username
    ) {
      //当前用户的movement数组增加一个-amount值，到数组的最后
      //要得到当前数组，那么就需要用到前面的currentAcount，也就是必须把这个监听事件放在前一个监听事件当中
      // currentAccount.movements.push(Number(`-${amount}`));
      setTimeout(function () {
        currentAccount.movements.push(-amount); //当前账户减少钱
        //让receivAcount的金额数组增加一个正数
        receiveAcount.movements.push(amount); //接受账户增加钱

        //增加Date部分
        currentAccount.movementsDates.push(new Date().toISOString());
        receiveAcount.movementsDates.push(new Date().toISOString());

        //更新所有地方的UI
        updateUI(currentAccount);

        // calcDisplayPrintPrice(currentAccount);
        // displayMovements(currentAccount);
        // calcDisplaySummaryValueIn(currentAccount);}

        inputTransferTo.value = inputTransferAmount.value = '';
        inputTransferAmount.blur();
      }, 2000);
    }
  });
  // -------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------

  //The loan part
  btnLoan.addEventListener('click', function (e) {
    //重新设置timer
    clearInterval(timer);
    timer = countRemaingTimer();

    e.preventDefault();
    //.value返回的是string，要先转化为数字
    const amount = Number(inputLoanAmount.value);
    //如果借款数字大于0；大于amout的百分之10。
    //至少有一笔押金大于借款的百分之10

    //增加Date部分
    currentAccount.movementsDates.push(new Date().toISOString());

    if (
      amount > 0 &&
      currentAccount.movements.some(function (deposit) {
        return deposit >= amount * 0.1;
      })
    ) {
      setTimeout(function () {
        //往活动数组中添加借款
        currentAccount.movements.push(amount);

        //以当前账户升级UI，再次说明UI集成的重要性
        updateUI(currentAccount);

        //让输入位置重新变成空
        inputLoanAmount.value = '';

        //消除焦点
        inputLoanAmount.blur();
        console.log(currentAccount.movements);
      }, 2000);
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

  // the sort button part

  let sorted = false;
  btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted; //sorted原来是false，!sorted变成true，让sorted变成true；再一次点击时，!sorted就变成false

    //Array.from先将nodelist转化为数组，然后才能用数组的方法，比如下面的replace
    const nodeToArray = Array.from(
      document.querySelectorAll('.movements__value'),
      el => el.textContent.replace('￥', '😎')
    );
    console.log(nodeToArray);
  });
});

// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------

// 找到所有的movements__row，更改背景颜色
// 将nodelist用展开语法转化为数组
// 对数组进行forEach遍历
// 放在lable监听事件中,labelBalance
// forEach中的第二个函数参数是i，这个点我之前是不明确的

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    //0, 2, 4等都会变成橙红色
    if (i % 2 === 0) {
      row.style.backgroundColor = 'orangered';
    }
  });
});

const nodelistRows = document.querySelectorAll('.movements__row');
console.log(nodelistRows);

console.log(Array.from(nodelistRows));
console.log(Array.prototype.slice.apply(nodelistRows));
console.log(Array.prototype.slice.call(nodelistRows)); //不能直接使用slice方法，因为nodelist不是数组
console.log(Array.prototype.slice.call(nodelistRows));
console.log(Array.prototype.slice(nodelistRows)); //必须要绑定并立刻执行

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// //设置一个倒计时函数
// const countRemaingTimer = function () {
//   //设置时间为5分钟
//   let time = 10;

//   setInterval(() => {
//     //每一次调用，都打印剩余的时间到UI上
//     if (time > 0) {
//       labelTimer.textContent = time;

//       //每次减少1s
//       time--;

//       //当时间为0s时，退出登录状态，停止计时器并继续执行
//     } else {
//       //这里时间为0时，怎么跟登录的部分联动起来呢
//       //- 在log in部分调用这个函数
//       //难道仅仅是把透明度变成0吗？不止吧应该
//       //未知量是什么？
//       //已知量是什么？
//       //目前的条件是什么？
//       containerApp.style.opacity = 0;
//     }
//   }, 1000);
// };

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// //Faked log in
// let currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// //实验
// const now = new Date();

// const options = {
//   minute: 'numeric',
//   hour: 'numeric',
//   day: 'numeric',
//   weekday: 'short',
//   month: 'numeric',
//   year: 'numeric',
// };

// const locale = currentAccount.locale; //zh-CN
// console.log(locale);

// //https://seiryu.cn/353/是iso code
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
//改变current balance下面的时间为现在的时间
// const now = new Date();
// const day = now.getDate();
// const month = now.getMonth() + 1; // 以0开始，所以加上了1
// const year = now.getFullYear();
// const hours = now.getHours();
// const minutes = now.getMinutes();

// labelDate.textContent = `${year}/${month}/${day} ${hours}:${minutes}`;

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// //Math and Rounding

// //Math.sqrt() 函数返回一个数的平方根
// console.log(Math.sqrt(81)); // =>9
// console.log(81 ** (1 / 2)); //81的2分之1次方，81的平方根 => 9
// console.log(8 ** (1 / 3)); // =>2
// console.log(2 ** 2); // 2的2次方 =>4

// //Math.max() 函数返回一组数中的最大值。
// //如果给定的参数中至少有一个参数无法被转换成数字，则会返回 NaN。
// console.log(Math.max(1, 2, 3, 4, 5)); // => 5
// console.log(Math.max(1, 2, 3, 4, '5')); //会进行数字转换 => 5
// console.log(Math.max(1, 2, 3, 4, '5px')); // => NaN

// //Math.min() 返回零个或更多个数值的最小值,如果任一参数不能转换为数值
// console.log(Math.min(1, 2, 3, 4, 5)); // 1
// console.log(Math.min('1', 2, 3, 4, 5)); // 1
// console.log(Math.min('1px', 2, 3, 4, 5)); // NaN

// //parseFloat/parseInt  vs   Math.min/Math.max
// console.log(Math.min('1px', 2, 3, 4, 5)); // NaN
// console.log(parseInt('1px')); // 1

// console.log(Math.max(1, 2, 3, 4, '5px')); // NaN
// console.log(parseInt('5px')); // 5

// //Math.PI 表示一个圆的周长与直径的比例，约为3.1415
// console.log(Math.PI * Number.parseFloat('10px') ** 2); //得到面积，pi*半径的平方

// //先得出一个在1到6之间的整数
// const randomOneToSix = Math.trunc(Math.random() * 6) + 1;
// console.log(randomOneToSix);

// //制作一个函数，得到min/max之间的随机整数
// //Math.trunc(Math.random() * (max - min) + 1)    在0到(max-min)之间
// //然后在后面再加上min,范围大小就变成min...(max - min) + min   范围也就是min...max
// //0...(max-min)   => 0+min ....(max-min)+min    => min...Max
// const randomMinMax = (min, max) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;
// console.log(randomMinMax(11, 25));

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// //rounding integers
// //Math.ceil() 函数返回大于或等于一个给定数字的最小整数,可以理解为向上取整
// console.log(Math.ceil(1.2)); // 2
// console.log(Math.ceil('1.2')); //强制类型转行 => 2
// console.log(Math.ceil('1.2px')); //NaN

// //Math.floor() 返回小于或等于一个给定数字的最大整数,可以理解为向下取整
// console.log(Math.floor(1.9)); // 1
// console.log(Math.floor('1.9')); // 强制类型转换 1
// console.log(Math.floor('1.9px')); // NaN

// //floor是向下取整，也就是取得更小的值；trunc是直接舍弃掉小数点后面的内容
// console.log(Math.floor(-1.3)); // -2
// console.log(Math.trunc(-1.3)); // -1

// //Math.round() 返回一个四舍五入的整数
// console.log(Math.round(1.2));

// //rounding decimals

// //指定位数的四舍五入，toFixed() 方法使用定点表示法来格式化一个数值
// console.log((1.2).toFixed(0)); //四舍五入求0位 得到1
// // console.log('1.2'.toFixed(0)); //无法转换类型
// console.log((1.25).toFixed(1)); // 1.3
// console.log((1.217).toFixed(2)); // 1.22
// console.log((1.213).toFixed(2)); // 1.21
// console.log(+(1.2135).toFixed(3)); // 1.214 将返回的字符串强制转换为数字

// //Math.abs(x) 函数返回指定数字 “x“ 的绝对值
// Math.abs('-1'); // 1
// Math.abs(-2); // 2
// Math.abs(null); // 0
// Math.abs('string'); // NaN
// Math.abs(); // NaN

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// //Remainder Operator
// console.log(3 % 2); // 1
// console.log(3 % 1); // 0
// console.log(-5 % 2); // -1
// console.log(-4 % 2); // -0
// console.log(-4 % -2); // -0
// console.log(6 % 3); // 0

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// //BigInt

// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 - 1); //Js能够表达的精确数字的最大值
// console.log(2 ** 53 + 5);
// console.log(2 ** 53 + 6);
// console.log(2 ** 53 - 1);

// console.log(654654654654654654654645654654282); //数字太大，有省略，且不精确
// console.log(654654654654654654654645654654282n); //BigInt
// console.log(BigInt(654654654654654654654645654654282)); //这种方式不适合太大的数字，有误差

// // console.log(98756545464 + 654645642131564n); //BigInt只能与BigInt计算

// //Exception
// console.log(20n > 10); // true
// console.log(20n == '20'); // true => transform to number
// console.log(20n === 20); // false
// console.log(typeof 20n); // BigInt

// const huge = 564546545646465481216548465132153487131212n;
// console.log(huge + 'is a really big number'); // transform to string

// //divisions
// console.log(10n / 3n); // 3n => delete the decimal part
// console.log(10 / 3); // 3.33333333...

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//Create a date
/*
console.log(new Date('Sat Apr 10 2021 09:27:56 GMT+0800'));

//如果是字符串中，11月就代表11月
console.log(new Date('Sat 11 10 2021 09:27:56 GMT+0800'));
console.log(new Date('december 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

//如果数字作为参数，那么月份那里是以0位开始。所以下面是2077年12月份
console.log(new Date(2077, 11, 1, 13, 2, 56));
console.log(new Date());
*/

//即自1970年1月1日（UTC）起经过的毫秒数
// console.log(new Date(0));

//Working with Dates

// //月份实际数+1，由2077年增加一年，就变成2078年了
// const future = new Date(2021, 3, 12, 13, 2, 56);
// console.log(future.getFullYear()); // 2021
// console.log(future.getMonth()); // 3

// //getDay() 方法根据本地时间，返回一个具体日期中一周的第几天，0 表示星期天。
// console.log(future.getDay());

// //根据本地时间，返回一个指定的日期对象为一个月中的哪一日（从1--31）
// console.log(future.getDate());

// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.getTime());

// console.log(future.toISOString());

// //通过1970年1月1日起的毫秒数得到时间
// console.log(new Date(1618203776000));

// future.setFullYear(2077);
// console.log(future);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// //Operations With Dates
// const future = new Date(2021, 3, 12);
// // console.log(Number(future));
// // console.log(+future);

// //Creat a function to calculate diff
// const calcNumber = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days = calcNumber(new Date(2021, 3, 12), new Date(2021, 3, 2));

// console.log(days);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// //formating numbers
// const nums = 135432115;
// const optinosForNums = {
//   style: 'currency',
//   currency: 'CNY', //欧洲就是EUR，美国是USD,中国是CNY
//   currencyDisplay: 'name',
//   useGrouping: false,
// };

// console.log(new Intl.NumberFormat('en-US', optinosForNums).format(nums));
// console.log(new Intl.NumberFormat('tr', optinosForNums).format(nums));
// console.log(new Intl.NumberFormat('ar-SY', optinosForNums).format(nums));
// console.log(
//   new Intl.NumberFormat(navigator.language, optinosForNums).format(nums)
// );

// var number = 3500;

// console.log(
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(number)
// );

// console.log(new Intl.NumberFormat('en-US').format(number));

// console.log(new Intl.NumberFormat().format(number));

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// //setTimeout and setInterval

// //setTimeout
// const ingredients = ['spinach', 'olives'];

// const pizzaTimer = setTimeout(
//   (ar1, ar2) => {
//     console.log(
//       `wait 3 seconds,and there are some arguments:${ar1}🥱,${ar2}🤐`
//     );
//   },
//   3000,
//   ...ingredients
// );

// if (ingredients.includes('spinach')) {
//   clearTimeout(pizzaTimer);
// }

// //setInterval

// const minute = 1000 * 60;
// const hour = minute * 60;
// const day = hour * 24;
// setInterval(() => {
//   const now = new Date();
//   console.log(now);
// }, minute);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
