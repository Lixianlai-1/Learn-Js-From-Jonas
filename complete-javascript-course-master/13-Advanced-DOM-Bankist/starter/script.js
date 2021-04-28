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
message.classList.add('cookie-message');
// console.log(message);

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

// //当点击上面添加的按钮时，删除整个message
// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', function () {
//     // message.remove();//删除的新方法
//     message.parentElement.removeChild(message); //删除的老方法
//   });

// console.log(message.parentElement);
// console.log(message.parentElement.childNodes);

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//Styles,Attributes and Classes

// //Styles
// message.style.backgroundColor = 'lightblue';
// message.style.height = '300px';

// console.log(message.style.width); //看不到，因为没有在行内中设置这个CSS属性

// //得到message这个元素的所有CSS属性值
// console.log(getComputedStyle(message));

// //可以用.符号获得所有css属性中的一个
// console.log(getComputedStyle(message).width);

// //在原有的非行样式的css属性的基础上，修改它，比如减少width
// message.style.width =
//   Number.parseFloat(getComputedStyle(message).width) - 100 + 'px';
// console.log(message.style.width);

// //得到文档的CSSStyleDeclaration
// console.log(document.documentElement); //得到根元素<html>
// console.log(document.documentElement.style); //得到根元素的CSSStyleDeclaration
// document.documentElement.style.setProperty('--color-primary', 'yellow');

//------------------------------------------------------------------------

//Attributes
const logo = document.getElementById('logo');

//设置属性
logo.className = '标准属性可以被.方法改变';
logo.title = 'Change it!';
logo.company = 'Jonas'; //dot方法只适用于标准属性,没有设置成功
logo.setAttribute('titleSet', 'Does it work?'); //可以用于非标准犯法
console.log(logo);

//读取属性
console.log(logo.className);
console.log(logo.titleSet);
console.log(logo.getAttribute('titleSet'));

//.方法只能得到默认绝对属性值，getAttribute可以得到相对属性值（当前页面的属性值）
console.log(logo.src); //固定的属性值
console.log(logo.getAttribute('src')); //要放在分号中，相对的

//dataAttributes
console.log(logo.dataset.versionControl);

//------------------------------------------------------------------------

//add/remove/toggle/contains四种方法

//添加 add class
logo.classList.add('good');
console.log(logo);

//删除 remove class
// logo.classList.remove('good');
// console.log(logo);

//切换toggle class
// logo.classList.toggle('bad'); //原本不存在，切换之后就存在了
// console.log(logo);

//查看是否包含contains
// console.log(logo.classList.contains('good'));
// console.log(logo.classList.contains('title'));
