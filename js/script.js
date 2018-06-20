let canvas;
let canvasContext;
// X & Y axis of the ball.
let ballX = 50;
let ballSpeedX = 15;
let ballY = 10;
let ballSpeedY = 4;
// Control the paddle.
const PADDLE_HEIGHT = 100;
let paddle1Y = 250;

// Identify the location of the user's mouse.
// This event listener fires every time the mouse is moved.
calculateMousePos = evt => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
};

window.onload = () => {
  console.log("Within Your Browser The Force Has Awakend.");
  // Grab the canvas we will be painting.
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  // Every so often, call drawEverything.
  let framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  // Add the event listener to our canvas.
  canvas.addEventListener("mousemove", function(evt) {
    let mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
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
  // Left player's paddle.
  colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, "#FFF");
  // Draws the ball.
  colorCircle(ballX, ballY, 10, "#FFF");
};

// This makes it easier for us draw a ball.
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
