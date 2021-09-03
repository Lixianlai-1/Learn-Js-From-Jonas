'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const editButton = document.querySelector('.editBtn');

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

class Workout {
  //Public field，为什么要设置这两个部分
  date = new Date();

  // 设置public instance fields并利用它
  clicks = 0;

  click() {
    this.clicks++;
  }

  //得到现在的时间
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    //为什么在这里要直接放入coords？
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  //在父类中设置，以便于子类能够继承，不用重写两遍
  _setDescriptioin() {
    // prettier-ignore
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // 首字母大写并用slice方法与后面的字符串拼接
    // 通过Date和getMonth得到具体的数字，然后将其作为索引值，得到月份数组中的内容
    // getDate得到当月的多少号
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}
    `;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;

    //直接执行,在对象中增加了一个pace(步速)的属性
    this.calcPace();
    this._setDescriptioin();
  }

  // min/duration
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  // 如没有这个type，renderWork的很多步骤就没法做，比如无法形成新的html表单
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescriptioin();
  }

  // distance / h
  calcSpeed() {
    //通过this.speed，给当前对象创建属性并赋值
    //尽管用户输入的是字符串数字，但字符串数字减乘除后的返回的是数字（加法的结果还是字符串）
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([29, 102], 111, 30, 178);
const cycling1 = new Cycling([29, 102], 111, 30, 178);
console.log(run1, cycling1);

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
class App {
  #map;
  #mapZoom = 15;
  #mapEvent;
  #workouts = [];
  type;

  constructor() {
    // 创建实例时自动调用构造函数
    this._getPosition();

    // 得到存储
    this._getLocalStorage();

    //在使用addEventListener时，被调用的函数的内部的this，会变成正在调用的form，而我们在其内部又需要使用类App中的内容，所以这里需要绑定this，以便于读取类App中的其他内容
    form.addEventListener('submit', this._newWorkout.bind(this));

    //这里之所以不需要额外绑定this，是因为_toggleElevationField中不需要用到this，所以在这里用this._toggleElevationField在类App中找到相应方式即可
    inputType.addEventListener('change', this._toggleElevationField);

    // this._toggleElevationField();
    // this._newWorkout();

    // 在点击左边的列表时，执行函数，通过data-id找到数组的位置
    // 在使用监听事件后，注意this会变成监听的内容，而我在_moveToPopup中想要的this是App对象，所以需要绑定this
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    editButton.addEventListener('click', this._editInput.bind(this));
  }

  _editInput() {}

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

    this.#map = L.map('map').setView(coords, this.#mapZoom);

    //地图的信息和地图的样式，必不可少
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
      foo: 'bar',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // L.marker([latitude, longitude]).addTo(this.#map);
    // this._showForm();

    //这个on方法是leflet库自带的，点击后返回一个originalEvent事件，中有latlng属性，分别是lat和lng（经纬度）
    //之所以要bind绑定this，是因为找到_showForm后，其内部的this变成了#map，而在给this.#mapEvent = event赋值的时候，需要从类App中得到#mapEvent，所以这里面的this就必须是类对象App，所以在这里需要绑定this
    this.#map.on('click', this._showForm.bind(this));

    // 之所以要把这一步放在这里，而不是直接放在_getLoaclStorage，是因为需要this.#map加载之后，才能读取Marker，这也就是下一步要学习的异步的内容
    // this.#workouts.forEach(workout => this._renderWorkoutMaker(workout));
    this.#workouts.forEach(work => {
      this._renderWorkoutMaker(work);
      this._renderWorkout(work);
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

  // 当用户提交了新的Workout时，自动隐藏
  _hiddenForm() {
    // 每次重新提交之后，输入框中的内容再次为空
    inputDuration.value =
      inputDistance.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // 先让整个样式消失不见
    form.style.display = 'none';

    form.classList.add('hidden');

    // 设置一秒钟之后让form重新出现，如果没有这一步，那么再次点击地图将无法输入新的Workout
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
    //因为是普通函数，需要手动return
    // const validInputs = function (...inputs) {
    //   return inputs.every(input => Number.isFinite(input));
    // };

    //判断每个值都为有限数，因为是箭头函数，所以会自动return
    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    //判断每个数是否为正数
    const positveNum = (...inputs) => {
      return inputs.every(input => input > 0);
    };

    e.preventDefault();
    // Get date from form
    this.type = inputType.value;

    //通过+转化为数字
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (this.type === 'running') {
      const cadence = +inputCadence.value;

      // Check value is valid or not
      if (
        !validInputs(distance, duration, cadence) ||
        !positveNum(distance, duration, cadence)
      ) {
        console.log(distance, duration, cadence);
        return alert('所有值都需要输入正数哦');
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, crete cycling object
    if (this.type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !positveNum(distance, duration)
      ) {
        return alert('请输入正数');
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //注意push的方式，之前都搞错了
    this.#workouts.push(workout);
    console.log(workout);
    console.log(this.#workouts);

    // Add new object in workout array

    // Render workout on map as marker

    //注意这里的preventDefault后面要加()

    //每次重新提交之后，输入框中的内容再次为空
    inputDuration.value =
      inputDistance.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // 这里相当于是直接调用这个函数，其中的this没有改变，所以不需要用bind(this)
    // 必须在此处调用，因为需要用到workout
    this._renderWorkoutMaker(workout);

    // Render Workout on list
    this._renderWorkout(workout);

    //让之前的输入表单消失
    this._hiddenForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMaker(workout) {
    console.log(this.type);
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 300,
          minWidth: 50,
          className: `${this.type}-popup`,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .setPopupContent(
        // popup内容绑定
        `${workout.type === 'running' ? '🦿' : '🚲'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    //首字母大写
    const firstWorkUppercase = function (nameStr) {
      nameStr = `${nameStr[0].toUpperCase()}${nameStr.slice(1)};`;
      return nameStr;
    };
    // alert(workout.type);

    // 通过三元运算符得到图标的样式，然后将跑步和骑车没有区别的distance和duration写出
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.description}</h2>
    <button class="editBtn">Edit</button>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🦿' : '🚲'
      }</span>
      <span class="workout__value">${workout.distance}</span>
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

    // 将上面的html添加到form表单的后面，注意insetAdjacentHTML的用法，前者位置，后者内容
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(event) {
    // mouseEvent事件
    // console.log(event);

    // 找到点击的那个部分
    // console.log(event.target);

    // 找到点击部分所在的那个workout栏
    const workoutEl = event.target.closest('.workout');
    // console.log(workoutEl);

    //如果点击的地方返回的是null，那么返回
    if (!workoutEl) return;

    // 锻炼对象集合的数组
    // console.log(this.#workouts);

    // 如何读取HTML中的自定义属性，用dataset
    // 用find方法找到满足条件的第一个workout
    const workout = this.#workouts.find(
      workout => workout.id === workoutEl.dataset.id
    );
    // console.log(workout);

    // leaflet中的setView(),第一个参数是坐标数组，第二个坐标是缩放的程度
    // 通过设置private instance field集中设置缩放程度
    this.#map.setView(workout.coords, this.#mapZoom, {
      // 如果没有设置{ animate: true }，在看不到坐标点的位置点击相应workout，会直接出现到那个位置，而不是平移
      animate: true,
      // 设置动画完成的时间
      duration: 1,
    });

    // workout.click();
    console.log(workout);
  }

  // 将用户操作的workout数组存储到localStorage中
  // JSON.stringify将一个 JavaScript 对象或值转换为 JSON 字符串
  _setLocalStorage() {
    // 下方为键值对
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    // 解析JSON字符串
    const data = JSON.parse(localStorage.getItem('workouts'));
    // alert(data);

    // 如果是null，就停止执行
    if (!data) return;

    // 将之前存储的数据设置到#workouts
    this.#workouts = data;

    // 保留并渲染左边的锻炼框
    // this.#workouts.forEach(workout => this._renderWorkout(workout));

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  // Set a public instance field to clear storage and reload the page
  reset() {
    // Storage 接口的 removeItem() 方法，接受一个键名作为参数，会从给定的Storage对象中删除该键名（如果存在）。 如果没有与该给定键名匹配的项，则此方法将不执行任何操作。
    localStorage.removeItem('workouts');

    // Location.reload() 方法用来刷新当前页面。该方法只有一个参数，当值为 true 时，将强制浏览器从服务器加载页面资源，当值为 false 或者未传参时，浏览器则可能从缓存中读取页面。
    location.reload();
  }
}

const mapty = new App();
