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

// The player's scores.
let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 5;

// initial state of our "win screen".
let showingWinScreen = false;

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

// This allows us to reset the game when we've hit the win state.
let handleMouseClick = evt => {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
};

window.onload = () => {
  console.log("Within Your Browser, The Force Has Awakened...");
  // Grab the canvas we will be painting.
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  // Every so often, call drawEverything.
  let framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  // Add the event listener to restart the game.
  canvas.addEventListener("mousedown", handleMouseClick);

  // Add the event listener to our canvas.
  canvas.addEventListener("mousemove", function(evt) {
    let mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
}; // <~ wondow.onload(): closed.

// Reset the position of the ball to the center of the screen.
ballReset = () => {
  // Check for win state.
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWinScreen = true;
  }

  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballX = canvas.height / 2;
};

// This will give the second paddle _life_, hunty!
let computerMovement = () => {
  // The center of the second paddle.
  let paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
};

// This handles all the movement/functionality of the items in our canvas.
moveEverything = () => {
  if (showingWinScreen) {
    canvasContext.fillStyle = "#eaeaff";
    canvasContext.fillText("click to continue", 100, 100);
    return;
  }
  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      // Ball control.
      let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player2Score++; // Must be BEFORE ballReset().
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      // Ball control.
      let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player1Score++;
      ballReset();
    }
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}; // <~ Move Everything Function: closed.

// Make a handsome net for our game.
drawNet = () => {
  for (let i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, "#eaeaff");
  }
};

// This draws all the shapes/items on our canvas.
drawEverything = () => {
  // Background of our canvas.
  colorRect(0, 0, canvas.width, canvas.height, "#004444");
  if (showingWinScreen) {
    canvasContext.fillStyle = "#eaeaff";
    // Declare who our winner is.
    if (player1Score >= WINNING_SCORE) {
      canvasContext.fillText("WINNER: human.", 350, 200);
    } else if (player2Score >= WINNING_SCORE) {
      canvasContext.fillText("WINNER: THE COMPUTER!!", 350, 200);
    }
    canvasContext.fillText("click to continue", 350, 500);
    return;
  } // <~ showingWinScreen If Statement: closed.

  drawNet();

  // Left paddle (Player's paddle).
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "#eaeaff");
  // Right computer paddle.
  colorRect(
    canvas.width - PADDLE_THICKNESS,
    paddle2Y,
    PADDLE_THICKNESS,
    PADDLE_HEIGHT,
    "#eaeaff"
  );
  // Draws the ball.
  colorCircle(ballX, ballY, 10, "#eaeaff");

  // Display Scores!!
  canvasContext.fillText("player: " + player1Score, 50, 50);
  canvasContext.fillText("computer: " + player2Score, canvas.width - 100, 50);
}; // <~ Draw Everything Function: closed.

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
