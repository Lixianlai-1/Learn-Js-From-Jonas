'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

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

  // the sort button part

  let sorted = false;
  btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted; //sorted原来是false，!sorted变成true，让sorted变成true；再一次点击时，!sorted就变成false

    //Array.from先将nodelist转化为数组，然后才能用数组的方法，比如下面的replace
    const nodeToArray = Array.from(
      document.querySelectorAll('.movements__value'),
      el => el.textContent.replace('￥', '😎')
    );
    console.log(nodeToArray);
  });
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//二进制 0与1
console.log(23 === 23.0);

console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); //居然不相等，JavaScript不适合做财务计算
