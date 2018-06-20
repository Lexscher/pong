console.log("Hello World!");

// Grab the canvas we will be painting
let canvas = document.getElementById("gameCanvas");
let canvasContext = canvas.getContext("2d");
canvasContext.fillStyle = "#000";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);
