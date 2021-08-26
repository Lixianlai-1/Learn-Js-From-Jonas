'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// XMLHttpRequest（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。XMLHttpRequest 在 AJAX 编程中被大量使用。
// 实际上目前这种方式用得较少了
const request = new XMLHttpRequest();

// 初始化一个请求。该方法只能在 JavaScript 代码中使用，若要在 native code 中初始化请求，请使用 openRequest()。
srequet.open('GET', 'https://restcountries.eu/rest/v2/name/china');

// 发送请求
request.send();

// load事件
request.addEventListener('load', function () {
  // XMLHttpRequest.responseText 在一个请求被发送后，从服务器端返回文本。
  // 因为解析后有澳门，台湾和中国，所以通过索引读取
  const data = JSON.parse(this.responseText)[0];
});
