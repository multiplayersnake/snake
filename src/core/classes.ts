import config from './constants';
import appleSource from '../assets/images/apple2.png';
import btnFullScreenSource from '../assets/images/fullscreen.png';
import emblemSource from '../assets/images/emblem.png';

const appleImage = new Image(20, 20);
appleImage.src = appleSource;

const emblemImage = new Image(40, 40);
emblemImage.src = emblemSource;

const btnFullScreenImage = new Image(50, 50);
btnFullScreenImage.src = btnFullScreenSource;

export type Circle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  col: string;
  id: string;
  isShadow?: boolean;
};

class Snake {
  public elements: Circle[] = [];
  public hp = 0;
  public name = '';
  public score = 0;
  public id = '';

  constructor(x: number, y: number, vx: number, vy: number, hp: number, col: string, name: string, id: string) {
    this.hp = hp;
    this.id = id;
    this.name = name;
    this.elements = [];
    const r = config.fieldStep / 2;
    // Логическая защита. Змея может двигаться только по одной из осей
    if (vx !== 0) vy = 0;

    // Создаем голову змеи. Это круг с переданными координатами и скоростями
    const el: Circle = { x: x, y: y, vx: vx, vy: vy, r: r, col: col, id: `${id}_0` };
    this.elements.push(el);

    // Создаем туловище и хвост змеи. Это круги, смещенные относительно головы в зависимости от текущей скорости.
    // Элементы туловища на 2 пикселя меньше головы, а хвост еще на 2.
    const dx = vx === 0 ? 0 : (Math.abs(vx) / vx) * config.fieldStep;
    const dy = vy === 0 ? 0 : (Math.abs(vy) / vy) * config.fieldStep;

    for (let i = 1; i < config.defaultSnakeLength; i++) {
      const r2 = i < config.defaultSnakeLength - 1 ? Math.round(r * 0.8) : Math.round(r * 0.7);
      x -= dx;
      y -= dy;
      const el: Circle = { x: x, y: y, vx: vx, vy: vy, r: r2, col: col, id: `${id}_${i}` };
      this.elements.push(el);
    }
  }
}

class Coin {
  public x: number;
  public y: number;
  public value: number;
  public phase = 0;
  public id = '';
  public image: CanvasImageSource;

  constructor(x: number, y: number, value: number, id: string) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.value = value;
    this.image = emblemImage;
  }
}

class Boom {
  public x: number;
  public y: number;
  public phase = 0;
  public id: string;

  constructor(x: number, y: number, id: string) {
    this.x = x;
    this.y = y;
    this.id = id;
  }
}

class Apple {
  public x: number;
  public y: number;
  public image: CanvasImageSource;
  public id = '';

  constructor(x: number, y: number, id: string) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.image = appleImage;
  }
}

export { Snake, Coin, Boom, Apple };
