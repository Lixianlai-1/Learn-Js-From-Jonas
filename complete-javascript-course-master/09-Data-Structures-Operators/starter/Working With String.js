// const airline = 'TAP to ChongQing,g,g';
// const plane = 'A320';

// console.log(airline.replace(airline[0], airline[0].toLowerCase()));

// console.log('asdfa'.toUpperCase());
// console.log('AADASD'.toLowerCase());
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// //要变成Mark
// function MyName(namesStr) {
//   let lowerName = namesStr.toLowerCase(); //先全部小写
//   return lowerName[0].toUpperCase() + lowerName.slice(1);
//   //首字母大写 + 截索引位置1到最后
// }

// const email = 'Marklee@qq.io';
// const waitToChangeEmail = '   mArkLEe@qq.io   \n';
// const emailCorrect1 = waitToChangeEmail.trim(); //再删除空格和\n下一行
// const newEmail = MyName(emailCorrect1); //这个MyName函数，是让字符串首字母大写，其余小写
// console.log(newEmail === email);

// console.log(newEmail);
// console.log(newEmail === email);
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// // replacing
// const priceCN = '288,99 ￥';
// const priceUS = priceCN.replace('￥', '$').replace(',', '.'); //都是string的情况下，连用方法
// // console.log(priceUS);

// const anouncementCN = 'Please go to door 17, door 17';
// const anouncementUS = anouncementCN.replace(/door/g, 'gate'); //找到全部的door
// const anouncementUS2 = anouncementCN.replaceAll('door', 'gate'); //replaceAll
// console.log(anouncementUS);
// console.log(anouncementUS2);
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// //Booleans
// const plane = 'Airbus TAPneo';
// console.log(plane.includes('air')); //首字母不对时
// console.log(plane.includes('Air')); //多个字符正确时
// console.log(plane.endsWith('neo'));
// console.log(plane.startsWith('TAP')); //不是开头字符时
// console.log(plane.startsWith('Air'));
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// //Practice
// const checkBaggage = function (str) {
//   const baggage = str.toLowerCase(); //先转化为小写，方便后期比较字符串
//   baggage.includes('gun') || baggage.includes('knife') //如果是刀或枪，就不准进
//     ? console.log('You are Not allowed on board')
//     : console.log('Wellcome aboard');
// };

// checkBaggage('Socks,Knife,shoes');
// checkBaggage('Gun,coffee');
// checkBaggage('tea,tofu');
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// //Split and Join
// const MyName = 'Mark-lee';
// console.log(MyName.split('-')); //split会将字符串以指定的内容分开,然后放入数组中
// console.log(MyName.split('-').join(' ')); //将数组中的内容，用指定内容连接起来，组成字符串

// [firstName, lastName] = MyName.split('-'); //解构数组

// console.log(`MyName:`, MyName);
// console.log(`firstName: `, firstName);
// console.log(`lastName: `, lastName);
// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(`newName:`, newName); //将零散字符放入数组，然后用注定内容，使用join连接成字符串
// const emptyArr = [];
// const capitalize = function (name) {
//   const nameArr = name.split(' ');
//   for (const n of nameArr) emptyArr.push(n.replace(n[0], n[0].toUpperCase()));
//   //n这个字符串使用replace方法，更改第一个字符为大小字母，然后把字符串push空数组中
//   console.log(emptyArr.join(' '));
// };

// capitalize('jonas sche smith lee');
// capitalize('mark li');
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// //padStart知识点：填补字符串空间
// const message = 'abcdef';

// //从开头开始填补'+'，直到遇见原有内容，或到字符串length为10时停止填充
// console.log(message.padStart(10, '+'));
// //从尾部开始填补'+'，直到遇见原有内容，或到字符串length为10时停止填充
// console.log(message.padEnd(10, '+'));

// const coutNumber = function (number) {
//   const str = number + ''; //任何类型加上空字符串都为字符串，包括NaN，undefined,null
//   const last = str.slice(-3); //截取倒数第三个字符到最后一个字符，结果为字符串
//   num = last.padStart(str.length, '+'); //从头填充到str字符串的length长度，填充内容是'+'
//   lastnum = last.padEnd(str.length, '+'); //从尾填充到str字符串的length长度，填充内容是'+'
//   console.log(lastnum);
//   console.log(num);
// };

// coutNumber('alsdfhjkashdfljasdlfh');
// coutNumber(54654651);
// coutNumber('6546545646554484164');
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
//应用slice取得最后一个值，做个函数
// const seatCheck = function (seat) {
//   //if last string was B or E, It's middleSeat
//   seat.slice(-1) === 'B' || seat.slice(-1) === 'E'
//     ? console.log('Middle Seat')
//     : console.log('You are lucky');
// };

// seatCheck('11E');
// seatCheck('1B');
// seatCheck('1A');

// console.log(airline.slice(-1));
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// //想要截取ChongQing这段
// console.log(airline.slice(airline.indexOf('Ch'), airline.indexOf(',g,g')));

// console.log(airline.slice(4)); //如果不设置结尾，默认是截断到最后
// console.log(airline.slice(0, 5)); //包含索引前面那个值，不包括后面那个值
// console.log(airline.slice(5, -1)); //可以设置负数，从后往前数

// console.log(airline[9]);
// console.log(airline[1]);
// console.log(plane[0]);
// console.log('YuBei'[0]); //可以直接对字符串求得相应索引值

// console.log(airline.indexOf('ChongQing')); //多个字符时，求得第一个的字符
// console.log(airline.indexOf('C')); //多个字符时，求得第一个的字符
// console.log(airline.indexOf('chong')); //当出现不存在的字符串，返回-1,

// console.log(airline.indexOf('g')); //第一个g的index，为7，index是从0开始算的
// console.log(airline.lastIndexOf('g')); //最后一个g的index
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
//repeat
const message2 = 'Hello my friends from the world! \n'; //在字符串中用\n换行
console.log(message2.repeat(5)); //重复5遍，变成一个大的字符串

// const coutEmoj = function (n) {
//   console.log(`There are ${n} :${'🍕'.repeat(n)} `);
// };
// coutEmoj(5);
// coutEmoj(3);
