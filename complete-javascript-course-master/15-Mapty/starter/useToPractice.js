'use strict';

// // prettier-ignore
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

  _setDescription() {
    // prettier-ignore
    const months =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDay()}`;

    // _setDescriptioin() {
    //   // prettier-ignore
    //   const months = [
    //     'January',
    //     'February',
    //     'March',
    //     'April',
    //     'May',
    //     'June',
    //     'July',
    //     'August',
    //     'September',
    //     'October',
    //     'November',
    //     'December',
    //   ];

    //   // 首字母大写并用slice方法与后面的字符串拼接
    //   // 通过Date和getMonth得到具体的数字，然后将其作为索引值，得到月份数组中的内容
    //   // getDate得到当月的多少号
    //   this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
    //     months[this.date.getMonth()]
    //   } ${this.date.getDate()}
    //   `;
  }
}

//注意要用extends继承
class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;

    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;

    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([29, 103], 30, 100, 100);
const cyc1 = new Cycling([29, 103], 30, 100, 100);
console.log(run1, cyc1);

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

class App {
  #map;
  #mapEvent;
  #workout = [];
  #mapZoom = 13;

  constructor() {
    //创建实例时自动调用构造函数
    this._getPosition();
    this._getLocalStorage();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    this._getLocalStorage();
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

    this.#map = L.map('map').setView(coords, this.#mapZoom);

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

    this.#workout.forEach(workout => {
      this._renderWorkout(workout);
      this._renderMarker(workout);
    });
  }

  _showForm(event) {
    this.#mapEvent = event;

    //让隐藏的表单显现出来
    form.classList.remove('hidden');

    //让Distance输入框出处于输入状态，一个表单中，同时只能出现一个，如果有重复，就出现后面那个
    inputDistance.focus();
    // inputDuration.focus();
  }

  _hiddenForm() {
    // 让填写表单的空格隐藏，新出现的表单会在原有的位置上出现
    form.style.display = 'none';

    // 隐藏表单
    form.classList.add('hidden');

    // 如果不设置这一步，用户再次点击时，不会出现输入值的表单
    setTimeout(function () {
      form.style.display = 'grid';
    }, 1000);
  }

  _toggleElevationField() {
    //选择running和cycling时，第四个输入框的变化
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    //注意这里的preventDefault后面要加()
    e.preventDefault();

    const finiteHelper = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    const positiveNumHelper = (...inputs) => inputs.every(input => input > 0);

    // //判断每个值都为有限数，因为是箭头函数，所以会自动return
    // const validInputs = (...inputs) =>
    //   inputs.every(input => Number.isFinite(input));

    // //判断每个数是否为正数
    // const positveNum = (...inputs) => {
    //   return inputs.every(input => input > 0);
    // };

    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    // const cadence = +inputCadence.value;

    // if (type === 'running') {
    //   if (
    //     !finiteHelper(distance, duration, cadence) ||
    //     !positiveNumHelper(distance, duration, cadence)
    //   ) {
    //     console.log(type, distance, cadence);

    //     alert('输入正数和有限数');
    //     return;
    //   }

    //   workout = new Running([lat, lng], distance, duration, cadence);
    // }
    // If workout running, create running object

    if (type === 'running') {
      const cadence = +inputCadence.value;

      // Check value is valid or not
      if (
        !finiteHelper(distance, duration, cadence) ||
        !positiveNumHelper(distance, duration, cadence)
      ) {
        console.log(distance, duration, cadence);
        return alert('所有值都需要输入正数哦');
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevationGain = +inputElevation.value;
      if (
        !finiteHelper(distance, duration, elevationGain) ||
        !positiveNumHelper(distance, duration)
      ) {
        alert('输入正数和有限数');
        return;
      }

      workout = new Cycling([lat, lng], distance, duration, elevationGain);
    }

    this.#workout.push(workout);
    console.log(this.#workout);

    //每次重新提交之后，输入框中的内容再次为空,注意要把这部分内容放在下方，不然submit事件形成的新的输入值，就变成了空字符串，就会变转化为0，程序就不能正常运行
    inputDuration.value =
      inputDistance.value =
      inputCadence.value =
      inputElevation.value =
        '';

    this._renderMarker(workout);
    this._renderWorkout(workout);

    // 隐藏form
    this._hiddenForm();

    // 设置缓存数据
    this._setLocalStorage();
  }

  _renderMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 300,
          minWidth: 50,
          className: `${workout.type}-popup`,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .setPopupContent(`${workout.description}`)
      .openPopup();
  }

  // 找到HTMl并设置相关参数
  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🦿' : '🚲'
      }</span>
      <span class="workout__value">${workout.distance.toFixed(1)}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>
    `;

    // 当状态时跑步时，加入步速和cadence的html
    if (workout.type === 'running') {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
     </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
     </div>
     </li> 
      `;
    }

    // 当状态时骑车时，加入speed和提升高度（海拔）elevation的html
    // Number.toFixed()后面跟的数字，是保留几位小数点
    //注意下方是想要获得对象中的属性，而不是用户输入的值，所以我需要写workout.elevationGain（即上面的属性名elevationGain）
    if (workout.type === 'cycling') {
      console.log(workout);
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
     </li> 
        `;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(event) {
    const workoutEL = event.target.closest('.workout');

    // 如果是null，就return不再执行
    if (!workoutEL) return;

    const workout = this.#workout.find(
      workout => workout.id === workoutEL.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoom, {
      // 注意是animate，不然动画不能生效
      animate: true,
      duration: 1,
    });
  }

  _setLocalStorage() {
    localStorage.setItem('workout', JSON.stringify(this.#workout));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workout'));

    if (!data) return;

    // 把从浏览器储存中得到的数据，储存在private field中
    this.#workout = data;
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
