'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// 渲染图像;
const render = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 100000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
 </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;
};

// 展示错误;
const renderErr = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  console.log(message);
  // console.log(`This is ${message} 🤣`);
  countriesContainer.style.opacity = 1;
};

// 得到目标国家与邻国
// const getNeighborCountry = function (country) {
//   const request = new XMLHttpRequest();

//   // 指定要得到的服务器
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     // console.log(JSON.parse(this.responseText));
//     const data = JSON.parse(this.responseText)[0];
//     render(data);
//     console.log(data);

//     const [neighbour] = data.borders;
//     console.log(neighbour);
//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();
//     // 指定要得到的服务器
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       render(data2, 'neighbour');
//     });
//   });
// };

// getNeighborCountry('china');

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// 用Promise
// const getJSON = function (url) {
//   return fetch(url).then(response => {
//     // 当获取失败时，执行后面这个函数并返回
//     if (!response.ok) {
//       throw new Error(`error code ${response.status}`);
//     }

//     return response.json();
//   });
// };

// const getCountry = function (country) {
//   // // Country1
//   // fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//   //   // 在运用箭头函数时，后边在没有{}的情况下才会自动返回哦
//   //   // Response.json(), Response  mixin 的 json() 方法接收一个 Response 流，并将其读取完成。它返回一个 Promise，Promise 的解析 resolve 结果是将文本体解析为 JSON。
//   //   .then(
//   //     response => response.json()
//   //     // 当获取失败时，执行后面这个函数并返回
//   //   )

//   //   //then() 方法返回一个 Promise (en-US)。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。
//   getJSON(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(data => {
//       render(data[0]);
//       const [neighbour] = data[0].borders;
//       // 没有邻国，就直接返回
//       if (!neighbour) throw new Error('没有邻国');

//       // Country2
//       // 注意这里必须返回fetch的值
//       return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(data2 => render(data2, 'neighbour'))
//     // 放在最后，任何一处有错误都能抓住。返回一个Promise (en-US)，并且处理拒绝的情况
//     .catch(err => renderErr(err.message))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', function () {
//   getCountry('japan');
// });

// getCountry('japasaan');

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// 代码挑战1

// In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

// Here are your tasks:

// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
// 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
// The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

// GOOD LUCK 😀

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
//     // 这里又出现了一次拼写错误，message写成了messsage，浪费了很多时间
//     .catch(err => console.log(err.message));
// };

// // 如果随意用别的坐标，可能因为没有城市而返回自己不想要的对象，比如没有城市名
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
// Promisifying the Geolocation API
// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     console.log(position, this);
//   },
//   function () {
//     console.log('没有成功获取地址');
//   }
// );

// const getPosition = function () {
//   // 注意要返回Promise
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // 对Promise进行处理
// getPosition().then(data => console.log(data));

// const whereAmI = function () {
//   getPosition().then(pos => {
//     const { latitude: lat, longitude: lng } = pos.coords;
//     fetch(`https://geocode.xyz/${lat},${lng}1?geoit=json`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`你重新加载的速度过快了${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log(`You are in ${data.city}, ${data.country}`);
//         return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//       })
//       .then(res => res.json())
//       .then(data => render(data[0]))

//       // 这里又出现了一次拼写错误，message写成了messsage，浪费了很多时间
//       .catch(err => console.log(err.message));
//   });
// };

// whereAmI();

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
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

// const imgContainer = document.querySelector('.images');

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2).then(() => console.log('2秒过去了'));

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.classList.add('images');

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('图片加载失败😂'));
//     });
//   });
// };

// // 注意箭头函数中的return，尤其是{}中一定要写啊
// let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return wait(2);
//   })
//   .then(() => createImage('img/img-2.jpg'))
//   .then(img => {
//     console.log(img);
//     currentImg = img;
//     // 忘记return浪费不少时间
//     return wait(2);
//   })
//   .then(() => {
//     return (currentImg.style.display = 'none');
//   })
//   .catch(err => console.log(err));

///////////////////////////////////////////////////////////////////////

const getPosition = function () {
  // 注意要返回Promise
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const geo = await getPosition();
    const { latitude: lat, longitude: lng } = geo.coords;
    const geoResponse = await fetch(
      `https://geocode.xyz/${lat},${lng}1?geoit=json`
    );
    if (!geoResponse.ok) {
      // console.error(new Error('地理位置获取失败😂'));
      throw new Error('地理位置获取失败😂');
    }

    const dataGeo = await geoResponse.json();
    const countryResponse = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!countryResponse.ok) {
      // console.error(new Error('国家信息获取失败🥱'));
      throw new Error('国家信息获取失败😂');
    }

    const countryData = await countryResponse.json();
    render(countryData[0]);
  } catch (err) {
    // console.error(err.message);
    throw new Error(`${err.message}`);
  }
};

whereAmI();
