// // import module
// // 引入的地方要写js，不然就报错了
// // 在有import的地方，即使没有export，普通的js文件也要先执行，总之import后执行
// import {sayWords } from './shoppingCar.js'
// sayWords()

// import { cart } from './shoppingCar';

// console.log('Say something in import file')
// // --------------------------------------------------

// // 会自动提升到最上面
// // 如何将引入的内容更改为自己想要的名字，用as
// import { shippingCost as shipC} from './shoppingCar.js'
// console.log(shipC)
// --------------------------------------------------

// 引入所有的export所有内容并改名，注意这里不需要用{}，用了会报错
// import * as allShipping from './shoppingCar.js'

// console.log(allShipping)
// allShipping.addToCart('Cloth', 30);
// console.log(allShipping.c)

// --------------------------------------------------

// //  输入默认的export内容
// // 注意：文件后面要加.js 容易漏掉
// // Default import和普通的cart的运用
// import add, {cart} from './shoppingCar.js'

// add(1)
// --------------------------------------------------

// import { addToCart, cart } from './shoppingCar.js';

// addToCart('ship',2)
// addToCart('ship',4)
// addToCart('ship',6)

// // cart原本是个空数组，但会随着相应代码的变化而变化，也就是之前讲得live-connect
// console.log(cart)

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// The Module Pattern
// 立即调用函数
// 这一部分的意义是什么？

// 因为立刻调用函数后会消失，所以将其值存储在变量中

// import { addToCart, cart } from './shoppingCar.js';

// // 在立即调用函数逅，下面的函数就已经执行完了（不在Call Stack中了），但其返回了这里面的变量和函数，当我们调用这些变量或函数时，就会找到原来的变量和函数，因为闭包会记住它们（即使已经不在call stack中）
// const shoppingCar2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`Product:${product}, Count:${quantity} added to the cart`);
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${product} ${quantity} orderd from supplier`);
//   };

//   return {
//     //   闭包的使用
//     // 1.这几个变量和函数都是在IFFE中声明的
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// console.log(shoppingCar2);

// // 函数外调用函数内部的addToCart,这个部分不能在浏览器的控制台中使用，因为Module是private的
// shoppingCar2.addToCart('ship', 1);

// console.log(cart);

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// NPM、Lodash

// 运用npm进行深拷贝

const state = {
  cart: [
    {
      product: 'bread',
      quantity: 1,
    },
  ],
  user: { login: true },
};


const cp
