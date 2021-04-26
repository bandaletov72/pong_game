"use strict";

let player1 = 0;
let player2 = 0;
var keys = [];
let canvasWidth = 1000;
let canvasHeight = 500;
const ballHeight = 10;
const ballWidth = 10;
const wallHeight = 90;
let canvas = document.getElementById("canvas");
/*canvas.style.cssText="width: " + canvasWidth + "px;height: " + canvasHeight + "px;";*/
let ctx = canvas.getContext("2d");
let count1 = document.getElementById("count1");
let count2 = document.getElementById("count2");

class Walls {
  constructor(posY, posX) {
    this.posX = posX;
    this.posY = posY;
  }
}

let lwall = new Walls(0, 0);
let rwall = new Walls(0, 0);
rwall.posX = canvasWidth - 3 * ballWidth;
lwall.posX = 3 * ballWidth;

const ball = {
  posX: 100, //позиция X
  posY: 100, //позиция Y
  vectX: 1, //направление движения вправо (1) или влево (-1) по X
  vectY: 1, // направление движения вверх (-1) или вниз (1) по Y
  speedX: 2, // скорость по X (1 - 100);
  speedY: 2, // скорость по Y (1 - 100);
};

window.addEventListener(
  "keydown",
  function (e) {
    keys[e.keyCode] = true;
  },
  false
);
window.addEventListener(
  "keyup",
  function (e) {
    delete keys[e.keyCode];
  },
  false
);

function ballrun() {
  ball.posX += ball.vectX * ball.speedX;
  ball.posY += ball.vectY * ball.speedY;
  if (ball.posX >= rwall.posX) {
    if (ball.posY >= rwall.posY && ball.posY <= rwall.posY + wallHeight) {
      ball.vectX = ball.vectX * -1;
    }
  }
  if (ball.posX <= lwall.posX) {
    if (ball.posY >= lwall.posY && ball.posY <= lwall.posY + wallHeight) {
      ball.vectX = ball.vectX * -1;
    }
  }
  if (ball.posX > canvasWidth - 3 * ballWidth) {
    ball.posX = canvasWidth / 2;
    ball.vectX = -1;
    setTimeout(function () {
      changebg("#222");
    }, 0);
    setTimeout(function () {
      changebg("#000");
    }, 50);
    player2++;
    count2.innerHTML = player2;
  } else {
    if (ball.posY >= canvasHeight - ballHeight) {
      ball.vectY = -1;
    }
  }
  if (ball.posX < 3 * ballWidth) {
    ball.posX = canvasWidth / 2;
    ball.vectX = 1;
    setTimeout(function () {
      changebg("#222");
    }, 0);
    setTimeout(function () {
      changebg("#000");
    }, 50);
    player1++;
    count1.innerHTML = player1;
  } else {
    if (ball.posY <= 0) {
      ball.vectY = 1;
    }
  }
}
function changebg(bgcolor) {
  canvas.style.cssText = "background-color: " + bgcolor + ";";
}
function restart(play) {
  if (play === 1) {
    ball.posY = lwall.posY + wallHeight / 2;
    ball.posX = lwall.posX + ballWidth;
    ball.vectX = 1;
  }
  if (play === 2) {
    ball.posY = rwall.posY + wallHeight / 2;
    ball.posX = rwall.posX - ballWidth;
    ball.vectX = -1;
  }
}

setInterval(function () {
  render();
}, 1);

function render() {
  ctx.clearRect(ball.posX - 1, ball.posY - 1, ballWidth + 2, ballHeight + 2);
  ctx.clearRect(rwall.posX - 1, rwall.posY - 1, 10 + 2, wallHeight + 2);
  ctx.clearRect(lwall.posX - 1, lwall.posY - 1, 10 + 2, wallHeight + 2);
  ballrun();
  checkwalls();
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(rwall.posX, rwall.posY, 10, wallHeight);
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(lwall.posX, lwall.posY, 10, wallHeight);
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(ball.posX, ball.posY, ballWidth, ballHeight);
}

function checkwalls() {
  if (keys[81]) {
    //lwall up
    lwall.posY -= 2;
  }
  if (keys[65]) {
    //lwall down
    lwall.posY += 2;
  }
  if (keys[79]) {
    //rwall up
    rwall.posY -= 2;
  }
  if (keys[76]) {
    //rwall down
    rwall.posY += 2;
  }
  if (lwall.posY > canvasHeight - wallHeight) {
    lwall.posY = canvasHeight - wallHeight;
  }
  if (rwall.posY > canvasHeight - wallHeight) {
    rwall.posY = canvasHeight - wallHeight;
  }
  if (rwall.posY < 0) {
    rwall.posY = 0;
  }
  if (lwall.posY < 0) {
    lwall.posY = 0;
  }
}
