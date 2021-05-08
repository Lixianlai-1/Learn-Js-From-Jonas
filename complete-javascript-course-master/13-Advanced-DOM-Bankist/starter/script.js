'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const h1 = document.querySelector('h1');
const header = document.querySelector('header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

// Page Navigation
//下面的方法，会影响性能，尤其是元素过多的时候。
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (event) {
//     //先阻止默认的跳转事件
//     event.preventDefault();

//     console.log(this);
//     const id = this.getAttribute('href');
//     console.log(id);

//     //element.scrollIntoView()
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); //平滑滚动
//   });
// });

//运用冒泡方法
//1.添加事件监听器到父元素上
//2.定义哪个元素是事件的坐标
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();

    //得到当前触发元素的href,比如Features的href就是#section-1，可以通过它找到相应位置

    if (event.target.classList.contains('nav__link')) {
      const id = event.target.getAttribute('href');
      console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('请在a链接上点击');
    }
  });

///////////////////////////////////////////////////////////////////////////

//Going downward child

console.log(h1.childNodes);

//Element.children includes only element nodes
console.log(h1.children);
console.log(h1.firstChild);
console.log(h1.firstElementChild);

h1.firstElementChild.style.color = 'blue';
h1.lastElementChild.style.color = 'orangered';

//going upwards：parents

console.log(h1.parentElement);
console.log(h1.parentNode);

// //closest
// h1.closest('header').style.backgroundColor = 'var(--color-primary)';

//Going sideways:siblings
console.log(h1.previousElementSibling);
console.log(h1.previousSibling);

console.log(h1.nextElementSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); //返回HTMLCollection

// //找到父元素节点，然后找到其所有的子节点
// //通过展开语法拆开HTMLCollection，放入数组中，然后遍历
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.3)';
//   }
// });

///////////////////////////////////////////////////////////////////////////

//定义tabs，定义tabs的容器，定义tabs下面的内容
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//通过冒泡原理，监听父元素
tabsContainer.addEventListener('click', function (event) {
  //当前触发的那个位置，找寻它的祖先元素中有.operations__tab类的，没找到就返回null
  const clicked = event.target.closest('.operations__tab');
  console.log(clicked.dataset.tab);

  //!null为true，就返回，后面的程序不再执行。这种就叫guard clause，保护条款
  if (!clicked) return;

  //找到效果的那个class，也就是operations__tab--active，然后删除
  tabs.forEach(tEvent => {
    tEvent.classList.remove('operations__tab--active');
  });

  clicked.classList.add('operations__tab--active');

  //删除所有文本出现的效果
  tabsContent.forEach(c => {
    console.log(c);
    c.classList.remove('operations__content--active'); //不要加点！
  });

  //找到被点击button的关联content
  const beclickedContnent = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );

  //让关联content的内容active生效
  beclickedContnent.classList.add('operations__content--active');
});

//----------------------------------------------------------------------------------------

//Menu fade animation导航栏褪色动画

const opacityHandler = function (e, opacity) {
  //如果当前触发函数的classList中有.nav__link，也就是确保hover到a链接才生效
  // console.log(this);
  if (e.target.classList.contains('nav__link')) {
    //找到目前鼠标hover的那个a链接
    const link = e.target;

    //通过a链接，再通过closest找到所有的ul（如果是直接找，有什么区别吗？没有）
    const ohterLink = link.closest('.nav').querySelectorAll('.nav__link');
    // const ohterLink = document.querySelectorAll('.nav__link');

    ohterLink.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });

    //这一步，找到父元素，然后再找父元素下面的图片（只有这一个图片）
    const logo = link.closest('.nav').querySelector('img');
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (e) {
  opacityHandler(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  opacityHandler(e, 1);
});

// const opacityHandler = function (e) {
//   //如果当前触发函数的classList中有.nav__link，也就是确保hover到a链接才生效
//   console.log(this, e.currentTarget);
//   const opacityValue = this;
//   if (e.target.classList.contains('nav__link')) {
//     //找到目前鼠标hover的那个a链接
//     const link = e.target;

//     //通过a链接，再通过closest找到所有的ul（如果是直接找，有什么区别吗？没有）
//     const ohterLink = link.closest('.nav').querySelectorAll('.nav__link');
//     // const ohterLink = document.querySelectorAll('.nav__link');

//     ohterLink.forEach(function (el) {
//       if (el !== link) {
//         console.log(el);
//         el.style.opacity = this;
//       }
//     });

//     //这一步，找到父元素，然后再找父元素下面的图片（只有这一个图片）
//     const logo = link.closest('.nav').querySelector('img');
//     logo.style.opacity = this;
//   }
// };

// // bind返回新的函数，它的第一个参数，代表this，后续参数就是新函数的参数
// nav.addEventListener('mouseover', opacityHandler.bind(0.5));
// nav.addEventListener('mouseout', opacityHandler.bind(1));

//---------------------------------------------------------------------------------------

//得到section1的坐标对象
const initialSectionScroll = section1.getBoundingClientRect();
console.log(initialSectionScroll);

//实现一个固定的导航栏
window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  //在当前视窗的顶部Y轴数值，大于默认的section1的顶部位置时，添加sticky效果，形成固定栏
  if (window.scrollY > initialSectionScroll.top) {
    nav.classList.add('sticky');
    console.log(nav);
  } else {
    nav.classList.remove('sticky');
  }
});

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

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

// //创建一个新的div，给其创建新的class
// //然后给其创建textContent和innerHTML，然后将其创建添加到DOM的某个位置

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // console.log(message);

// //跟innerHTML的内容可以相互覆盖
// // message.textContent = '创建新的textContent';

// //将上面textContent的内容覆盖掉了，因为这其中包括了textContent的内容
// message.innerHTML = `可以有一段本文，然后具体的标签
// <button class="btn btn--close--cookie">按钮</button>`;

// const header = document.querySelector('.header');
// // header.prepend(message);
// // header.append(message);

// // header.after(message);
// header.before(message);

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

// //Attributes
// const logo = document.getElementById('logo');

// //设置属性
// logo.className = '标准属性可以被.方法改变';
// logo.title = 'Change it!';
// logo.company = 'Jonas'; //dot方法只适用于标准属性,没有设置成功
// logo.setAttribute('titleSet', 'Does it work?'); //可以用于非标准犯法
// // console.log(logo);

// //读取属性
// console.log(logo.className);
// console.log(logo.titleSet);
// console.log(logo.getAttribute('titleSet'));

// //.方法只能得到默认绝对属性值，getAttribute可以得到相对属性值（当前页面的属性值）
// console.log(logo.src); //固定的属性值
// console.log(logo.getAttribute('src')); //要放在分号中，相对的

// //dataAttributes
// console.log(logo.dataset.versionControl);

//------------------------------------------------------------------------

// //add/remove/toggle/contains四种方法

// //添加 add class
// logo.classList.add('good');
// //添加多个类值
// logo.classList.add('pretty', 'girl');
// //用展开语法添加多个类值
// const cls = ['handsome', 'boy'];
// logo.classList.add(...cls);

// //删除 remove class
// logo.classList.remove('good');
// logo.classList.remove('pretty', 'girl');
// logo.classList.remove(...cls);

// //如果 visible 类值已存在，则移除它，否则添加它
// logo.classList.toggle('原本不存在'); //原本不存在，切换之后就存在了

// //将类值 "标准属性可以被.方法改变" 替换成 "bar"
// logo.classList.replace('标准属性可以被.方法改变', 'bar');
// // console.log(logo);

// //查看是否包含contains
// console.log(logo.classList.contains('bar')); //true
// console.log(logo.classList.contains('company')); //false

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// //实现平滑滚动

// //找到要点击的按钮跟要滚动到的section
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// //对btnScrollTo设置监听
// btnScrollTo.addEventListener('click', function (event) {
//   console.log(event);
//   console.log(event.target); //指向引发触发事件的元素

//   //返回元素的大小及其相对于视口的位置
//   console.log(event.target.getBoundingClientRect());

//   //返回当前窗口的宽度和高度
//   console.log(document.documentElement.clientWidth);
//   console.log(document.documentElement.clientHeight);
//   console.log(
//     `current viewport width/height`,
//     document.documentElement.clientWidth,
//     document.documentElement.clientHeight
//   );

//   //获得X轴的滚动坐标数据
//   console.log(window.pageXOffset);
//   console.log(document.documentElement.scrollLeft);

//   //获得Y轴的滚动坐标数据
//   console.log(window.pageYOffset);
//   console.log(document.documentElement.scrollTop);

//   //整体处理
//   console.log(`Current Scroll (X/Y)`, window.pageXOffset, window.pageYOffset);

//   //滚动到section的位置
//   const section1Coordinate = section1.getBoundingClientRect();
//   console.log(section1Coordinate.left);
//   console.log(section1Coordinate.top);

//   // window.scrollTo(
//   //   section1Coordinate.left + window.pageXOffset,
//   //   section1Coordinate.top + window.pageYOffset
//   // );

//   // window.scrollTo({
//   //   left: section1Coordinate.left + window.pageXOffset,
//   //   top: section1Coordinate.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   // 较新的浏览器支持的语法;
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//Types of Events and Event Handler

//不同的event事件

// const h1 = document.querySelector('.highlight');

// const alertH1 = function () {
//   alert('事件');
//   // h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// //3秒之后删除这个事件监听
// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 3000);
// //on-event property
// h1.onclick = fn;

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// //事件传播练习
// //rgb(255,255,255)

// //创造一个随机整数
// const randomInt = function (max, min) {
//   return Math.trunc(Math.random() * (max - min + 1)) + min;
// };

// console.log(randomInt(0, 255));

// //根据随机整数创造一个颜色
// const randomColor = function () {
//   return `rgb(${randomInt(255, 0)},${randomInt(255, 0)},${randomInt(255, 0)})`;
// };

// console.log(randomColor());

// //监听a链接
// const featuresLink = document.querySelector('.nav__link'); //找到第一个满足条件的

// featuresLink.addEventListener('click', function (event) {
//   this.style.backgroundColor = randomColor();
//   // event.stopPropagation();
//   console.log(event.target);
//   console.log(event.currentTarget);
// });

// //找到navBar的ul,如果是对这部分进行事件监听，那么不会影响到它的下一层
// const navBarUl = document.querySelector('.nav__links');
// console.log(navBarUl);

// navBarUl.addEventListener('click', function (event) {
//   this.style.backgroundColor = randomColor();
//   console.log(event.target);
//   console.log(event.currentTarget);
// });

// const nav = document.querySelector('.nav');
// nav.addEventListener(
//   'click',
//   function (event) {
//     this.style.backgroundColor = randomColor();
//     console.log(event.target);
//     console.log(event.currentTarget);
//   },
//   true
// );
