'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//用forEach替代普通的for循环
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//selecting elements

// console.log(document);
// console.log(document.documentElement);
// console.log(document.body);
// console.log(document.head);

// const logo = document.getElementById('logo');
// console.log(logo);

// //HTMLCollection中的元素会随着相应元素的增删变化而实时变化
// const highlight = document.getElementsByClassName('highlight');
// console.log(highlight);

// //也是返回HTMLCollection
// const allButton = document.getElementsByTagName('button');
// console.log(allButton);

//------------------------------------------------------------------------

//创建一个新的div，给其创建新的class
//然后给其创建textContent和innerHTML，然后将其创建添加到DOM的某个位置

const message = document.createElement('div');
message.classList.add('cookie--message');
console.log(message);

//跟innerHTML的内容可以相互覆盖
// message.textContent = '创建新的textContent';

//将上面textContent的内容覆盖掉了，因为这其中包括了textContent的内容
message.innerHTML = `可以有一段本文，然后具体的标签
<button class="btn btn--close--cookie">按钮</button>`;

const header = document.querySelector('.header');
// header.prepend(message);
// header.append(message);

// header.after(message);
header.before(message);

//------------------------------------------------------------------------

//delete element

//当点击上面添加的按钮时，删除整个message
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    // message.remove();

    //老方法
    message.parentElement.removeChild(message);
  });

// console.log(message.parentElement);
// console.log(message.parentElement.childNodes);
