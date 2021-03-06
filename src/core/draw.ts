import * as THREE from 'three';

import config from './constants';
import { Apple, Boom, Coin, Snake } from './classes';

export const draw = {
  drawLeftPanel,
  drawCoins,
  drawApples,
  drawBooms,
  drawSnakes,
  drawTimerPanel
};

// Функция отрисовки панели таймера
function drawTimerPanel(ctx: CanvasRenderingContext2D, material: THREE.MeshPhongMaterial, text: string): void {
  ctx.clearRect(0, 0, config.topPanelWidth, config.topPanelHeight);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(39, 79, 255, 0.4)';
  ctx.fillRect(0, 0, config.topPanelWidth, config.topPanelHeight);
  ctx.closePath();
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'rgba(85,39,143,1.0)';
  ctx.font = '96px Impact';
  ctx.textAlign = 'left';
  const measureText = ctx.measureText(text).width;
  ctx.fillText(text, config.fieldWidth / 2 - measureText / 2, 20);

  const canvasTexture = new THREE.Texture(ctx.canvas);
  canvasTexture.needsUpdate = true;
  material.map = canvasTexture;
}

// Функция отрисовки левой панели
function drawLeftPanel(ctx: CanvasRenderingContext2D, material: THREE.MeshPhongMaterial, snake: Snake): void {
  ctx.clearRect(0, 0, config.leftPanelWidth, config.leftPanelHeight);

  ctx.beginPath();
  ctx.fillStyle = 'rgba(139,179,317,0.5)';
  ctx.fillRect(0, 0, config.leftPanelWidth, config.leftPanelHeight);
  ctx.closePath();

  ctx.textBaseline = 'top';
  let textTop = config.leftPanelTop + 10;
  ctx.fillStyle = 'rgba(0,0,0,1.0)';
  ctx.font = '24px Impact';

  ctx.textAlign = 'left';
  ctx.fillText('Здоровье:', config.leftPanelLeft + 5, textTop);
  ctx.textAlign = 'right';
  ctx.fillText(snake.hp.toString(), config.leftPanelWidth - 15, textTop);

  textTop += 30;
  ctx.textAlign = 'left';
  ctx.fillText('Очки:', config.leftPanelLeft + 5, textTop);
  ctx.textAlign = 'right';
  ctx.fillText(snake.score.toString(), config.leftPanelWidth - 15, textTop);

  const head = snake.elements[0];
  textTop += 30;
  const v = Math.round(Math.abs(head.vx + head.vy) * 100);
  ctx.textAlign = 'left';
  ctx.fillText('Скорость:', config.leftPanelLeft + 5, textTop);
  ctx.textAlign = 'right';
  ctx.fillText(v.toString(), config.leftPanelWidth - 15, textTop);

  const canvasTexture = new THREE.Texture(ctx.canvas);
  canvasTexture.needsUpdate = true;
  material.map = canvasTexture;
}

// Функция отрисовки монет
function drawCoins(scene: THREE.Scene, coins: Coin[]): void {
  coins.forEach((el) => {
    const obj = scene.getObjectByName(el.id);
    if (obj) {
      el.phase++;
      obj.rotation.y = el.phase / 40;
    }
  });
}

// Функция отрисовки яблок
function drawApples(scene: THREE.Scene, apples: Apple[]): void {
  apples.forEach((el) => {
    const obj = scene.getObjectByName(el.id);
    if (obj) {
      obj.rotateZ(0.03);
    }
  });
}

let boomGeometry: THREE.TorusGeometry;
let boomMaterial: THREE.MeshPhongMaterial;
let boomMesh: THREE.Mesh;

// Функция отрисовки взрывов
function drawBooms(scene: THREE.Scene, booms: Boom[]): void {
  booms.forEach((el) => {
    el.phase++;
    const obj = scene.getObjectByName(`${el.id}_1`);
    if (!obj) {
      for (let i = 1; i <= 10; i++) {
        boomGeometry = new THREE.TorusGeometry(1, 1, 16, 100);
        boomMaterial = new THREE.MeshPhongMaterial({
          color: 'rgb(255,0,0)',
          emissive: 0x222222,
          transparent: true,
          opacity: 1
        });
        boomMesh = new THREE.Mesh(boomGeometry, boomMaterial);
        boomMesh.name = `${el.id}_${i}`;
        boomMesh.position.x = el.x;
        boomMesh.position.y = 7;
        boomMesh.position.z = el.y;
        boomMesh.rotateX(Math.PI / 2);
        scene.add(boomMesh);
      }
    }
    if (obj) {
      for (let i = 1; i <= 10; i++) {
        const obj = scene.getObjectByName(`${el.id}_${i}`);
        if (!(el.phase / Math.log10(i) > 0)) console.log(el.phase / Math.log10(i));
        boomGeometry = new THREE.TorusGeometry((10 * el.phase) / i, 1, 16, 100);
        (obj as THREE.Mesh).geometry.dispose();
        (obj as THREE.Mesh).geometry = boomGeometry;
        ((obj as THREE.Mesh).material as THREE.MeshPhongMaterial).opacity = (100 - el.phase) / 100;
      }
    }
  });

  for (let i = booms.length - 1; i >= 0; i--) {
    if (booms[i].phase >= 100) {
      const id = booms[i].id;
      booms.splice(i, 1);
      for (let i = 1; i <= 10; i++) {
        scene.remove(scene.getObjectByName(`${id}_${i}`));
      }
    }
  }
}

// Функция отрисовки змей
function drawSnakes(scene: THREE.Scene, snakes: Snake[]): void {
  snakes.forEach((item) => {
    item.elements.forEach((el) => {
      const obj = scene.getObjectByName(el.id);
      if (!obj) {
        const sphereGeometry = new THREE.SphereGeometry(el.r, 20, 10);
        const sphereMaterial = new THREE.MeshPhongMaterial({ color: el.col, emissive: 0x222222 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.castShadow = true;
        sphere.name = el.id;
        sphere.position.x = el.x;
        sphere.position.y = 5;
        sphere.position.z = el.y;
        scene.add(sphere);
      }
      if (obj) {
        if (item.hp <= 0 && !el.isShadow) {
          (obj as THREE.Mesh).material = new THREE.MeshPhongMaterial({
            color: 'rgb(255,255,255)',
            transparent: true,
            opacity: 0.2
          });
          el.isShadow = true;
        }
        obj.position.x = el.x;
        obj.position.z = el.y;
        obj.position.y = 5;
      }
    });
  });
}
