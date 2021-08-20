'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

////////////////////////////////////////////////////////////////////////////////////////////

class Workout {
  date = new Date();
  //注意要跟()
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

//注意要用extends继承
class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;

    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;

    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([29, 103], 30, 100, 100);
const cyc1 = new Cycling([29, 103], 30, 100, 100);
console.log(run1, cyc1);

class App {
  #map;
  #mapEvent;

  constructor() {
    //创建实例时自动调用构造函数
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      //必须绑定this，不然相当于在getCurrentPositon这个函数里执行函数，this就变成了undefined，主动用bind绑定类App，bind会返回一个新的函数
      this._loadMap.bind(this),
      function () {
        alert('This is you not allow browser get your address');
      }
    );
  }

  //这里的position由_getPosition的navigator提供
  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    console.log(`www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];
    // console.log(`www.google.com/maps/@${longitude},${latitude}`);

    this.#map = L.map('map').setView(coords, 18);

    //地图的信息和地图的样式，必不可少
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
      foo: 'bar',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker([latitude, longitude]).addTo(this.#map);
    // this._showForm();

    //这个on方法是leflet库自带的，点击后返回一个originalEvent事件，中有latlng属性，分别是lat和lng（经纬度）
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(event) {
    this.#mapEvent = event;

    //让隐藏的表单显现出来
    form.classList.remove('hidden');

    //让Distance输入框出处于输入状态，一个表单中，同时只能出现一个，如果有重复，就出现后面那个
    inputDistance.focus();
    // inputDuration.focus();
  }

  _toggleElevationField() {
    //选择running和cycling时，第四个输入框的变化
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    //注意这里的preventDefault后面要加()
    e.preventDefault();

    //每次重新提交之后，输入框中的内容再次为空
    inputDuration.value =
      inputDistance.value =
      inputCadence.value =
      inputElevation.value =
        '';

    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 300,
          minWidth: 50,
          className: 'running-popup',
          autoClose: false,
          closeOnClick: false,
        })
      )
      .setPopupContent('Workout!')
      .openPopup();
  }
}

const mapty = new App();

///////////////////////////////////////////////////////////////////////////////////////////////
//原本做法

// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     const { latitude, longitude } = position.coords;
//     console.log(`www.google.com/maps/@${latitude},${longitude}`);

//     const coords = [latitude, longitude];
//     // console.log(`www.google.com/maps/@${longitude},${latitude}`);

//     map = L.map('map').setView(coords, 18);

//     //地图的信息和地图的样式，必不可少
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
//       foo: 'bar',
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     L.marker([latitude, longitude]).addTo(map);

//     //这个on方法是leflet库自带的，点击后返回一个originalEvent事件，中有latlng属性，分别是lat和lng（经纬度）
//     map.on('click', function (event) {
//       mapEvent = event;

//       //让隐藏的表单显现出来
//       form.classList.remove('hidden');

//       //让Distance输入框出处于输入状态，一个表单中，同时只能出现一个，如果有重复，就出现后面那个
//       inputDistance.focus();
//       // inputDuration.focus();
//     });
//   },
//   function () {
//     alert('This is you not allow browser get your address');
//   }
// );

// //当在表单中输入内容，按下enter后
// form.addEventListener('submit', function (e) {
//   //注意这里的preventDefault后面要加()
//   e.preventDefault();

//   //每次重新提交之后，输入框中的内容再次为空
//   inputDuration.value =
//     inputDistance.value =
//     inputCadence.value =
//     inputElevation.value =
//       '';

//   const { lat, lng } = mapEvent.latlng;
//   L.marker([lat, lng], { opacity: 0 })
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 300,
//         minWidth: 50,
//         className: 'running-popup',
//         autoClose: false,
//         closeOnClick: false,
//       })
//     )
//     .setPopupContent('Workout!')
//     .openPopup();
// });

// //选择running和cycling时，第四个输入框的变化
// inputType.addEventListener('change', function () {
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
// });
