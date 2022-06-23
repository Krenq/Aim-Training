const startBtn = document.querySelector('#startBtn');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colorInput = document.querySelector('#color');
const btnNewGame = document.querySelector('.btnNewGame');
const colors = ['red', 'yellow', 'green', 'pink', 'purple', 'brown', 'blue'];
let time = 0;
let score = 0;
// let color = 'black';

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

colorInput.addEventListener('input', (event) => {
  color = colorInput.value;
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  let current;
  if (time === 0) {
    time--;
    finishGame();
  } else if (time > 0) {
    current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
  }
  setTime(current);
}


function finishGame(params) {
    timeEl.parentNode.remove();
    board.innerHTML = `
    <h1>Счет: <span class='primary'>${score}</span></h1>
    `;
}

function createRandomCircle(params) {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  //   circle.style.background = getColorCircle();
  setColor(circle);
  
  board.append(circle);
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getColorCircle() {
    return color;
}

const randomColor = () => {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
};

const setColor = (target) => {
    const color = randomColor();
    target.style.background = `${color}`;
};
