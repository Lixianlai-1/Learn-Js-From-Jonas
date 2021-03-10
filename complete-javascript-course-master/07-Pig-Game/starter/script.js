'use strict';

const area0 = document.querySelector('.player--0');
const area1 = document.querySelector('.player--1');

const Score0 = document.querySelector('#score--0');
const Score1 = document.querySelector('#score--1');
const diceImg = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdDiceBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
let curScore0 = document.querySelector('#current--0');
let curScroe1 = document.querySelector('#current--1');

const play0El = document.querySelector('.player--0');
const play1El = document.querySelector('.player--1');

let curScore0Total, diceNum, activePlayer, scores, playing;

const init = function () {
  curScore0Total = 0; //让分数清零
  diceNum = 0;
  activePlayer = 0; //这个是保障到底是那个玩家在玩
  scores = [0, 0];
  playing = true; //让整个游戏重启

  play0El.classList.remove('player--winner');
  play1El.classList.remove('player--winner');
  play1El.classList.remove('player--active');
  area0.classList.add('player--active');

  Score0.textContent = 0;
  Score1.textContent = 0;
  curScroe1.textContent = 0;
  curScore0.textContent = 0;
  // curScore0Total = 0; //让分数清零
  // diceNum = 0; //骰子默认分数
  // activePlayer = 0; //这个是保障到底是那个玩家在玩
  // scores = [0, 0]; //存储总分的数组
  // playing = true; //让整个游戏重启
  // play0El.classList.remove('player--winner'); //删除胜利状态
  // play1El.classList.remove('player--winner'); //删除胜利状态
  // play1El.classList.remove('player--active'); //删除右边玩家区域标亮的情况
  // area0.classList.add('player--active'); //默认左边玩家标亮
  // Score0.textContent = 0; //左边玩家总分设置为0
  // Score1.textContent = 0; //右边玩家总分设置为0
  // curScroe1.textContent = 0; //左边当前分数设置为0
  // curScore0.textContent = 0; //右边当前分数清0
};

// const currentScore = document.querySelector(`#current--${currentPlayer}`);
const changePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  curScore0Total = 0;
  area0.classList.toggle('player--active');
  area1.classList.toggle('player--active');
};

Score0.textContent = 0;
Score1.textContent = 0;

diceImg.classList.add('hidden');
init();

rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    diceNum = Math.trunc(Math.random() * 6 + 1);
    console.log(diceNum);
    diceImg.src = `dice-${diceNum}.png`;
    diceImg.classList.remove('hidden');
    if (scores[activePlayer] >= 10) {
      diceImg.classList.add('hidden');
      return;
    }
    if (diceNum !== 1) {
      curScore0Total += diceNum;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = curScore0Total;
    } else {
      changePlayer();
    }
  }
});

holdDiceBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += curScore0Total;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      return;
    } else {
      changePlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
