import config from './constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import appleSource from '../assets/apple2.png';
const appleImage = new Image(20, 20);
appleImage.src = appleSource;

export type Circle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  col: string;
};

class Snake {
  public Elements: Circle[] = [];
  public hp = 0;
  public name = '';
  public score = 0;

  constructor(x: number, y: number, vx: number, vy: number, hp: number, col: string, name: string) {
    this.hp = hp;
    this.name = name;
    this.Elements = [];
    const r = config.fieldStep / 2;
    // Логическая защита. Змея можем двигаться только по одной из осей
    if (vx !== 0) vy = 0;

    // Создаем голову змеи. Это круг с переданными координатами и скоростями
    const el: Circle = { x: x, y: y, vx: vx, vy: vy, r: r, col: col };
    this.Elements.push(el);

    // Создаем туловище и хвост змеи. Это круги, смещенные относительно головы в зависимости от текущей скорости.
    // Элементы туловища на 2 пикселя меньше головы, а хвост еще на 2.
    const dx = vx === 0 ? 0 : (Math.abs(vx) / vx) * config.fieldStep;
    const dy = vy === 0 ? 0 : (Math.abs(vy) / vy) * config.fieldStep;
    for (let i = 1; i < config.defaultSnakeLength; i++) {
      const r2 = i < config.defaultSnakeLength - 1 ? Math.round(r * 0.8) : Math.round(r * 0.7);
      x -= dx;
      y -= dy;
      const el: Circle = { x: x, y: y, vx: vx, vy: vy, r: r2, col: col };
      this.Elements.push(el);
    }
  }
}

class Coin {
  public x: number;
  public y: number;
  public value: number;
  public phase = 0;

  constructor(x: number, y: number, value: number) {
    this.x = x;
    this.y = y;
    this.value = value;
  }
}

class Boom {
  public x: number;
  public y: number;
  public phase = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Apple {
  public x: number;
  public y: number;
  public image: CanvasImageSource;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.image = appleImage;
  }
}

export { Snake, Coin, Boom, Apple };
