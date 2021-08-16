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

class Workout {
  //Public field，为什么要设置这两个部分
  date = new Date();

  //得到现在的时间
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    //为什么在这里要直接放入coords？
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;

    //直接执行
    this.calcPace();
  }

  // min/duration
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

  // distance / h
  calcSpeed() {
    //通过this.speed，给当前对象创建属性并赋值
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([29, 102], 111, 30, 178);
const cycling1 = new Cycling([29, 102], 111, 30, 178);
console.log(run1, cycling1);

class App {
  #map;
  #mapEvent;

  constructor() {
    //创建实例时自动调用构造函数
    this._getPosition();

    //在使用addEventListener时，被调用的函数的内部的this，会变成正在调用的form，而我们在其内部又需要使用类App中的内容，所以这里需要绑定this，以便于读取类App中的其他内容
    form.addEventListener('submit', this._newWorkout.bind(this));

    //这里之所以不需要额外绑定this，是因为_toggleElevationField中不需要用到this，所以在这里用this._toggleElevationField在类App中找到相应方式即可
    inputType.addEventListener('change', this._toggleElevationField);

    // this._toggleElevationField();
    // this._newWorkout();
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      //必须绑定this，不然相当于在getCurrentPositon这个函数里执行函数，函数中的函数，this就变成了undefined，主动用bind绑定类App，bind会返回一个新的函数
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
    //之所以要bind绑定this，是因为找到_showForm后，其内部的this变成了#map，而在给this.#mapEvent = event赋值的时候，需要从类App中得到#mapEvent，所以这里面的this就必须是类对象App，所以在这里需要绑定this
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
    L.marker([lat, lng], { opacity: 0 })
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
