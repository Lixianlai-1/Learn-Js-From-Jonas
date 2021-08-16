'use strict';

//得到包含所有a链接的那个ul，方便后面对其监听，并利用冒泡原理对其里面的a链接进行操作
const navlinks = document.querySelector('.nav__links');

//得到a链接所形成的数组
const navLinkArray = document.querySelectorAll('.nav__link');

//找到Logo并定义
const navLogo = document.querySelector('.nav__logo');

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//实现导航栏颜色变化

//----------------------------------------------------------------------------------
//方法一：单独设置，没有创建函数

// navlinks.addEventListener('mouseover', function (e) {
//   //如果包含了a链接的class name，才对它们进行相关操作
//   if (e.target.classList.contains('nav__link')) {
//     //得到的是具体的a链接
//     const link = e.target;

//     //对a链接所形成的数组进行遍历，如果数组中的a链接不是正在hover的a链接，那么就执行透明度相关的测试
//     navLinkArray.forEach(function (alink) {
//       if (alink !== link) alink.style.opacity = 0.5;
//     });
//   }

//   //对Logo进行透明度的设置
//   navLogo.style.opacity = 0.5;
// });

// navlinks.addEventListener('mouseout', function (e) {
//   // if (e.target.classList.contains('.nav__link')) {
//   // }
//   navLinkArray.forEach(function (event) {
//     event.style.opacity = 1;
//   });

//   navLogo.style.opacity = 1;
// });

//----------------------------------------------------------------------------------
//方法二：创建一个opacityHandler，然后分别操作

//创造一个透明选择器，能够通过给定的值，直接设置透明度.第一个参数是event时间，第二个参数是要设置的透明值
// const opacityHandler = function (e, opacityValue) {
//   if (e.target.classList.contains('nav__link')) {
//     //得到的是具体的a链接
//     const link = e.target;

//     //对a链接所形成的数组进行遍历，如果数组中的a链接不是正在hover的a链接，那么就执行透明度相关的测试
//     navLinkArray.forEach(function (alink) {
//       if (alink !== link) alink.style.opacity = opacityValue;
//     });

//     navLogo.style.opacity = opacityValue;
//   }
// };

// //因为这里需要一个参数e，所以监听函数时，把opacityHandler放到另一个函数中，然后这个函数中有参数e
// navlinks.addEventListener('mouseover', function (e) {
//   opacityHandler(e, 0.5);
// });
// navlinks.addEventListener('mouseout', function (e) {
//   opacityHandler(e, 1);
// });

//----------------------------------------------------------------------------------
//方法三：通过bind的原理，绑定的参数作为函数的this，然后是第一个参数

//创造一个透明选择器，能够通过给定的值，直接设置透明度.第一个参数是event时间，第二个参数是要设置的透明值
const opacityHandler = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const that = this;

    //得到的是具体的a链接
    const link = e.target;

    //对a链接所形成的数组进行遍历，如果数组中的a链接不是正在hover的a链接，那么就执行透明度相关的测试
    navLinkArray.forEach(function (alink) {
      //注意这里的this在严格模式下会指向undefined,非严格模式下指向window对象
      if (alink !== link) alink.style.opacity = that;
    });

    navLogo.style.opacity = that;
  }
};

//因为这里需要一个参数e，所以监听函数时，把opacityHandler放到另一个函数中，然后这个函数中有参数e
navlinks.addEventListener('mouseover', opacityHandler.bind(0.5));
navlinks.addEventListener('mouseout', opacityHandler.bind(1));

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//￥￥￥实现导航栏的平滑滚动

// //方法一：对这些a链接进行监听，然后用forEach到那里
// navLinkArray.forEach(function (nav) {
//   nav.addEventListener('click', function (event) {
//     //这里必须要阻止默认事件
//     event.preventDefault();

//     const navId = this.getAttribute('href');
//     console.log(this);
//     console.log(navId);

//     document.querySelector(navId).scrollIntoView({ behavior: 'smooth' });
//   });
// });
//----------------------------------------------------------------------------------

//方法二：对a链接的上层元素进行监听，通过event.target找到正在被点击的元素，并实现平滑滚动

navlinks.addEventListener('click', function (event) {
  event.preventDefault();

  if (event.target.classList.contains('nav__link')) {
    const navId = event.target.getAttribute('href');
    console.log(navId);

    document.querySelector(navId).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//￥￥￥实现一个固定导航栏

// 想要的效果是，当鼠标滚轮滑动到section1的位置时，出现sticky导航栏，实际上已经设置了，只是目前被设置为了hidden，所以需要remove这个hidden

//找到section1的位置
const section1 = document.querySelector('section');
console.log(section1);

//找到section1的坐标位置
console.log(section1.getBoundingClientRect());

const sectioin1CallbackFn = function (entries) {
  console.log(entries);
};

const section1Option = {
  root: null,
  rootMargin: '-100px',
  threshold: 0,
};

const observerSection1 = new IntersectionObserver(
  sectioin1CallbackFn,
  section1Option
);

observerSection1.observe(section1);
