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
      // console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    } else {
      // console.log('请在a链接上点击');
    }
  });

///////////////////////////////////////////////////////////////////////////

//Going downward child

// console.log(h1.childNodes);

//Element.children includes only element nodes
// console.log(h1.children);
// console.log(h1.firstChild);
// console.log(h1.firstElementChild);

h1.firstElementChild.style.color = 'blue';
h1.lastElementChild.style.color = 'orangered';

//going upwards：parents

// console.log(h1.parentElement);
// console.log(h1.parentNode);

// //closest
// h1.closest('header').style.backgroundColor = 'var(--color-primary)';

//Going sideways:siblings
// console.log(h1.previousElementSibling);
// console.log(h1.previousSibling);

// console.log(h1.nextElementSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children); //返回HTMLCollection

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
  // console.log(clicked.dataset.tab);

  //!null为true，就返回，后面的程序不再执行。这种就叫guard clause，保护条款
  if (!clicked) return;

  //找到效果的那个class，也就是operations__tab--active，然后删除
  tabs.forEach(tEvent => {
    tEvent.classList.remove('operations__tab--active');
  });

  clicked.classList.add('operations__tab--active');

  //删除所有文本出现的效果
  tabsContent.forEach(c => {
    // console.log(c);
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

// const opacityHandler = function (e, opacity) {
//   //如果当前触发函数的classList中有.nav__link，也就是确保hover到a链接才生效
//   // console.log(this);
//   if (e.target.classList.contains('nav__link')) {
//     //找到目前鼠标hover的那个a链接
//     const link = e.target;

//     //通过a链接，再通过closest找到所有的ul（如果是直接找，有什么区别吗？没有）
//     const ohterLink = link.closest('.nav').querySelectorAll('.nav__link');
//     // const ohterLink = document.querySelectorAll('.nav__link');

//     ohterLink.forEach(function (el) {
//       if (el !== link) {
//         el.style.opacity = opacity;
//       }
//     });

//     //这一步，找到父元素，然后再找父元素下面的图片（只有这一个图片）
//     const logo = link.closest('.nav').querySelector('img');
//     logo.style.opacity = opacity;
//   }
// };

// nav.addEventListener('mouseover', function (e) {
//   opacityHandler(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   opacityHandler(e, 1);
// });

const opacityHandler = function (e) {
  //如果当前触发函数的classList中有.nav__link，也就是确保hover到a链接才生效
  const opacityValue = this;
  // console.log(this, e.currentTarget);
  // console.log(opacityValue);

  if (e.target.classList.contains('nav__link')) {
    //找到目前鼠标hover的那个a链接
    const link = e.target;

    //通过a链接，再通过closest找到所有的ul（如果是直接找，有什么区别吗？没有）
    const ohterLink = link.closest('.nav').querySelectorAll('.nav__link');
    // const ohterLink = document.querySelectorAll('.nav__link');

    ohterLink.forEach(function (el) {
      if (el !== link) {
        // console.log(this); //这里的this指向window,严格模式下是undefined.
        // console.log(el.currentTarget);
        el.style.opacity = opacityValue;
      }
    });

    //这一步，找到父元素，然后再找父元素下面的图片（只有这一个图片）
    const logo = link.closest('.nav').querySelector('img');
    logo.style.opacity = this;
  }
};

// bind返回新的函数，它的第一个参数，代表this，后续参数就是新函数的参数
nav.addEventListener('mouseover', opacityHandler.bind(0.5));
nav.addEventListener('mouseout', opacityHandler.bind(1));

//---------------------------------------------------------------------------------------

//得到section1的坐标对象
// const initialSectionScroll = section1.getBoundingClientRect();
// console.log(initialSectionScroll);

// //实现一个固定的导航栏，老方法
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   //在当前视窗的顶部Y轴数值，大于默认的section1的顶部位置时，添加sticky效果，形成固定栏
//   if (window.scrollY > initialSectionScroll.top) {
//     nav.classList.add('sticky');
//     console.log(nav);
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//---------------------------------------------------------------------------------------

//运用interaction observer API

// //配置一个回调函数
// const callbackFn = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry);
//   // entries.forEach(entry => {
//   //   console.log(entry);
//   // });
// };

// let options = {
//   //指定根元素为null，为浏览器视窗
//   root: null,
//   //阈值为0.1意味着目标元素的百分之10出现在root选项指定的元素中可见时，回调函数将会被执行。
//   threshold: 0.1,
// };

// //创造一个IntersectionObserver对象
// let observer = new IntersectionObserver(callbackFn, options);

// //为观察者配置一个目标元素
// observer.observe(section1);

//创建observer回调函数，放在intersectionObserver对象中

const hearderCallback = function (entries, observer) {
  //可以通过解构数组，得到数组中的intersectionObserverEntry
  const [entry] = entries;
  // console.log(entries);
  // console.log(entry);

  if (!entry.intersectionRatio) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

//找到导航栏的动态高度
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

//创造一个IntersectionObserver对象，在其中直接设置option
const headerObserver = new IntersectionObserver(hearderCallback, {
  //相对于视窗
  root: null,

  //值必须有px单位后缀，这里为什么要用-号呢？
  rootMargin: `-${navHeight}px 0px 0px 0px`,

  //在视窗中没有与header的交叉点时，执行回调函数
  threshold: 0,
});

//设置观察目标元素
headerObserver.observe(header);

//---------------------------------------------------------------------------------------

const revealFn = function (entries, observer) {
  //解构数组
  const [entry] = entries;
  // console.log(entry);

  //避免section1部分立刻出现,因为一开始会默认出现一个intersectionObserverEntry
  if (!entry.isIntersecting) return;

  //给出现的那个部分删除隐藏的class
  entry.target.classList.remove('section--hidden');

  //删除已经observer的entry，不再产生了
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealFn, {
  //以视窗为标准
  root: null,

  //当视窗与section交叉到百分之13的时候，执行回调函数
  threshold: 0.13,
});

const sections = document.querySelectorAll('section');
sections.forEach(function (section) {
  //让每个section隐藏起来
  // section.classList.add('section--hidden');

  //注意配置一个目标元素
  sectionObserver.observe(section);
});

//---------------------------------------------------------------------------------------

//懒加载图片
const dataSrc = document.querySelectorAll('img[data-src]');
console.log(dataSrc);

const dataSrcFn = function (entries, observer) {
  //entries跟观察器中的threshold相关，threshold只有一个数时，可以这么用
  const [entry] = entries;
  // console.log(entry);

  //默认出现的intersectionObserverEntry，不执行这部分
  if (!entry.isIntersecting) return;

  //将不清晰的图片转化为清晰的图片
  entry.target.src = entry.target.dataset.src;

  //当之前的换图行为加载完成之后，再进行删除filter模糊效果
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  //然后不再观察当前触发元素
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(dataSrcFn, {
  root: null,
  threshold: 0,
  // 在出现懒加载图片之上的100px，就开始执行函数。在slow 3G的网络下尤为有用
  rootMargin: '200px',
});

dataSrc.forEach(img => {
  imgObserver.observe(img);
});

//---------------------------------------------------------------------------------------

//slide部分
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const rightSlideBtn = document.querySelector('.slider__btn--right');
const leftSlideBtn = document.querySelector('.slider__btn--left');
let currentSlide = 0;
const maxSlideLength = slides.length;
const dotsContainer = document.querySelector('.dots');
const Dots = document.querySelectorAll('.dots__dot');

//动态增加黑点
const createHTML = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"> </button> `
    );
  });
};

//决定跳转到哪个slide
const GoToSlide = function (slide) {
  slides.forEach((s, i) => {
    //这里是轮播图的每一个部分都会跟着变化，所以用了forEach
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

//实现原始顺序排列
// GoToSlide(0);

const activeDot = function (slide) {
  //为什么要用document.querySelectorAll('.dots__dot')，因为要及时的删除，Dots已经是个固定的Nodelist了
  document.querySelectorAll('.dots__dot').forEach(function (dot) {
    dot.classList.remove('dots__dot--active');
  });

  // 或者通过右边找到document.querySelector(`button[data-slide="${slide}"]`)

  //找到当前点击的那个slide，这个slide来自于监听事件的e.target.dataset.slide
  document
    .querySelector(`button[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const nextSlide = function () {
  if (currentSlide === maxSlideLength - 1) {
    currentSlide = 0;
  } else {
    currentSlide++; //0 1 2
  }
  GoToSlide(currentSlide);
  activeDot(currentSlide);
};

//实现左边轮播
const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlideLength - 1; //不能省略这一步，因为相关的计算是连续的
  } else {
    currentSlide--;
  }
  GoToSlide(currentSlide);
  activeDot(currentSlide);
};

const initFn = function () {
  createHTML();
  activeDot(0); //让第一个轮播点变黑
  GoToSlide(0); //原始排列
};

initFn();

rightSlideBtn.addEventListener('click', nextSlide);
leftSlideBtn.addEventListener('click', previousSlide);

//增加方向键的监听
document.addEventListener('keydown', function (e) {
  //按下自己想要用的key，然后查看具体的拼写，然后再设置条件
  // console.log(e);

  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

dotsContainer.addEventListener('click', function (e) {
  //帮助筛选，当点击到具体的button时，才进行下一步
  if (e.target.classList.contains('dots__dot')) {
    //通过dataset找到相应的slide值

    //得到一个DOMStringMap对象
    console.log(e.target.dataset);

    const slide = e.target.dataset.slide;

    GoToSlide(slide);
    activeDot(slide);
    console.log(slide);

    if (slide > 0) {
      currentSlide = 0;
    }
  }
});

/////////////////////////////////////////////////////////////////
//lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function () {
  //只需要把script部分放在HTML的最底部就可以省略这个部分了
  console.log('HTML parsed and DOM tree built');
});

document.addEventListener('load', function (e) {
  console.log('page full loaded', e);
});

// window.addEventListener('beforeunload', event => {
//   console.log(event);
//   // Cancel the event as stated by the standard.
//   event.preventDefault();
//   // Chrome requires returnValue to be set.
//   event.returnValue = '';
// });

// //实现排列
// slides.forEach((slide, index) => {
//   //0% 100% 200%
//   slide.style.transform = `translateX(${100 * index}%)`;
// });

// slider.style.overflow = 'visible';

//我的做法
// rightSlideBtn.addEventListener('click', function () {
//   currentSlide++; //1,2,3

//   //0       100%     200%
//   //-100%   0        100%
//   //-200%   -100%    0
//   //0       100%     200%
//   slides.forEach((slide, index) => {
//     if (currentSlide === maxSlideLength) {
//       slide.style.transform = `translateX(${100 * index}%)`;

//       //重新设置为0
//       currentSlide = 0;
//     } else {
//       slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
//     }
//   });
// });

//0 - 2    2 -1   0
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
// )
