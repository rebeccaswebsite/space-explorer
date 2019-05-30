var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
console.log(ctx)

//load images

const astronaut = new Image()
const bg = new Image()
const fg = new Image()
const pipeNorth = new Image()
const pipeSouth = new Image()

astronaut.src = "./public/astronaut.png"
bg.src = "./public/bg.png"
fg.src = "./public/fg.png"
pipeNorth.src = "./public/pipeNorth.png"
pipeSouth.src = "./public/pipeSouth.png"

// useful variables
const gap = 85
const constant = pipeNorth.height + gap

let aX = 10
let aY = 150

//draw images

function draw() {
  ctx.drawImage(bg, 0, 0)

  ctx.drawImage(pipeNorth, 100, 0)
  ctx.drawImage(pipeSouth, 100, 0 + constant)

  ctx.drawImage(fg, 0, canvas.height - fg.height)

  ctx.drawImage(astronaut, aX, aY)
}

draw()
