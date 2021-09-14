// 闭包的复习与延申

// // 1.outValue变量和函数outFunction都是在全局作用域下声明的
// const outValue = 'ninja';
// function outFunction() {
//     // 这里是可以读取外部的outValue，即访问了外部变量
//   console.log(outValue === 'ninja', 'I can see the ninja');
// }

// outFunction();


// --------------------------------------------------------

const outValue = 'samerai';
let later;

const outerFunction = function() {
    const innerValue = 'ninja';

    const innerFunction = function() {
        console.log(innerValue === 'ninja')
        console.log(onterValue === 'ninja')
    }
}




//////////////////////////////////////////////////////////
// 算法

// const str = '123';
// const strArr = str.split('')
// console.log(strArr)
// const reverseStrArr = strArr.reverse()
// console.log(reverseStrArr)

// function reverse(str) {
//     const strArr = str.split('')
//     console.log(strArr)
//     const reverseStrArr = strArr.reverse()
//     const string =  reverseStrArr.join('')
//     console.log(string)
// }

// reverse('apple')
// reverse('hello')
