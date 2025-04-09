let canvas = document.getElementById("field");
let ctx = canvas.getContext("2d");

const perfectFrameTime = 0.005;

let fieldWidth = 1080;
let fieldHeight = 720;
let fieldSeparation = 20;

let robotX = 200;
let robotY = 200;

let mouseX = 0;
let mouseY = 0;

let ballX = fieldWidth/2;
let ballY = fieldHeight/2;

let A = 0;
let B = 0;
let C = 0;
let D = 0;

const robotControl = () => {
    let ex = ballY - robotY;
    let kx = 2;
    let ux = ex * kx;

    A = ux;
    B = -ux;
    C = -ux;
    D = ux;
}

const updateRobotPos = () => {
    robotControl();
    let deltaTime = 2 / perfectFrameTime;
    
    // Robot Movement Speed
    let robotXAdd = (A + B + C  + D) / deltaTime;
    let robotYAdd = (A - B - C + D) / deltaTime;
    robotXAdd = isNaN(robotXAdd) ? 0 : robotXAdd;
    robotYAdd = isNaN(robotYAdd) ? 0 : robotYAdd;
    robotX += robotXAdd;
    robotY += robotYAdd;

    // Limit the robot in the field
    robotX = robotX >= (fieldWidth - 50) ? fieldWidth - 50 : robotX <= 50 ? 50 : robotX;
    robotY = robotY >= (fieldHeight - 50) ? fieldHeight - 50 : robotY <= 50 ? 50 : robotY;

    
    console.log("X: " + robotX);
    console.log("Y: " + robotY);


    ballX = mouseX >= (fieldWidth - 25) ? fieldWidth - 25 : mouseX <= 25 ? 25 : mouseX;
    ballY = mouseY >= (fieldHeight - 25) ? fieldHeight - 25 : mouseY <= 25 ? 25 : mouseY;
    drawField();
}

const drawField = () => {
    let timestamp = Date.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Field
    ctx.fillStyle = "#00c255";
    ctx.fillRect(0, 0, fieldWidth, fieldHeight);

    // Draw Robot
    ctx.beginPath();
    ctx.arc(robotX, robotY, 50, 0, 2 * Math.PI,);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(robotX + 50, robotY, 25, 0, Math.PI * 2);
    ctx.fillStyle = "#00c255";
    ctx.fill();
    ctx.closePath();

    
    // Draw Ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#505050";
    ctx.fill();
    ctx.closePath();
    lastTimestamp = timestamp;
}

setInterval(updateRobotPos, 1);

window.addEventListener('load', drawField);
window.addEventListener('mousemove', (e) => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
});