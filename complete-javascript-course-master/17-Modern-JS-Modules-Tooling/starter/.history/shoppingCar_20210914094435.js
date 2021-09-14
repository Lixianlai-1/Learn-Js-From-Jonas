// Exporting module
export { sayWords };

// 引擎是把函数声明整个地提升到了当前作用域的顶部
// 因为JavaScript中的函数是一等公民，函数声明的优先级最高，会被提升至当前作用域最顶端
const sayWords = function () {
  console.log('Exporting module');
};

// --------------------------------------------------

//  const shippingCost = 10;
export const cart = [];

// 如果export在定义之前，那么import中是读取不到的
// 在export中，也可以改变要传递值的name
// export {shippingCost, cart as c}

// --------------------------------------------------

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${product}, ${quantity} added to the cart`);
};

// --------------------------------------------------
// 使用export default
export default function countNum(num) {
  console.log(`You enter the number ${num}`);
}
