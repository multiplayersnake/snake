import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { Snake, Coin, Boom, Circle, Apple } from './classes';
import { draw } from './draw';
import config from './constants';
import appleModel from '../assets/3d/apple.fbx';

import groundImg from '../assets/images/ground.jpg';
import backImg from '../assets/images/gameback.jpg';

import btnFullScreenSource from '../assets/images/fullscreen.png';
import btnPauseSource from '../assets/images/pause.png';
import btnExitSource from '../assets/images/exit.png';

import level0Source from '../assets/images/level_0.png';
import level1Source from '../assets/images/level_1.png';
import level2Source from '../assets/images/level_2.png';
import level3Source from '../assets/images/level_3.png';

import sndBoom from '../assets/sound/boom.mp3';
import sndCoin from '../assets/sound/coin.mp3';
import sndApple from '../assets/sound/apple.mp3';

import mscMain1 from '../assets/sound/fight1.mp3';
import mscMain2 from '../assets/sound/fight2.mp3';
import mscMain3 from '../assets/sound/fight3.mp3';
import mscMain4 from '../assets/sound/fight4.mp3';

// Игровые параметры уровня сложности
let defaultSnakeLength = 4;
let wholeSessionTime = 300;
let baseVelocity = 0.1;
let maxVelocityGrowTimes = 3;
let boomHpLoose = 20;
let awardsCount = 1;
let coinsPower = 1;
let selfIntersection = true;
let appleHealValue = 10;
let appleCreateTime = 20;

const imgLevelSources = [level0Source, level1Source, level2Source, level3Source];

let currentTrackIndex: number;
const musicTracks = [
  { track: mscMain1, volume: 0.7 },
  { track: mscMain2, volume: 0.5 },
  { track: mscMain3, volume: 0.5 },
  { track: mscMain4, volume: 0.5 }
];

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let camera: THREE.Camera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;

const musicListener = new THREE.AudioListener();
const musicSound = new THREE.Audio(musicListener);
const musicAudioLoader = new THREE.AudioLoader();
musicSound.onEnded = changeMusicTrack;

const timerPanel = document.createElement('canvas');
timerPanel.width = config.topPanelWidth;
timerPanel.height = config.topPanelHeight;
const timerPanelMaterial = new THREE.MeshPhongMaterial({ transparent: true, opacity: 1 });

const leftPanel = document.createElement('canvas');
leftPanel.width = config.leftPanelWidth;
leftPanel.height = config.leftPanelHeight;
const leftPanelMaterial = new THREE.MeshPhongMaterial({ transparent: true, opacity: 1 });

const rightPanel = document.createElement('canvas');
rightPanel.width = config.rightPanelWidth;
rightPanel.height = config.rightPanelHeight;
const rightPanelMaterial = new THREE.MeshPhongMaterial({ transparent: false, opacity: 1 });

let last = window.performance.now();
let mainTimerId: number;
let mainTimerStart: number;
let mainTimerStartPause: number;
let timeoutCoinGenerator: number;
let timeoutAppleGenerator: number;
let requestAnimationRender: number;
let endFunction: (time: string, isVictory: boolean, place: number, coins: number, awards: number) => void;
let isVictory = false;
let exitFunction: () => void;

let mainCanvas: HTMLCanvasElement;
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
  musicSound.stop();
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
  const coins = isVictory ? snakes[indexOfSnakeUnderControl].score : 0;
  const awards = isVictory ? awardsCount : 0;

  const now = window.performance.now();
  const dt = Math.floor((now - mainTimerStart) / 1000);
  const showTime = new Date(dt * 1000);
  const stringTime = ('0' + showTime.getMinutes()).slice(-2) + ':' + ('0' + showTime.getSeconds()).slice(-2);

  endFunction(stringTime, isVictory, 1, coins, awards);
}

function gameFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    mainCanvas.requestFullscreen();
  }
}

function gameExit() {
  if (gameStatus.mode === 'Play') gamePause();
  if (document.fullscreenElement) document.exitFullscreen();
  exitFunction();
}

function gamePause(): void {
  if (gameStatus.mode === 'Play') {
    gameStatus.mode = 'Pause';
    clearInterval(mainTimerId);
    clearTimeout(timeoutCoinGenerator);
    clearTimeout(timeoutAppleGenerator);
    mainTimerStartPause = window.performance.now();
  } else if (gameStatus.mode === 'Pause') {
    mainTimerStart += window.performance.now() - mainTimerStartPause;
    gameStatus.mode = 'Play';
    tick();
    mainTimerId = window.setInterval(tick, 1000);
    timeoutAppleGenerator = window.setTimeout(appleGenerator, appleCreateTime * 1000);
    const timeForNewCoin = coins.length * 2000;
    timeoutCoinGenerator = window.setTimeout(coinGenerator, timeForNewCoin);
  }
}

// Функция устанавливающая направление движения змеи
function setSnakeDirection(snake: Snake, direction: string): void {
  const head = snake.elements[0];
  // Скалярная скорость движения змеи
  const v = Math.abs(head.vx + head.vy);

  switch (direction) {
    case 'ArrowUp':
      if (!selfIntersection || head.vy === 0) {
        head.vy = -v;
        head.vx = 0;
      }
      break;
    case 'ArrowDown':
      if (!selfIntersection || head.vy === 0) {
        head.vy = v;
        head.vx = 0;
      }
      break;
    case 'ArrowLeft':
      if (!selfIntersection || head.vx === 0) {
        head.vy = 0;
        head.vx = -v;
      }
      break;
    case 'ArrowRight':
      if (!selfIntersection || head.vx === 0) {
        head.vy = 0;
        head.vx = v;
      }
      break;
  }
}

// Функция поворота змеи по часовой стрелке
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
  snake.score += coin.value * coinsPower;
  coins.splice(index, 1);
  const baseEl = snake.elements[2];

  for (let i = 1; i <= coin.value; i++) {
    const newElement: Circle = {
      x: baseEl.x,
      y: baseEl.y,
      vx: baseEl.vx,
      vy: baseEl.vy,
      col: baseEl.col,
      r: baseEl.r,
      id: `${snake.id}_${snake.elements.length}`
    };
    snake.elements.splice(2, 0, newElement);
    scene.remove(scene.getObjectByName(coin.id));
    playSound(sndCoin);
  }

  draw.drawLeftPanel(leftPanel.getContext('2d'), leftPanelMaterial, snakes[indexOfSnakeUnderControl]);
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

// Функция контроля столкновения змеи с собой
function collisionSnakeWithSelf(snake: Snake): void {
  const head = snake.elements[0];

  for (let i = 3; i < snake.elements.length; i++) {
    const elm = snake.elements[i];
    const dx = head.x - elm.x;
    const dy = head.y - elm.y;
    const r = Math.sqrt(dx ** 2 + dy ** 2);
    if (r < head.r + elm.r) {
      head.x -= head.dx;
      head.y -= head.dy;
      snakeGetSelf(snake, elm, i);
    }
  }
}

// Функция столкновения змеи с собой
function snakeGetSelf(snake: Snake, elm: Circle, index: number): void {
  const head = snake.elements[0];
  // Это элемент, в сторону которого не нужно поворачивать.
  const controlElement = snake.elements[index - 1];

  if (snake.hp > 0) {
    if (head.vx === 0) {
      head.vx = Math.sign(head.x - controlElement.x) * Math.abs(head.vy);
      head.vy = 0;
    } else {
      head.vy = Math.sign(head.y - controlElement.y) * Math.abs(head.vx);
      head.vx = 0;
    }
    const boom_x = (head.x + elm.x) / 2;
    const boom_y = (head.y + elm.y) / 2;
    const boom = new Boom(boom_x, boom_y, `boom_${Math.ceil(Math.random() * 10000)}`);
    booms.push(boom);
    snake.hp = Math.max(0, snake.hp - boomHpLoose);
  }
}

// Функция подбирания змеёй монеты
function snakeGetApple(snake: Snake, apple: Apple, index: number): void {
  snake.hp = Math.min(100, snake.hp + appleHealValue);
  apples.splice(index, 1);
  scene.remove(scene.getObjectByName(apple.id));
  draw.drawLeftPanel(leftPanel.getContext('2d'), leftPanelMaterial, snakes[indexOfSnakeUnderControl]);
  playSound(sndApple);
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

function playSound(srcSound: string) {
  const listener = new THREE.AudioListener();
  const sound = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load(srcSound, function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(false);
    sound.setVolume(0.5);
    sound.play();
  });
}

// Функция удара змеи обо что-либо
function snakeGetBoom(x: number, y: number, snake: Snake): void {
  if (snake.hp > 0) {
    const boom = new Boom(x, y, `boom_${Math.ceil(Math.random() * 10000)}`);
    booms.push(boom);
    snake.hp = Math.max(0, snake.hp - boomHpLoose);
    draw.drawLeftPanel(leftPanel.getContext('2d'), leftPanelMaterial, snakes[indexOfSnakeUnderControl]);

    playSound(sndBoom);
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
      if (selfIntersection) collisionSnakeWithSelf(item);
    }

    if ((head.x === config.lBorder || head.x === config.rBorder) && head.vx !== 0) {
      snakeGetBoom(head.x, head.y, item);
    } else if ((head.y === config.tBorder || head.y === config.bBorder) && head.vy !== 0) {
      snakeGetBoom(head.x, head.y, item);
    }
    flagGameOver = flagGameOver && item.hp <= 0;
  });

  if (flagGameOver) {
    isVictory = false;
    gameOver();
  }
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
    head.dx = dt * head.vx;
    head.dy = dt * head.vy;
    head.x += head.dx;
    head.y += head.dy;

    // Скорость головы растет с учетом оставшегося времени
    const now = window.performance.now();
    const pastSeconds = Math.floor((now - mainTimerStart) / 1000);

    if (head.vx !== 0) {
      head.vx =
        Math.sign(head.vx) * (baseVelocity + maxVelocityGrowTimes * baseVelocity * (pastSeconds / wholeSessionTime));
    }

    if (head.vy !== 0) {
      head.vy =
        Math.sign(head.vy) * (baseVelocity + maxVelocityGrowTimes * baseVelocity * (pastSeconds / wholeSessionTime));
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
  if (e.code === 'KeyP') gamePause();
  if (e.code === 'KeyF') gameFullScreen();
  if (e.code === 'KeyE') gameExit();
}

// Основной Рендер
function render(): void {
  if (gameStatus.mode === 'Play') {
    moveObjects();
  }
  const k = 1 + Math.sin((window.performance.now() - mainTimerStart) / 500) / 8;
  scene.getObjectByName('btnFullScreen')?.scale.set(k, k, k);
  scene.getObjectByName('btnExit')?.scale.set(k, k, k);
  scene.getObjectByName('btnPause')?.scale.set(k, k, k);

  draw.drawSnakes(scene, snakes);
  draw.drawCoins(scene, coins);
  draw.drawBooms(scene, booms);
  draw.drawApples(scene, apples);

  if (gameStatus.mode === 'Pause') {
    draw.drawTimerPanel(timerPanel.getContext('2d'), timerPanelMaterial, 'ПАУЗА');
  }

  if (gameStatus.mode === 'Play' || gameStatus.mode === 'Pause') {
    renderer.render(scene, camera);
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

  const id = `coin_${Math.ceil(Math.random() * 10000)}`;
  const newCoin = new Coin(randomX, randomY, coinVal, id);

  const coinCanvas = document.createElement('canvas');
  coinCanvas.width = 40;
  coinCanvas.height = 40;
  ctx = coinCanvas.getContext('2d');
  ctx.drawImage(newCoin.image, 0, 0);
  ctx.fillStyle = 'rgba(0,0,0,1.0)';
  ctx.font = '28px Impact';
  ctx.fillText(coinVal.toString(), 13, 30);
  const frontTexture = new THREE.Texture(coinCanvas);
  frontTexture.needsUpdate = true;

  const backCanvas = document.createElement('canvas');
  backCanvas.width = 40;
  backCanvas.height = 40;
  ctx = backCanvas.getContext('2d');
  ctx.rotate(180 * (Math.PI / 180));
  ctx.drawImage(newCoin.image, -40, -40);
  const backTexture = new THREE.Texture(backCanvas);
  backTexture.needsUpdate = true;

  const materials = [
    new THREE.MeshPhongMaterial({ color: 'rgb(237, 237, 37)', emissive: 0x222222 }),
    new THREE.MeshPhongMaterial({
      map: frontTexture,
      bumpMap: frontTexture,
      bumpScale: -2
    }),
    new THREE.MeshPhongMaterial({
      map: backTexture,
      bumpMap: backTexture,
      bumpScale: -2
    })
  ];
  const coinGeometry = new THREE.CylinderGeometry(15, 15, 5, 16);
  const coin = new THREE.Mesh(coinGeometry, materials);
  coin.castShadow = true;
  coin.name = id;
  coin.position.set(randomX, 15, randomY);
  coin.rotateZ(Math.PI / 2);
  scene.add(coin);
  coins.push(newCoin);

  const timeForNewCoin = coins.length * 2000;

  if (gameStatus.mode === 'Play') {
    timeoutCoinGenerator = window.setTimeout(coinGenerator, timeForNewCoin);
  }
}

// Функция создающая яблоки
function appleGenerator(): void {
  const randomX = config.lBorder + Math.random() * (config.rBorder - config.lBorder);
  const randomY = config.tBorder + Math.random() * (config.bBorder - config.tBorder);
  const id = `apple_${Math.ceil(Math.random() * 10000)}`;

  const newApple = new Apple(randomX, randomY, id);
  apples.push(newApple);
  const fbxLoader = new FBXLoader();
  fbxLoader.load(appleModel, (object) => {
    const appleBodyMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(255,0,0)', emissive: 0x222222 });
    const appleTailMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(91,74,32)', emissive: 0x222222 });
    object.children[0].castShadow = true;
    (object.children[0] as THREE.Mesh).material = appleBodyMaterial;
    object.children[1].castShadow = true;
    (object.children[1] as THREE.Mesh).material = appleTailMaterial;
    object.name = id;
    object.scale.set(0.8, 0.8, 0.8);
    object.position.set(randomX, 15, randomY);
    object.rotateX(Math.PI / -2);
    scene.add(object);
  });

  const timeForNewApple = appleCreateTime * 1000;

  if (gameStatus.mode === 'Play') {
    timeoutAppleGenerator = window.setTimeout(appleGenerator, timeForNewApple);
  }
}

function changeMusicTrack() {
  if (currentTrackIndex < musicTracks.length - 1) currentTrackIndex++;
  if (musicSound.isPlaying) musicSound.stop();
  musicAudioLoader.load(musicTracks[currentTrackIndex].track, function (buffer) {
    musicSound.setBuffer(buffer);
    musicSound.setLoop(false);
    musicSound.setVolume(musicTracks[currentTrackIndex].volume);
    musicSound.play();
  });
}

// Функция контроля главного таймера игры
function tick(): void {
  const now = window.performance.now();
  const dt = wholeSessionTime - Math.floor((now - mainTimerStart) / 1000);
  const showTime = new Date(dt * 1000);
  const stringTime = ('0' + showTime.getMinutes()).slice(-2) + ':' + ('0' + showTime.getSeconds()).slice(-2);

  draw.drawTimerPanel(timerPanel.getContext('2d'), timerPanelMaterial, stringTime);
  draw.drawLeftPanel(leftPanel.getContext('2d'), leftPanelMaterial, snakes[indexOfSnakeUnderControl]);

  // Если таймер завершился заканчиваем сессию
  if (dt <= 0) {
    isVictory = true;
    gameOver();
  }
}

function profileSnake(userElements: { [k: string]: { [k: string]: string } }) {
  snakes[indexOfSnakeUnderControl].name = userElements.base.name;
  snakes[indexOfSnakeUnderControl].elements.forEach((el, index) => {
    if (index === 0) el.col = userElements.head.color;
    if (index > 0 && index < snakes[indexOfSnakeUnderControl].elements.length - 1) el.col = userElements.body.color;
    if (index === snakes[indexOfSnakeUnderControl].elements.length - 1) el.col = userElements.tail.color;
  });
}

function onClick() {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.name === 'btnFullScreen') {
      gameFullScreen();
    }
    if (intersects[i].object.name === 'btnPause') {
      gamePause();
    }
    if (intersects[i].object.name === 'btnExit') {
      gameExit();
    }
  }
}

function onPointerMove(event: MouseEvent) {
  // Размер реального игрового поля 1000 х 600. В режиме полного экрана пропорции нарушаются.

  //Если на максимум развернута ширина игрового поля
  if (mainCanvas.clientWidth / mainCanvas.clientHeight <= 1000 / 600) {
    pointer.x = (event.offsetX / mainCanvas.clientWidth) * 2 - 1;
    const height = (mainCanvas.clientWidth / 1000) * 600;
    const paddingTop = (mainCanvas.clientHeight - height) / 2;
    pointer.y = (-(event.offsetY - paddingTop) / height) * 2 + 1;
  } else {
    pointer.y = -(event.offsetY / mainCanvas.clientHeight) * 2 + 1;
    const width = (mainCanvas.clientHeight / 600) * 1000;
    const paddingLeft = (mainCanvas.clientWidth - width) / 2;
    pointer.x = ((event.offsetX - paddingLeft) / width) * 2 - 1;
  }

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects[0]) {
    if (intersects[0].object.name.substring(0, 3) === 'btn') {
      mainCanvas.style.cursor = 'pointer';
    } else {
      mainCanvas.style.cursor = 'default';
    }
  } else {
    mainCanvas.style.cursor = 'default';
  }
}

// Функция запуска ядра
function gameStart(
  inCanvas: HTMLCanvasElement,
  userElements: { [k: string]: { [k: string]: string } },
  endGameFunction: (time: string, isVictory: boolean, place: number, coins: number, awards: number) => void,
  level: number,
  exitGameFunction: () => void
): void {
  defaultSnakeLength = config.level[level].defaultSnakeLength;
  wholeSessionTime = config.level[level].wholeSessionTime;
  baseVelocity = config.level[level].baseVelocity;
  maxVelocityGrowTimes = config.level[level].maxVelocityGrowTimes;
  boomHpLoose = config.level[level].boomHpLoose;
  awardsCount = config.level[level].awardsCount;
  coinsPower = config.level[level].coinsPower;
  selfIntersection = config.level[level].selfIntersection;
  appleHealValue = config.level[level].appleHealValue;
  appleCreateTime = config.level[level].appleCreateTime;

  mainCanvas = inCanvas;
  mainCanvas.addEventListener('click', onClick);
  mainCanvas.addEventListener('mousemove', onPointerMove);
  mainCanvas.requestFullscreen();

  endFunction = endGameFunction;
  exitFunction = exitGameFunction;
  const textureLoader = new THREE.TextureLoader();

  currentTrackIndex = -1;
  changeMusicTrack();

  camera = new THREE.PerspectiveCamera(50, config.wholeWidth / config.wholeHeight, 1, 5000);
  camera.position.set(config.fieldLeft + config.fieldWidth / 2, 350, config.fieldTop + config.fieldHeight / 2 + 450);
  camera.lookAt(config.fieldLeft + config.fieldWidth / 2, 0, config.fieldTop + config.fieldHeight / 2 + 50);
  scene = new THREE.Scene();
  textureLoader.load(backImg, function (texture) {
    scene.background = texture;
  });
  renderer = new THREE.WebGLRenderer({ canvas: inCanvas, antialias: true });
  renderer.setSize(config.wholeWidth, config.wholeHeight);
  renderer.shadowMap.enabled = true;

  //  GROUND
  textureLoader.load(groundImg, function (texture) {
    const gg = new THREE.PlaneGeometry(config.fieldWidth, config.fieldHeight);
    const gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });

    const ground = new THREE.Mesh(gg, gm);
    ground.rotation.x = -Math.PI / 2;
    ground.material.map.repeat.set(1, 1);
    ground.material.map.wrapS = ground.material.map.wrapT = THREE.RepeatWrapping;
    ground.material.map.encoding = THREE.sRGBEncoding;
    ground.receiveShadow = true;
    ground.position.set(config.fieldLeft + config.fieldWidth / 2, 0, config.fieldTop + config.fieldHeight / 2);
    ground.name = 'ground';
    scene.add(ground);
  });

  // Кнопки управления
  textureLoader.load(btnExitSource, function (texture) {
    const btnGeometry = new THREE.BoxGeometry(40, 40, 1);
    const btnMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture, transparent: true });
    const btnMesh = new THREE.Mesh(btnGeometry, btnMaterial);
    btnMesh.rotation.x = -1;
    btnMesh.position.set(250, -100, 565);
    btnMesh.name = 'btnExit';
    scene.add(btnMesh);
  });

  textureLoader.load(btnFullScreenSource, function (texture) {
    const btnGeometry = new THREE.BoxGeometry(40, 40, 1);
    const btnMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture, transparent: true });
    const btnMesh = new THREE.Mesh(btnGeometry, btnMaterial);
    btnMesh.rotation.x = -1;
    btnMesh.position.set(300, -100, 565);
    btnMesh.name = 'btnFullScreen';
    scene.add(btnMesh);
  });

  textureLoader.load(btnPauseSource, function (texture) {
    const btnGeometry = new THREE.BoxGeometry(40, 40, 1);
    const btnMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture, transparent: true });
    const btnMesh = new THREE.Mesh(btnGeometry, btnMaterial);
    btnMesh.rotation.x = -1;
    btnMesh.position.set(350, -100, 565);
    btnMesh.name = 'btnPause';
    scene.add(btnMesh);
  });

  //Формирование информационных панелей
  let panelGeometry: THREE.PlaneGeometry;
  let panelMesh: THREE.Mesh;

  // Timer Panel
  panelGeometry = new THREE.PlaneGeometry(config.topPanelWidth, config.topPanelHeight);
  panelMesh = new THREE.Mesh(panelGeometry, timerPanelMaterial);
  panelMesh.position.set(config.topPanelLeft + config.topPanelWidth / 2, config.topPanelHeight / 2, config.fieldTop);
  scene.add(panelMesh);

  const angle = 45;

  // Left Panel
  panelGeometry = new THREE.PlaneGeometry(config.leftPanelWidth, config.leftPanelHeight);
  panelMesh = new THREE.Mesh(panelGeometry, leftPanelMaterial);
  panelMesh.position.set(
    config.fieldLeft - (config.leftPanelWidth / 2) * Math.cos(angle * (Math.PI / 180)),
    config.leftPanelHeight / 2,
    config.fieldTop + (config.leftPanelWidth / 2) * Math.sin(angle * (Math.PI / 180))
  );
  panelMesh.rotation.y = angle * (Math.PI / 180);
  scene.add(panelMesh);

  // Right Panel
  textureLoader.load(imgLevelSources[level], function (texture) {
    panelGeometry = new THREE.PlaneGeometry(config.rightPanelWidth, config.rightPanelHeight);
    rightPanelMaterial.map = texture;
    panelMesh = new THREE.Mesh(panelGeometry, rightPanelMaterial);
    panelMesh.position.set(
      config.fieldLeft + config.fieldWidth + (config.rightPanelWidth / 2) * Math.cos(angle * (Math.PI / 180)),
      config.rightPanelHeight / 2,
      config.fieldTop + (config.rightPanelWidth / 2) * Math.sin(angle * (Math.PI / 180))
    );
    panelMesh.rotation.y = -angle * (Math.PI / 180);
    scene.add(panelMesh);
  });

  // Общее освещение
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 1.0;
  light.position.set(0, 1, 0);
  light.target.position.set(0, 0, 0);
  scene.add(light);

  // Центральное освещение
  const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8);
  const bulbLight = new THREE.PointLight(0xffee88, 2, 1000, 2);
  const bulbMat = new THREE.MeshStandardMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000
  });
  bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
  bulbLight.position.set(500, 200, 300);
  bulbLight.castShadow = true;
  scene.add(bulbLight);

  if (snakes.length === 0) {
    const snake1 = new Snake(400, 200, 0.1, 0.0, 100, 'red', '', '0', defaultSnakeLength, config.fieldStep);
    snakes.push(snake1);

    gameStatus.mode = 'Play';

    mainTimerStart = window.performance.now();
    tick();
    mainTimerId = window.setInterval(tick, 1000);

    coinGenerator();
    timeoutAppleGenerator = window.setTimeout(appleGenerator, appleCreateTime * 1000);
  }
  profileSnake(userElements);

  draw.drawLeftPanel(leftPanel.getContext('2d'), leftPanelMaterial, snakes[indexOfSnakeUnderControl]);
  render();
}

document.addEventListener('keydown', onKeyDown);

export { gameStart, clearGame };
