// Функция отрисовки правой панели
import config from './constants';
import { Apple, Coin, Snake, Boom, ButtonFullScreen } from './classes';

export const draw = {
  drawRightPanel: drawRightPanel,
  drawLeftPanel: drawLeftPanel,
  drawCoins: drawCoins,
  drawApples: drawApples,
  drawBooms: drawBooms,
  drawSnakes: drawSnakes
};

function drawRightPanel(ctx: CanvasRenderingContext2D, snakes: Snake[]): void {
  ctx.clearRect(config.rightPanelLeft, config.rightPanelTop, config.rightPanelWidth, config.rightPanelHeight);

  ctx.beginPath();
  ctx.fillStyle = 'rgba(139,179,317,0.5)';
  ctx.fillRect(config.rightPanelLeft, config.rightPanelTop, config.rightPanelWidth, config.rightPanelHeight);
  ctx.closePath();

  ctx.textBaseline = 'top';
  ctx.fillStyle = 'rgba(0,0,0,1.0)';
  ctx.font = '24px Impact';

  let textTop = config.rightPanelTop + 10;
  snakes.forEach((item) => {
    ctx.textAlign = 'left';
    ctx.fillText(item.name, config.rightPanelLeft + 5, textTop);
    ctx.textAlign = 'right';
    ctx.fillText(item.score.toString(), config.rightPanelLeft + config.rightPanelWidth - 5, textTop);
    textTop += 30;
  });
}

// Функция отрисовки левой панели
function drawLeftPanel(ctx: CanvasRenderingContext2D, snake: Snake): void {
  ctx.clearRect(config.leftPanelLeft, config.leftPanelTop, config.leftPanelWidth, config.leftPanelHeight);

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

  const head = snake.elements[0];
  textTop += 30;
  const v = Math.round(Math.abs(head.vx + head.vy) * 100);
  ctx.textAlign = 'left';
  ctx.fillText('Скорость:', config.leftPanelLeft + 5, textTop);
  ctx.textAlign = 'right';
  ctx.fillText(v.toString(), config.leftPanelLeft + config.leftPanelWidth - 5, textTop);

  const btnFullScreen = new ButtonFullScreen();
  ctx.drawImage(
    btnFullScreen.image,
    config.leftPanelLeft + config.leftPanelWidth / 2 - 25,
    config.leftPanelHeight - 50
  );
}

// Функция отрисовки монет
function drawCoins(ctx: CanvasRenderingContext2D, coins: Coin[]): void {
  coins.forEach((el) => {
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
  });
}

// Функция отрисовки яблок
function drawApples(ctx: CanvasRenderingContext2D, apples: Apple[]): void {
  apples.forEach((el) => {
    ctx.drawImage(el.image, el.x - config.fieldStep / 2, el.y - config.fieldStep / 2);
  });
}

// Функция отрисовки взрывов
function drawBooms(ctx: CanvasRenderingContext2D, booms: Boom[]): void {
  booms.forEach((el) => {
    el.phase++;
    ctx.save();
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
  });

  for (let i = booms.length - 1; i >= 0; i--) {
    if (booms[i].phase >= 100) {
      booms.splice(i, 1);
    }
  }
}

// Функция отрисовки змей
function drawSnakes(ctx: CanvasRenderingContext2D, snakes: Snake[]): void {
  snakes.forEach((item) => {
    item.elements.forEach((el) => {
      ctx.beginPath();
      ctx.arc(el.x, el.y, el.r, 0, 2 * Math.PI);

      if (item.hp > 0) {
        ctx.fillStyle = el.col;
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
      }

      ctx.fill();
      ctx.closePath();
    });
  });
}
