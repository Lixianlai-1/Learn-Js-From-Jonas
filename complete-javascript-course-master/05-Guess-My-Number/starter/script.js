'use strict';
// 理解问题：对check进行监听，当猜的数字正确时，guess区域出现，当猜错的时候，出现，you are wrong
// 的提示

// 拆分问题：
// 1.对check进行监听点击事件,输入框中的内容跟隐藏区的内容是否不同
// - 找到chceck区域;
// - 找到guess区域；
// - 找到隐藏区域；
// - 找到隐藏区域的文本；
// - 设置隐藏区域的值???
// - 找到message部分，
// - 设置猜错时的文字是什么
// - 设置猜对的文字是什么
// - userInpt的中，当点击check时，用户输入的文字，就是userInput的value
// - 用户在input输入的内容叫什么？

// - 当guess区域的数字与input的内容相同时;
// - 猜对时，coverContent显示数字???
// - 猜错时，coverContent不显示数字，但displayArea显示文字
// - 当guess区域的数字与input的内容不同是；

// 2.当userInput区域输入为空的情况下
// let userInput = document.querySelector('.guess').value;  之前在这里就查询时为''，因为没有输入

// 3.如何将coverContent设置为一个随机数字
// - 如何将这个随机数字设置在0到20之间
// - 如何将一个数字的小数点省略
// - 省略掉之后，如何保证有20这个数字

// 4.我需要在猜错时，正确答案依然被覆盖
// - 如果coverContent答案与userInput不相等，让coverContent依然为问号
// - 如果直接重新把coverContent赋值，那么这个值就变了。我需要让这个值保留，但页面显示依然是原来的值

// 5.点击again时，input区域被清空，但coverContent不改变？
// - 需要coverContent的值不被改变，所以需要放在click监听事件的外面

// 6.在userInput跟coverContent不相等的时候，coverContent如何保持原来的问号？
// - 因为document.querySelector获取的是运行到那个程序的时候的值，所以我就直接给那个位置赋值为问号？
// - 而当两者相等时，我又把那个地方赋值为前方的coverContent，而这个coverContent就是一开始的随机数字

// 7.点击chcek时，userInput的值恢复为''，每点击一次again，score就要减少两分
// - 找到Score的位置，找到下面的数字部分 ？？这个地方有没有写错
// - 一共可以点击10次，每点击一次数字减少2
// - 当labelScore小于0，labelScore还是等于0
// 发现问题：怎么通过某个上下级关系找到某个元素

// 8. 点击again时，userInput的区域变化为空，Score的分数变回20分,
// - displayArea也要变回原来的"Start guessing...""
// - converContent也要重新变回？
// -监听again按钮, userInput被清空;
// - Score分数变回20分
// - 要记住最高分
// - 找到最高分，
// - 分数是当userInput跟coverContent相等时记录的，是最终的score分数
// - 怎么记住最终的score分数，
// - highscore等于score的分数
// - 如果答对问题之后，继续点击会有什么效果？score会继续变小
// - 如何在答对之后，让score不再减少,也就是不再监听？
// - 当用户输入为空时，需要输入什么？

// 9.当答对时，颜色变成绿色
// - 点击again时，颜色再变回黑色
// - CSS部分，哪个地方在负责背景颜色
// - 选择body，然后设置style，然后是backgroundColor
// - 颜色要用string包裹起来
// - 当答对时，改变coverContent的内容

// 10.Jonas分享了如何prettier影响下的注释

// 11.highScore是从labelScore来的，只有新的labelScore大于原来的labelScore，才让labelScore等于highScore
// - 一开始highScore是0，然后被赋值

// 12.重构代码
// - 点击again，那个区域还是为？在相等时，重新赋值
// - 可以给coverContent重新赋值，把当时的数字存储这个变量中

const again = document.querySelector('.again');
//得到最初的数字20
let labelScore = parseFloat(document.querySelector('.score').textContent);
//一开始highScore分数为0
let highScore = parseFloat(document.querySelector('.highscore').textContent);

let number = Math.trunc(Math.random() * 20) + 1;
let coverContent = (document.querySelector('.number').textContent = number);
let questionMark = (document.querySelector('.number').textContent = '?');
let messagefn = function (message) {
  document.querySelector('.message').textContent = message;
};

again.addEventListener('click', function () {
  number = Math.trunc(Math.random() * 20) + 1;
  coverContent = number;
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = 20;
  labelScore = 20;
  document.querySelector('.message').textContent = 'Start Guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#333';
  document.querySelector('.number').style.width = '15rem';
});

if (parseFloat(document.querySelector('.guess').value) === coverContent) {
  console.log('You already finished the game!');
} else {
  document.querySelector('.check').addEventListener('click', function () {
    console.log(number);
    let userInput = parseFloat(document.querySelector('.guess').value);

    // when userInput is too high
    // if (userInput !== coverContent) {
    //   document.querySelector('.message').textContent =
    //     userInput > coverContent ? 'bigger' : 'smaller';
    //     labelScore--;
    //     document.querySelector('.score').textContent = labelScore;
    // }

    if (userInput > coverContent) {
      document.querySelector('.message').textContent = 'Smaller!';
      questionMark;

      if (labelScore <= 0) {
        labelScore = 0;
        document.querySelector('.message').textContent =
          '🤣 You lose the game!';
      }
      document.querySelector('.score').textContent = labelScore;

      // when userInput is too low
    } else if (userInput < coverContent) {
      document.querySelector('.message').textContent = 'Bigger';
      questionMark;
      labelScore--;
      if (labelScore <= 0) {
        labelScore = 0;
        document.querySelector('.message').textContent =
          '🤣 You lose the game!';
      } //避免小于0；
      document.querySelector('.score').textContent = labelScore;

      //when player wins!
    } else if (userInput === coverContent) {
      document.querySelector('.message').textContent =
        'You are absolutely right!';
      document.querySelector('.number').textContent = coverContent;

      //当分数大于等于现有的highScore数字的时候，才让新的labelScore赋值给HighScore
      // if (
      //   labelScore >=
      //   parseFloat(document.querySelector('.highscore').textContent)
      // ) {
      //   document.querySelector('.highscore').textContent = labelScore;
      // }

      //Jonas老师做的比我简洁明了，我少了一个及时赋值的过程
      if (labelScore > highScore) {
        highScore = labelScore;
        document.querySelector('.highscore').textContent = highScore;
      }

      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      //when userInput is empty
    } else if (!userInput) {
      document.querySelector('.message').textContent = 'Pleas enter Numbers';
    }

    console.log(userInput);
    console.log(typeof coverContent, coverContent);
  });
}

//-----------------------------上方为重构前的代码------------------------------------------------------------
// 1.为什么要重构代码？为什么要减少重复代码

// 2.我之前的一个疑问就是，如何在需要的时候，再去找到相应的document.querySelector.某个地方
// - 如果直接设置为一个常量，那么这个值就是不可变的
// - 解决办法就是设置为一个函数，在需要的时候执行这个函数！妙啊！

// 3.点击again时，如何让隐藏的数字改变？

// const again = document.querySelector('.again');
// let labelScore = parseFloat(document.querySelector('.score').textContent);
// //一开始highScore分数为0
// let highScore = parseFloat(document.querySelector('.highscore').textContent);
// const number = Math.trunc(Math.random() * 20) + 1;
// let coverContent = (document.querySelector('.number').textContent = number);
// let questionMark = (document.querySelector('.number').textContent = '?');

// let messagefn = function (message) {
//   document.querySelector('.message').textContent = message;
// };
// let userInputFn = function (value) {
//   document.querySelector('.guess').value = value;
// };
// let scoreFn = function (score) {
//   document.querySelector('.score').textContent = score;
// };
// let coverContentFn = function (num) {
//   document.querySelector('.number').textContent = num;
// };

// again.addEventListener('click', function () {
//   userInputFn('');
//   scoreFn(20);
//   labelScore = 20;
//   messagefn('Start Guessing...');
//   coverContentFn('?');
//   document.querySelector('body').style.backgroundColor = '#333';
//   document.querySelector('.number').style.width = '15rem';
// });

// if (parseFloat(document.querySelector('.guess').value) === coverContent) {
//   console.log('You already finished the game!');
// } else {
//   document.querySelector('.check').addEventListener('click', function () {
//     console.log(number);
//     let userInput = parseFloat(document.querySelector('.guess').value);

//     if (userInput !== coverContent) {
//       // document.querySelector('.message').textContent =
//       //   userInput > coverContent ? 'Smaller!' : 'bigger!';
//       // labelScore--;
//       // document.querySelector('.score').textContent = labelScore;
//       // if (labelScore <= 0) {
//       //   labelScore = 0;
//       //   document.querySelector('.message').textContent =
//       //     '🤣 You lose the game!';
//       // } //避免小于0；上方为我自己给出的方案
//       if (labelScore > 0) {
//         messagefn(userInput > coverContent ? 'Smaller!' : 'bigger!');
//         labelScore--;
//         scoreFn(labelScore);
//       } else {
//         messagefn('🤣 You lose the game!');
//       }
//     } else if (userInput === coverContent) {
//       messagefn('You are absolutely right!');
//       coverContentFn(document.querySelector('.number').textContent);

//       if (labelScore > highScore) {
//         highScore = labelScore;
//         document.querySelector('.highscore').textContent = highScore;
//       }

//       document.querySelector('body').style.backgroundColor = '#60b347';
//       document.querySelector('.number').style.width = '30rem';
//     } else if (!userInput) {
//       messagefn('Pleas enter Numbers');
//     }

//     console.log(userInput);
//     console.log(typeof coverContent, coverContent);
//   });
// }
