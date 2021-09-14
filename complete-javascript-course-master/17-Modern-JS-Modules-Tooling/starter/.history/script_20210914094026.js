// // import module
// // 引入的地方要写js，不然就报错了
// // 在有import的地方，即使没有export，普通的js文件也要先执行，总之import后执行
// import {sayWords } from './shoppingCar.js'
// sayWords()

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

// import {addToCart, cart} from './shoppingCar.js'

// addToCart('ship',2)
// addToCart('ship',4)
// addToCart('ship',6)

// // cart原本是个空数组，但会随着相应代码的变化而变化，也就是之前讲得live-connect
// console.log(cart)

//////////////////////////////////////////////////////////////////////////////
// 立即调用函数
// 这一部分的意义是什么？

// 因为立刻调用函数后会消失，所以将其值存储在变量中
const shoppingCar2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${product}, ${quantity} added to the cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${product} ${quantity} orderd from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

console.log(shoppingCar2);

// 函数外调用函数内部的addToCart
shoppingCar2.addToCart('ship', 1);
