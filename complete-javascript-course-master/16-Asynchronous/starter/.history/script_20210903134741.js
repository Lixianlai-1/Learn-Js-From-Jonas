'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const render = function (data, className = '') {
  // 通过data获取相应数据
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${+(
        data.population / 100000000
      ).toFixed(1)} 亿人</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].nativeName}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  // 原有的透明度为0，现设置为1
  countriesContainer.style.opacity = 1;
};

const renderErr = function (msg) {
  // 注意是insertAdjacentText，不是HTML
  // 将一个给定的文本节点插入在相对于被调用的元素给定的位置。
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// // XMLHttpRequest（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。XMLHttpRequest 在 AJAX 编程中被大量使用。
// // 实际上目前这种方式用得较少了
// const getCountry = function (country) {
//   const request = new XMLHttpRequest();

//   // 初始化一个请求。该方法只能在 JavaScript 代码中使用，若要在 native code 中初始化请求，请使用 openRequest()。
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

//   // 发送请求
//   request.send();

//   // load事件
//   request.addEventListener('load', function () {
//     // XMLHttpRequest.responseText 在一个请求被发送后，从服务器端返回文本。
//     // 因为解析后有澳门，台湾和中国，所以通过索引读取
//     const data = JSON.parse(this.responseText)[0];
//     console.log(data);

//     // 通过data获取相应数据
//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${+(
//         data.population / 100000000
//       ).toFixed(1)} 亿人</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[0].nativeName}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//   </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);

//     // 原有的透明度为0，现设置为1
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountry('china');
// getCountry('japan');
// getCountry('korea');
// getCountry('usa');

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

// const getNeighbor = function (country) {
//   const request = new XMLHttpRequest();

//   // 初始化一个请求。该方法只能在 JavaScript 代码中使用，若要在 native code 中初始化请求，请使用 openRequest()。
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

//   // 发送请求
//   request.send();

//   // load事件
//   request.addEventListener('load', function () {
//     // XMLHttpRequest.responseText 在一个请求被发送后，从服务器端返回文本。
//     // 因为解析后有澳门，台湾和中国，所以通过索引读取
//     const data = JSON.parse(this.responseText)[0];
//     console.log(data);
//     // 解构数组时，按照顺序解构，所以解构了第一个
//     render(data);
//     const [neighbor] = data.borders;

//     // 当没有邻国时，不再执行下面的内容
//     if (!neighbor) return;
//     console.log(neighbor);

//     // 注意这一个请求是在前一个请求之内的，如果在之外，那么就无法得到这个数据
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       render(data2, 'neighbour');
//     });
//   });
// };

// getNeighbor('china');
// getNeighbor('japan');
// getNeighbor('korea');
// getNeighbor('usa');

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     // XMLHttpRequest.responseText 在一个请求被发送后，从服务器端返回文本。
//     // 因为解析后有澳门，台湾和中国，所以通过索引读取
//     const data = JSON.parse(this.responseText)[0];
//     console.log(data);
//     // 解构数组时，按照顺序解构，所以解构了第一个
//     render(data);
//     const [neighbor] = data.borders;}

// const request = fetch(`https://restcountries.eu/rest/v2/name/china`);

// const getJSON = function (url) {
//   // 这里需要整个fetch.then中的回调函数的结果被返回,如果这里没有return，就没有Promise被返回
//   return fetch(`${url}`).then(response => {
//     // return fetch(`${url}`).then(response => {
//     // 如果得不到响应，response的ok属性就是false
//     if (!response.ok) {
//       // throw语句用来抛出一个用户自定义的异常。当前函数的执行将被停止（throw之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个catch块。如果调用者函数中没有catch块，程序将会终止。
//       // 这里throw的error会被catch抓住;
//       throw new Error(`Country not found ${response.status}`);
//     }
//     return response.json();
//   });
// };

// const getCountry = function (country) {
//   getJSON(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(data => {
//       render(data[0]);
//       const neighbour = data[0].borders[0];
//       // if (!neighbour) return;

//       // thorw所描述的错误，会被catch抓住
//       if (!neighbour) throw new Error(`没有邻国 `);

//       // return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//       return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     // .then(response => response.json())
//     .then(data2 => render(data2, 'neighbour'))

//     // Error.prototype.message, message 属性是有关错误信息，人类易读的（human-readable）描述。
//     .catch(err => renderErr(`这里有个错误，代码${err.message} 🤣`))

//     // finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
//     // 这避免了同样的语句需要在then()和catch()中各写一次的情况。
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// // 当遇到网络错误时，fetch() 返回的 promise 会被 reject，并传回 TypeError，虽然这也可能因为权限或其它问题导致
// fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//   .then(response => {
//     // 如果得不到响应，response的ok属性就是false
//     console.log(response.ok);
//     if (!response.ok) {
//       // throw语句用来抛出一个用户自定义的异常。当前函数的执行将被停止（throw之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个catch块。如果调用者函数中没有catch块，程序将会终止。
//       // 这里throw的error会被catch抓住;
//       throw new Error(`Country not found ${response.status}`);
//     }
//     return response.json();
//   })

//   .then(data => {
//     render(data[0]);
//     const neighbour = data[0].borders[0];
//     // if (!neighbour) return;
//     if (!neighbour) throw new Error('没有邻国');

//     return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//   })
//   .then(response => response.json())
//   .then(data2 => render(data2, 'neighbour'))

//   // Error.prototype.message, message 属性是有关错误信息，人类易读的（human-readable）描述。
//   .catch(err => renderErr(`这里有个错误，代码${err.message} 🤣`))

//   // finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
//   // 这避免了同样的语句需要在then()和catch()中各写一次的情况。
//   .finally(() => {
//     countriesContainer.style.opacity = 1;
//   });

// 当遇到网络错误时，fetch() 返回的 promise 会被 reject，并传回 TypeError，虽然这也可能因为权限或其它问题导致
// };

// btn.addEventListener('click', function () {
//   getCountry('japan');
//   // getCountry('china');
//   // 如果读取一个根本就不存在的国家
// });
// getCountry('chinasdfaa');

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}1?geoit=json`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`你重新加载的速度过快了${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(response => {
//       console.log(response.ok);
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       render(data[0]);
//       const neighbour = data[0].borders[0];
//       // if (!neighbour) return;
//       if (!neighbour) throw new Error('没有邻国');

//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data2 => render(data2, 'neighbour'))
//     .catch(err => console.error(`这里有个错误，代码${err.message} 🤣`))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
//---------------------------------------------------------------------------
// .then(response => {
//     // 如果得不到响应，response的ok属性就是false
//     console.log(response.ok);
//     if (!response.ok) {
//       // throw语句用来抛出一个用户自定义的异常。当前函数的执行将被停止（throw之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个catch块。如果调用者函数中没有catch块，程序将会终止。
//       // 这里throw的error会被catch抓住;
//       throw new Error(`Country not found ${response.status}`);
//     }
//     return response.json();
//   })

//   .then(data => {
//     render(data[0]);
//     const neighbour = data[0].borders[0];
//     // if (!neighbour) return;
//     if (!neighbour) throw new Error('没有邻国');

//     return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//   })
//   .then(response => response.json())
//   .then(data2 => render(data2, 'neighbour'))

//   // Error.prototype.message, message 属性是有关错误信息，人类易读的（human-readable）描述。
//   .catch(err => renderErr(`这里有个错误，代码${err.message} 🤣`))

//   // finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
//   // 这避免了同样的语句需要在then()和catch()中各写一次的情况。
//   .finally(() => {
//     countriesContainer.style.opacity = 1;
//   });

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// callback queue要等macrotask queue中的任务执行完之后再执行

// console.log('Log start!');

// // 放在普通的callback 队列中
// setTimeout(() => {
//   console.log(
//     '0秒后执行，microtask queue中的任务执行完后，再执行callback队列中的任务'
//   );
//   // 实际上并不一定是0秒后立刻执行，要等microtask queue执行完后再执行这部分
// }, 0);

// // 直接被解决的Promise，返回的值就是resolve中的内容，放入microtask队列中
// Promise.resolve('Resolved promise 1').then(response => console.log(response));

// Promise.resolve('Resolved Promise 2').then(response => {
//   // 执行普通的非callback函数
//   for (let i; i < 100000; i++) {}
//   console.log(response);
// });

// console.log('Log end');

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// 传递给 new Promise 的函数被称为 executor
// executor 会自动运行并尝试执行一项工作。尝试结束后，如果成功则调用 resolve，如果出现 error 则调用 reject
// 这整个部分会返回一个Promise，所以需要用then继续处理它
// const promiseLottery = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     // 注意使用Math方法时，后面一定要跟()，我又在这里出错了
//     if (Math.random() >= 0.5) {
//       // 如果任务成功完成并带有结果 value
//       resolve('You got it!👌');
//     } else {
//       // 如果出现了 error，error 即为 error 对象。
//       reject('You lose your money! 😂');
//     }
//   }, 2000);
// });

// promiseLottery.then(res => console.log(res)).catch(err => console.error(err));

// //---------------------------------------------------------------------------
// //promisify setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     // 并没有传递值，只是等待了指定的秒钟，
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     // 返回了一个Promise,于是可以做下面的操作
//     return wait(1);
//   })
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('一共过去了5秒');
//   });

// // // 回调地狱,通过promise来解决
// // setTimeout(() => {
// //   console.log('1 second passed!');
// //   setTimeout(() => {
// //     console.log('1 second passed!');
// //     setTimeout(() => {
// //       console.log('1 second passed!');
// //       setTimeout(() => {
// //         console.log('1 second passed!');
// //         setTimeout(() => {
// //           console.log('1 second passed!');
// //         }, 100);
// //       }, 100);
// //     }, 100);
// //   }, 100);
// // }, 100);

// Promise.resolve('被接受时的值').then(res => console.log(res));

// Promise.reject(new Error('Problem happend!😜')).catch(res =>
//   console.error(res)
// );
//---------------------------------------------------------------------------

// Promisifying Geolocation

// 普通的获取当前坐标的方法
// navigator.geolocation.getCurrentPosition(
//   // 第一个函数代表成功获取，第二个代表获取失败
//   function (position) {
//     console.log(position);
//   },
// //   err => console.log(err)
// // );

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // 因为在获取地址时，只需要行或不行
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
//   // 注意要return Promise
//   // return new Promise(function (resolve, reject) {
//   //   navigator.geolocation.getCurrentPosition(
//   //     // 这里的关键是resolve()和reject()中，()中就是绑定的对应内容
//   //     position => resolve(position),
//   //     err => reject(err)
//   //   );
//   // });
// };

// // 注意getPosition要()执行

// const whereAmI = function () {
//   getPosition().then(pos => {
//     // 注意解构对象时，如何赋予新的变量
//     const { latitude: lat, longitude: lng } = pos.coords;
//     console.log(lat, lng);

//     fetch(`https://geocode.xyz/${lat},${lng}1?geoit=json`)
//       .then(response => {
//         console.log(response);
//         if (!response.ok) {
//           throw new Error(`你重新加载的速度过快了${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log(`You are in ${data.city}, ${data.country}`);
//         return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//       })
//       .then(response => {
//         console.log(response.ok);
//         if (!response.ok) {
//           throw new Error(`Country not found ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         render(data[0]);
//         const neighbour = data[0].borders[0];
//         // if (!neighbour) return;
//         if (!neighbour) throw new Error('没有邻国');

//         return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//       })
//       .then(response => response.json())
//       .then(data2 => render(data2, 'neighbour'))
//       .catch(err => console.error(`这里有个错误，代码${err.message} 🤣`))
//       .finally(() => {
//         countriesContainer.style.opacity = 1;
//       });
//   });
// };
// // 注意whereAmI后面不用加()，因为click时会执行程序
// btn.addEventListener('click', whereAmI);

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// // 这个部分的关键是等待2秒后返回Promise，而Promise可以接then，2秒之后再添加程序
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     // 并没有传递值，只是等待了指定的秒钟，
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // 找到图片包装盒
// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     // 创造图片及其标签
//     const newImage = document.createElement('img');
//     newImage.classList.add('images');
//     newImage.src = imgPath;

//     newImage.addEventListener('load', function () {
//       // wait(2).then(() => imgContainer.append(newImage));
//       // Element.append 方法在 Element的最后一个子节点之后插入一组 Node 对象或 DOMString 对象。
//       imgContainer.append(newImage);
//       // 返回一个带着给定值解析过的Promise对象，如果参数本身就是一个Promise对象，则直接返回这个Promise对象。
//       resolve(newImage);
//     });

//     newImage.addEventListener('error', function () {
//       // 返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法
//       reject(new Error('图片传递失败🤣'));
//     });
//   });
// };

// let currentImg;
// // 注意传入图片path
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   // .then(() => {
//   //   currentImg.style.display = 'none';
//   //   // 隐藏第一张图片后，立刻出现第二张图片，然后让其维持两秒的显现状态
//   //   return createImage('img/img-2.jpg');
//   // })
//   .then(() => {
//     currentImg.style.display = 'none';
//     // 第一张图片隐藏后，等待两秒
//     return wait(2);
//   })
//   .then(() => {
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     // 因为创造了新的image，所以要重新定义变量
//     // 这里的整体作用就是让第二张图片显示两秒,然后再执行下一步then时隐藏
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(`图片地址不对${err}`));

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
// Consuming Promises with Async/Await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // 因为在获取地址时，只需要行或不行
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
console.log(getPosition());

// 这个函数总是返回一个 promise。其他值将自动被包装在一个 resolved 的 promise 中。
const whereAmI = async function () {
  try {
    // 得到当前设备所在的经纬度,GeolocationPosition对象
    const geo = await getPosition();

    // 通过GeolocationPosition的coords属性，得到具体的经纬度
    // 通过解构对象并赋值，让经纬度可以通过lat和lng设置
    const { latitude: lat, longitude: lng } = geo.coords;
    // 通过fetch得到Response对象
    const myPlaceResponse = await fetch(
      `https://geocode.xyz/${lat},${lng}1?geoit=json`
    );

    // fetch只有失去网络连接这个问题，所以需要主动设置ok
    if (!myPlaceResponse.ok) throw new Error('地理位置获取失败😂');
    // 通过json()解析到具体的对象， 将 response 解析为 JSON，包含国家名等众多信息，这会返回一个Promise
    const dataGeo = await myPlaceResponse.json(); // 读取 response body，并将其解析为 JSON

    //------------------------------------------------------------------------------
    // 运用另一个库，通过输入当前坐标所获得的国家名，用restcountries这个库，得到各种信息
    const countryResponse = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!countryResponse.ok) throw new Error('所在国家的地图等信息获取失败😂');

    // json()解析后，是一个数组中包含一个或多个对象
    const countryData = await countryResponse.json();

    // 得到JSON格式中的第一个对象，通过render函数渲染国旗、人口数量等
    render(countryData[0]);
    return `async函数会返回promise，目前的城市是${dataGeo.city}`;
  } catch (err) {
    // throw new Error(`🤣 出错啦，原因是： ${err.message}`)
    renderErr(err);

    //reject promise returned from acync function
    throw err;
  }
};

// console.log('1:First！');
// //
// whereAmI()
//   // 在没有获得data的情况下，下面的代码也依然在运行。代表前面的whereAmI是fulfilled and not rejected
//   .then(data => console.log(`2: ${data}`)) //下面的catch并没有抓到错误，是640行在运行
//   .catch(err => console.log(err.message))
//   .finally(() => console.log('3:Three！'));

// try {
//   const x = 1;
//   x = 2;
// } catch (err) {
//   // 注意一定要有(err)，不然是错的
//   alert(err.message);
// }

// 立刻执行异步函数
// console.log('1:First！');
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2:${city}`);
//   } catch (err) {
//     console.log(`2:${err.message}`);
//   }
//   console.log('3:Three！');
// })();

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// Running Promises in Parallel

const getJSON = function (url) {
  // 这里需要整个fetch.then中的回调函数的结果被返回,如果这里没有return，就没有Promise被返回
  return fetch(`${url}`).then(response => {
    // return fetch(`${url}`).then(response => {
    // 如果得不到响应，response的ok属性就是false
    if (!response.ok) {
      // throw语句用来抛出一个用户自定义的异常。当前函数的执行将被停止（throw之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个catch块。如果调用者函数中没有catch块，程序将会终止。
      // 这里throw的error会被catch抓住;
      throw new Error(`Country not found ${response.status}`);
    }
    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  // 注意使用try-catch
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log(data1.capital, data2.capital, data3.capital);
  } catch (err) {
    // 在真实的开发环境中，一定要用console.error
    console.error(err.message);
  }
};

get3Countries('china', 'japan', 'korea');
