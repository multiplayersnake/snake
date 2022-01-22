import { Snake, Coin, Boom, Circle, Apple } from './classes';
import { draw } from './draw';
import config from './constants';

let last = window.performance.now();
let mainTimerId: number;
let mainTimerStart: number;
let timeoutCoinGenerator: number;
let timeoutAppleGenerator: number;
let requestAnimationRender: number;

let ctx: CanvasRenderingContext2D;
const gameStatus = { mode: 'Play' };
const snakes: Snake[] = [];
const coins: Coin[] = [];
const booms: Boom[] = [];
const apples: Apple[] = [];
const indexOfSnakeUnderControl = 0;

function destroyAllObjects() {
  snakes.length = 0;
  coins.length = 0;
  apples.length = 0;
  booms.length = 0;
}

function stopAllProcesses() {
  gameStatus.mode = 'End';
  clearInterval(mainTimerId);
  clearTimeout(timeoutCoinGenerator);
  clearTimeout(timeoutAppleGenerator);
  window.cancelAnimationFrame(requestAnimationRender);
}

function clearGame() {
  stopAllProcesses();
  destroyAllObjects();
}

// Функция окончания игры
function gameOver(): void {
  stopAllProcesses();

  ctx.textBaseline = 'top';
  ctx.fillStyle = 'rgba(255,0,0,1.0)';
  ctx.font = '96px Impact';
  ctx.textAlign = 'center';
  ctx.clearRect(config.topPanelLeft, config.topPanelTop, config.topPanelWidth, config.topPanelHeight);
  ctx.fillText('Игра окончена', config.fieldLeft + config.fieldWidth / 2, 0, config.fieldWidth);
}

// Функция устанавливающая направление движения змеи
function setSnakeDirection(snake: Snake, direction: string): void {
  const head = snake.elements[0];
  // Скалярная скорость движения змеи
  const v = Math.abs(head.vx + head.vy);

  switch (direction) {
    case 'ArrowUp':
      head.vy = -v;
      head.vx = 0;
      break;
    case 'ArrowDown':
      head.vy = v;
      head.vx = 0;
      break;
    case 'ArrowLeft':
      head.vy = 0;
      head.vx = -v;
      break;
    case 'ArrowRight':
      head.vy = 0;
      head.vx = v;
      break;
  }
}

// Функция поворота змеи направо
function rotateSnakeRight(snake: Snake): void {
  const head = snake.elements[0];

  if (head.vy === 0) {
    head.vy = head.vx;
    head.vx = 0;
  } else {
    head.vx = -1 * head.vy;
    head.vy = 0;
  }
}

// Корректировка выхода объектов за границы поля
function correctElementPosition(snake: Snake): void {
  snake.elements.forEach((el) => {
    el.x = Math.max(config.lBorder, el.x);
    el.x = Math.min(config.rBorder, el.x);
    el.y = Math.max(config.tBorder, el.y);
    el.y = Math.min(config.bBorder, el.y);
  });
}

// Функция подбирания змеёй монеты
function snakeGetCoin(snake: Snake, coin: Coin, index: number): void {
  snake.score += coin.value;
  coins.splice(index, 1);
  const baseEl = snake.elements[1];

  for (let i = 1; i <= coin.value; i++) {
    const newElement: Circle = { x: baseEl.x, y: baseEl.y, vx: baseEl.vx, vy: baseEl.vy, col: baseEl.col, r: baseEl.r };
    snake.elements.splice(1, 0, newElement);
  }

  draw.drawRightPanel(ctx, snakes);
  draw.drawLeftPanel(ctx, snakes[indexOfSnakeUnderControl]);
}

// Функция контроля столкновения змеи с монетой
function collisionSnakeWithCoin(snake: Snake): void {
  const head = snake.elements[0];
  coins.forEach((coin, i) => {
    const dx = head.x - coin.x;
    const dy = head.y - coin.y;
    const r = Math.sqrt(dx ** 2 + dy ** 2);

    if (r < config.fieldStep) {
      snakeGetCoin(snake, coin, i);
    }
  });
}

// Функция подбирания змеёй монеты
function snakeGetApple(snake: Snake, apple: Apple, index: number): void {
  snake.hp = Math.min(100, snake.hp + 10);
  apples.splice(index, 1);
  draw.drawLeftPanel(ctx, snakes[indexOfSnakeUnderControl]);
}

// Функция контроля столкновения змеи с яблоком
function collisionSnakeWithApple(snake: Snake): void {
  const head = snake.elements[0];
  apples.forEach((apple, i) => {
    const dx = head.x - apple.x;
    const dy = head.y - apple.y;
    const r = Math.sqrt(dx ** 2 + dy ** 2);

    if (r < config.fieldStep) {
      snakeGetApple(snake, apple, i);
    }
  });
}

// Функция удара змеи обо что-либо
function snakeGetBoom(x: number, y: number, snake: Snake): void {
  if (snake.hp > 0) {
    const boom = new Boom(x, y);
    booms.push(boom);
    snake.hp = Math.max(0, snake.hp - config.boomHpLoose);
    draw.drawLeftPanel(ctx, snakes[indexOfSnakeUnderControl]);
  }
  rotateSnakeRight(snake);
}

// Функция контроля столкновений объектов на поле
function collisionControl(): void {
  let flagGameOver = true;

  snakes.forEach((item) => {
    correctElementPosition(item);
    const head = item.elements[0];

    if (item.hp > 0) {
      collisionSnakeWithCoin(item);
      collisionSnakeWithApple(item);
    }

    if ((head.x === config.lBorder || head.x === config.rBorder) && head.vx !== 0) {
      snakeGetBoom(head.x, head.y, item);
    } else if ((head.y === config.tBorder || head.y === config.bBorder) && head.vy !== 0) {
      snakeGetBoom(head.x, head.y, item);
    }
    flagGameOver = flagGameOver && item.hp <= 0;
  });

  if (flagGameOver) gameOver();
}

// Функция движения объектов на поле
function moveObjects(): void {
  const now = window.performance.now();
  let dt = now - last;
  // При текущей реализации в браузере, при неактивном окне рендер останавливается, из-за чего возникает сильный
  // скачок во времени, нарушающий логические процессы. Временно ставлю режим, что большие отрезки времени игнорируются.
  if (dt > 100) dt = 0;

  snakes.forEach((item) => {
    const head = item.elements[0];

    // Голова змеи всегда движется в соответствии со своей скоростью
    head.x += dt * head.vx;
    head.y += dt * head.vy;

    // Скорость головы растет с учетом оставшегося времени
    const now = window.performance.now();
    const pastSeconds = Math.floor((now - mainTimerStart) / 1000);

    if (head.vx !== 0) {
      head.vx =
        Math.sign(head.vx) *
        (config.baseVelocity +
          config.maxVelocityGrowTimes * config.baseVelocity * (pastSeconds / config.wholeSessionTime));
    }

    if (head.vy !== 0) {
      head.vy =
        Math.sign(head.vy) *
        (config.baseVelocity +
          config.maxVelocityGrowTimes * config.baseVelocity * (pastSeconds / config.wholeSessionTime));
    }

    // Скалярная скорость движения змеи
    const v = Math.abs(head.vx + head.vy);

    for (let i = 1; i < item.elements.length; i++) {
      // Каждый следующий элемент меняет свой вектор скорости, в зависимости от того, где находится предыдущий
      const curr = item.elements[i];
      const prev = item.elements[i - 1];
      curr.vx = ((prev.x - curr.x) / config.fieldStep) * v;
      curr.vy = ((prev.y - curr.y) / config.fieldStep) * v;
      curr.x += dt * curr.vx;
      curr.y += dt * curr.vy;
    }
  });
  collisionControl();
  last = now;
}

function onKeyDown(e: KeyboardEvent): void {
  if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
    setSnakeDirection(snakes[indexOfSnakeUnderControl], e.code);
  }
}

// Основной Рендер
function render(): void {
  ctx.clearRect(config.fieldLeft, config.fieldTop, config.fieldWidth, config.fieldHeight);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(128,128,128,0.4)';
  ctx.fillRect(config.fieldLeft, config.fieldTop, config.fieldWidth, config.fieldHeight);
  ctx.closePath();

  moveObjects();
  draw.drawSnakes(ctx, snakes);
  draw.drawCoins(ctx, coins);
  draw.drawBooms(ctx, booms);
  draw.drawApples(ctx, apples);

  if (gameStatus.mode === 'Play') {
    requestAnimationRender = window.requestAnimationFrame(render);
  }
}

// Функция создающая монеты
function coinGenerator(): void {
  const randomX = config.lBorder + Math.random() * (config.rBorder - config.lBorder);
  const randomY = config.tBorder + Math.random() * (config.bBorder - config.tBorder);

  // Вероятностное создание стоимости монеты
  const dice = Math.floor(Math.random() * 100);
  let coinVal = 1;

  if (dice >= 0 && dice < 60) coinVal = 1;
  if (dice >= 60 && dice < 90) coinVal = 3;
  if (dice >= 90 && dice <= 100) coinVal = 5;

  const newCoin = new Coin(randomX, randomY, coinVal);
  coins.push(newCoin);

  const timeForNewCoin = coins.length * 2000;

  if (gameStatus.mode === 'Play') {
    timeoutCoinGenerator = setTimeout(coinGenerator, timeForNewCoin);
  }
}

// Функция создающая яблоки
function appleGenerator(): void {
  const randomX = config.lBorder + Math.random() * (config.rBorder - config.lBorder);
  const randomY = config.tBorder + Math.random() * (config.bBorder - config.tBorder);

  const newApple = new Apple(randomX, randomY);
  apples.push(newApple);

  const timeForNewApple = config.appleCreateTime * 1000;

  if (gameStatus.mode === 'Play') {
    timeoutAppleGenerator = setTimeout(appleGenerator, timeForNewApple);
  }
}

// Функция контроля главного таймера игры
function tick(): void {
  const now = window.performance.now();
  const dt = config.wholeSessionTime - Math.floor((now - mainTimerStart) / 1000);
  ctx.clearRect(config.topPanelLeft, config.topPanelTop, config.topPanelWidth, config.topPanelHeight);

  ctx.textBaseline = 'top';
  ctx.fillStyle = 'rgba(85,39,143,1.0)';
  ctx.font = '96px Impact';
  ctx.textAlign = 'left';
  const showTime = new Date(dt * 1000);
  const stringTime = ('0' + showTime.getMinutes()).slice(-2) + ':' + ('0' + showTime.getSeconds()).slice(-2);
  const measureText = ctx.measureText('05:00').width;
  ctx.fillText(stringTime, config.topPanelLeft + config.topPanelWidth / 2 - measureText / 2, config.topPanelTop);

  draw.drawLeftPanel(ctx, snakes[indexOfSnakeUnderControl]);

  // Если таймер завершился заканчиваем сессию
  if (dt <= 0) {
    gameOver();
  }
}

function profileSnake(userElements: { [k: string]: { [k: string]: string } }) {
  snakes[indexOfSnakeUnderControl].elements.forEach((el, index) => {
    if (index === 0) el.col = userElements.head.color;
    if (index > 0 && index < snakes[indexOfSnakeUnderControl].elements.length - 1) el.col = userElements.body.color;
    if (index === snakes[indexOfSnakeUnderControl].elements.length - 1) el.col = userElements.tail.color;
  });
}

// Функция запуска ядра
function startGame(inContext: CanvasRenderingContext2D, userElements: { [k: string]: { [k: string]: string } }): void {
  ctx = inContext;

  if (snakes.length === 0) {
    const snake1 = new Snake(400, 200, 0.1, 0.0, 100, 'red', 'Smith_123');
    snakes.push(snake1);

    const snake2 = new Snake(700, 400, -0.1, 0.0, 100, 'blue', 'John');
    snakes.push(snake2);

    gameStatus.mode = 'Play';

    mainTimerStart = window.performance.now();
    tick();
    mainTimerId = setInterval(tick, 1000);

    coinGenerator();
    timeoutAppleGenerator = setTimeout(appleGenerator, config.appleCreateTime * 1000);
  }
  profileSnake(userElements);

  draw.drawLeftPanel(ctx, snakes[indexOfSnakeUnderControl]);
  draw.drawRightPanel(ctx, snakes);
  render();
}

document.addEventListener('keydown', onKeyDown);

export { startGame, clearGame };
