let canvas;
let canvasContext;
// x axis of the ball.
let ballX = 50;
let ballSpeedX = 15;
// y axis of the ball.
let ballY = 10;
let ballSpeedY = 4;

window.onload = () => {
  console.log("Within Your Browser The Force Has Awakend.");
  // Grab the canvas we will be painting
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  // every second, call drawEverything.
  let framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
};
// This handles all the movement/functionality of the items in our canvas.
moveEverything = () => {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX > canvas.width || ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY > canvas.height || ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
};
// This draws all the shapes/items on our canvas.
drawEverything = () => {
  // Background of our canvas.
  colorRect(0, 0, canvas.width, canvas.height, "#000");
  // Left player paddle.
  colorRect(0, 210, 10, 100, "#FFF");
  // Draws the ball.
  colorCircle(ballX, ballY, 10, "#FFF");
};

// This makes it easier for us draw a ball
colorCircle = (centerX, centerY, radius, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
};
// This will simplify our drawEverything function.
colorRect = (leftX, topY, width, height, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
};
