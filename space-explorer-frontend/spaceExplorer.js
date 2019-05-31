var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//load images

const astronaut = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();
const gameOver = new Image();

bg.src = "./public/bg.png";
fg.src = "./public/fg.png";
pipeNorth.src = "./public/pipeNorth.png";
pipeSouth.src = "./public/pipeSouth.png";
gameOver.src = "./public/gameOver.png";

// useful variables
const gap = 375;
const constant = pipeNorth.height + gap;

let aX = 10;
let aY = 150;

let gravity = 1.5;
let score = 0;

// on key down

document.addEventListener("keydown", () => {
  moveUp();
});

function moveUp() {
  aY -= 20;
}

// pipe coordinates
let pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0
};

//draw images

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // detect collision

    if (
      (aX + astronaut.width >= pipe[i].x &&
        aX <= pipe[i].x + pipeNorth.width &&
        (aY <= pipe[i].y + pipeNorth.height ||
          aY + astronaut.height >= pipe[i].y + constant)) ||
      aY + astronaut.height >= canvas.height - fg.height
    ) {
      setTimeout(function() {
        location.reload();
      }, 2000);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(gameOver, 0, 0);
      clearInterval(interval);
    }

    if (pipe[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height);

  ctx.drawImage(astronaut, aX, aY);

  aY += gravity;

  ctx.font = "20px Verdana";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Score: " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}
