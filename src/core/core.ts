import { Snake, Coin, Boom, Circle, Apple } from './classes';
import config from './constants';

let last = window.performance.now();
let mainTimerId: number;
let mainTimerStart: number;
let ctx: CanvasRenderingContext2D;
const gameStatus = { mode: 'Play' };
const Snakes: Snake[] = [];
const Coins: Coin[] = [];
const Booms: Boom[] = [];
const Apples: Apple[] = [];
const indexOfSnakeUnderControl = 0;

// Функция окончания игры
function GameOver(): void {
  clearInterval(mainTimerId);
  gameStatus.mode = 'End';

  ctx.textBaseline = 'top';
  ctx.fillStyle = 'rgba(255,0,0,1.0)';
  ctx.font = '96px Impact';
  ctx.textAlign = 'center';
  ctx.clearRect(config.topPanelLeft, config.topPanelTop, config.topPanelWidth, config.topPanelHeight);
  ctx.fillText('Игра окончена', config.fieldLeft + config.fieldWidth / 2, 0, config.fieldWidth);
}

// Функция отрисовки правой панели
function DrawRightPanel(): void {
  ctx.clearRect(config.rightPanelLeft, config.rightPanelTop, config.rightPanelWidth, config.rightPanelHeight);

  ctx.beginPath();
  ctx.fillStyle = 'rgba(139,179,317,0.5)';
  ctx.fillRect(config.rightPanelLeft, config.rightPanelTop, config.rightPanelWidth, config.rightPanelHeight);
  ctx.closePath();

  ctx.textBaseline = 'top';
  let textTop = config.rightPanelTop + 10;
  Snakes.map(function (item) {
    ctx.fillStyle = 'rgba(0,0,0,1.0)';
    ctx.font = '24px Impact';
    ctx.textAlign = 'left';
    ctx.fillText(item.name, config.rightPanelLeft + 5, textTop);
    ctx.textAlign = 'right';
    ctx.fillText(item.score.toString(), config.rightPanelLeft + config.rightPanelWidth - 5, textTop);

    textTop += 30;
    return null;
  });
}

// Функция отрисовки левой панели
function DrawLeftPanel(): void {
  ctx.clearRect(config.leftPanelLeft, config.leftPanelTop, config.leftPanelWidth, config.leftPanelHeight);

  const snake = Snakes[indexOfSnakeUnderControl];

  ctx.beginPath();
  ctx.fillStyle = 'rgba(139,179,317,0.5)';
  ctx.fillRect(config.leftPanelLeft, config.leftPanelTop, config.leftPanelWidth, config.leftPanelHeight);
  ctx.closePath();

  ctx.textBaseline = 'top';
  let textTop = config.leftPanelTop + 10;
  ctx.fillStyle = 'rgba(0,0,0,1.0)';
  ctx.font = '24px Impact';

  ctx.textAlign = 'left';
  ctx.fillText('Здоровье:', config.leftPanelLeft + 5, textTop);
  ctx.textAlign = 'right';
  ctx.fillText(snake.hp.toString(), config.leftPanelLeft + config.leftPanelWidth - 5, textTop);

  textTop += 30;
  ctx.textAlign = 'left';
  ctx.fillText('Очки:', config.leftPanelLeft + 5, textTop);
  ctx.textAlign = 'right';
  ctx.fillText(snake.score.toString(), config.leftPanelLeft + config.leftPanelWidth - 5, textTop);

  const head = snake.Elements[0];
  textTop += 30;
  const v = Math.round(Math.abs(head.vx + head.vy) * 100);
  ctx.textAlign = 'left';
  ctx.fillText('Скорость:', config.leftPanelLeft + 5, textTop);
  ctx.textAlign = 'right';
  ctx.fillText(v.toString(), config.leftPanelLeft + config.leftPanelWidth - 5, textTop);
}

// Функция устанавливающая направление движения змеи
function SetSnakeDirection(snake: Snake, direction: string): void {
  const head = snake.Elements[0];
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
function RotateSnakeRight(snake: Snake): void {
  const head = snake.Elements[0];
  if (head.vy === 0) {
    head.vy = head.vx;
    head.vx = 0;
  } else {
    head.vx = -1 * head.vy;
    head.vy = 0;
  }
}

// Корректировка выхода объектов за границы поля
function CorrectElementPosition(snake: Snake): void {
  snake.Elements.map(function (el) {
    el.x = Math.max(config.LBorder, el.x);
    el.x = Math.min(config.RBorder, el.x);
    el.y = Math.max(config.TBorder, el.y);
    el.y = Math.min(config.BBorder, el.y);
    return null;
  });
}

// Функция подбирания змеёй монеты
function SnakeGetCoin(snake: Snake, coin: Coin, index: number): void {
  snake.score += coin.value;
  Coins.splice(index, 1);
  const baseEl = snake.Elements[1];

  for (let i = 1; i <= coin.value; i++) {
    const newElement: Circle = { x: baseEl.x, y: baseEl.y, vx: baseEl.vx, vy: baseEl.vy, col: baseEl.col, r: baseEl.r };
    snake.Elements.splice(1, 0, newElement);
  }

  DrawRightPanel();
  DrawLeftPanel();
}

// Функция контроля столкновения змеи с монетой
function CollisionSnakeWithCoin(snake: Snake): void {
  const head = snake.Elements[0];
  for (let i = 0; i < Coins.length; i++) {
    const coin = Coins[i];
    const dx = head.x - coin.x;
    const dy = head.y - coin.y;
    const r = Math.sqrt(dx ** 2 + dy ** 2);
    if (r < config.fieldStep) {
      SnakeGetCoin(snake, coin, i);
    }
  }
}

// Функция подбирания змеёй монеты
function SnakeGetApple(snake: Snake, apple: Apple, index: number): void {
  snake.hp = Math.min(100, snake.hp + 10);
  Apples.splice(index, 1);
  DrawLeftPanel();
}

// Функция контроля столкновения змеи с яблоком
function CollisionSnakeWithApple(snake: Snake): void {
  const head = snake.Elements[0];
  for (let i = 0; i < Apples.length; i++) {
    const apple = Apples[i];
    const dx = head.x - apple.x;
    const dy = head.y - apple.y;
    const r = Math.sqrt(dx ** 2 + dy ** 2);
    if (r < config.fieldStep) {
      SnakeGetApple(snake, apple, i);
    }
  }
}

// Функция удара змеи обо что-либо
function SnakeGetBoom(x: number, y: number, snake: Snake): void {
  if (snake.hp > 0) {
    const boom = new Boom(x, y);
    Booms.push(boom);
    snake.hp = Math.max(0, snake.hp - config.boomHpLoose);
    DrawLeftPanel();
  }
  RotateSnakeRight(snake);
}

// Функция контроля столкновений объектов на поле
function CollisionControl(): void {
  let flagGameOver = true;

  Snakes.map(function (item) {
    CorrectElementPosition(item);
    const head = item.Elements[0];

    if (item.hp > 0) {
      CollisionSnakeWithCoin(item);
      CollisionSnakeWithApple(item);
    }

    if ((head.x === config.LBorder || head.x === config.RBorder) && head.vx !== 0) {
      SnakeGetBoom(head.x, head.y, item);
    } else if ((head.y === config.TBorder || head.y === config.BBorder) && head.vy !== 0) {
      SnakeGetBoom(head.x, head.y, item);
    }
    flagGameOver = flagGameOver && item.hp <= 0;
    return null;
  });

  if (flagGameOver) GameOver();
}

// Функция движения объектов на поле
function MoveObjects(): void {
  const now = window.performance.now();
  let dt = now - last;
  // При текущей реализации в браузере, при неактивном окне рендер останавливается, из-за чего возникает сильный
  // скачок во времени, нарушающий логические процессы. Временно ставлю режим, что большие отрезки времени игнорируются.
  if (dt > 100) dt = 0;

  Snakes.map(function (item) {
    const head = item.Elements[0];

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

    for (let i = 1; i < item.Elements.length; i++) {
      // Каждый следующий элемент меняет свой вектор скорости, в зависимости от того, где находится предыдущий
      const curr = item.Elements[i];
      const prev = item.Elements[i - 1];
      curr.vx = ((prev.x - curr.x) / config.fieldStep) * v;
      curr.vy = ((prev.y - curr.y) / config.fieldStep) * v;
      curr.x += dt * curr.vx;
      curr.y += dt * curr.vy;
    }
    return null;
  });
  CollisionControl();
  last = now;
}

function OKD(e: KeyboardEvent): void {
  if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
    SetSnakeDirection(Snakes[indexOfSnakeUnderControl], e.code);
  }
}

// Функция отрисовки монет
function DrawCoins(): void {
  Coins.map(function (el) {
    el.phase++;
    ctx.save();
    ctx.translate(el.x, el.y);
    ctx.scale(Math.sin(el.phase / 40), 1);

    ctx.beginPath();
    ctx.arc(0, 0, config.fieldStep / 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = 'black';
    ctx.font = Math.floor(config.fieldStep * 0.75).toString() + 'px Impact';
    ctx.strokeText(el.value.toString(), 0, 0);

    ctx.restore();
    return null;
  });
}

// Функция отрисовки яблок
function DrawApples(): void {
  Apples.map(function (el) {
    /*
    ctx.beginPath();
    ctx.arc(el.x, el.y, config.fieldStep / 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255,0,0,0.8)';
    ctx.fill();
    ctx.closePath();
    */
    ctx.drawImage(el.image, el.x - config.fieldStep / 2, el.y - config.fieldStep / 2);

    return null;
  });
}

// Функция отрисовки взрывов
function DrawBooms(): void {
  Booms.map(function (el) {
    el.phase++;
    ctx.save();
    ctx.beginPath();
    ctx.rect(config.fieldLeft, config.fieldTop, config.fieldWidth, config.fieldHeight);
    ctx.clip();

    for (let i = 1; i <= 10; i++) {
      ctx.beginPath();
      ctx.arc(el.x, el.y, el.phase / Math.log10(i), 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(255,0,0,${(100 - el.phase) / 100})`;
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();

    return null;
  });
  for (let i = Booms.length - 1; i >= 0; i--) {
    if (Booms[i].phase >= 100) {
      Booms.splice(i, 1);
    }
  }
}

// Функция отрисовки змей
function DrawSnakes(): void {
  Snakes.map(function (item) {
    item.Elements.map(function (el) {
      ctx.beginPath();
      ctx.arc(el.x, el.y, el.r, 0, 2 * Math.PI);

      if (item.hp > 0) {
        ctx.fillStyle = el.col;
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
      }

      ctx.fill();
      ctx.closePath();
      return null;
    });
    return null;
  });
}

// Основной Рендер
function Render(): void {
  ctx.clearRect(config.fieldLeft, config.fieldTop, config.fieldWidth, config.fieldHeight);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(128,128,128,0.4)';
  ctx.fillRect(config.fieldLeft, config.fieldTop, config.fieldWidth, config.fieldHeight);
  ctx.closePath();

  MoveObjects();
  DrawSnakes();
  DrawCoins();
  DrawBooms();
  DrawApples();

  if (gameStatus.mode === 'Play') {
    window.requestAnimationFrame(Render);
  }
}

// Функция создающая монеты
function CoinGenerator(): void {
  const randomX = config.LBorder + Math.random() * (config.RBorder - config.LBorder);
  const randomY = config.TBorder + Math.random() * (config.BBorder - config.TBorder);

  // Вероятностное создание стоимости монеты
  const dice = Math.floor(Math.random() * 100);
  let coinVal = 1;
  if (dice >= 0 && dice < 60) coinVal = 1;
  if (dice >= 60 && dice < 90) coinVal = 3;
  if (dice >= 90 && dice <= 100) coinVal = 5;

  const newCoin = new Coin(randomX, randomY, coinVal);
  Coins.push(newCoin);

  const timeForNewCoin = Coins.length * 2000;

  if (gameStatus.mode === 'Play') {
    setTimeout(CoinGenerator, timeForNewCoin);
  }
}

// Функция создающая яблоки
function AppleGenerator(): void {
  const randomX = config.LBorder + Math.random() * (config.RBorder - config.LBorder);
  const randomY = config.TBorder + Math.random() * (config.BBorder - config.TBorder);

  const newApple = new Apple(randomX, randomY);
  Apples.push(newApple);

  const timeForNewApple = config.appleCreateTime * 1000;

  if (gameStatus.mode === 'Play') {
    setTimeout(AppleGenerator, timeForNewApple);
  }
}

// Функция контроля главного таймера игры
function Tick(): void {
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

  DrawLeftPanel();

  // Если таймер завершился заканчиваем сессию
  if (dt <= 0) {
    GameOver();
  }
}

// Функция запуска ядра
function StartGame(inContext: CanvasRenderingContext2D): void {
  const snake1 = new Snake(400, 200, 0.1, 0.0, 100, 'red', 'Smith_123');
  Snakes.push(snake1);

  const snake2 = new Snake(700, 400, -0.1, 0.0, 100, 'blue', 'John');
  Snakes.push(snake2);

  ctx = inContext;
  gameStatus.mode = 'Play';

  mainTimerStart = window.performance.now();
  Tick();
  mainTimerId = setInterval(Tick, 1000);

  DrawLeftPanel();
  DrawRightPanel();
  CoinGenerator();
  setTimeout(AppleGenerator, config.appleCreateTime * 1000);
  Render();
}

document.addEventListener('keydown', OKD);

export { StartGame };
