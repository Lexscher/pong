let canvas;
let canvasContext;
// X & Y axis of the ball.
let ballX = 50;
let ballSpeedX = 15;
let ballY = 10;
let ballSpeedY = 4;
// The paddles.
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;
let paddle1Y = 250;
let paddle2Y = 250;

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

// Reset the position of the ball to the center of the screen.
ballReset = () => {
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballX = canvas.height / 2;
};

// This handles all the movement/functionality of the items in our canvas.
moveEverything = () => {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX < 0) {
    // ballSpeedX = -ballSpeedX;
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
    }
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
};
// This draws all the shapes/items on our canvas.
drawEverything = () => {
  // Background of our canvas.
  colorRect(0, 0, canvas.width, canvas.height, "#000");
  // Left paddle (Player's paddle).
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "#FFF");
  // Right computer paddle.
  colorRect(
    canvas.width - PADDLE_THICKNESS,
    paddle2Y,
    PADDLE_THICKNESS,
    PADDLE_HEIGHT,
    "#FFF"
  );
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
