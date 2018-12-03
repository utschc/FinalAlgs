var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2; //paddleX + (.5 * paddleWidth);
var y = canvas.height-30; // canvas.height-(2*paddleHeight)
var dx = 0;
var dy = 0;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var ballReleased = false;
var brickRowCount = 7;
var brickColumnCount = 1;
var brickWidth = 55;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 20;
var score = 0;
var lives = 3;

// 1. Change bricks and make them fit on canvas
      // DONE
// 2. get ball to only release when clicked (or up arrow)
      // DONE
// 3. recognizing hitting single brick
      // DONE
// 4. replacing brick with Number (replacing ball on paddle)
// 5. two different balls (number ball and connector ball)
// needed but extra
  // a). messages pop up if lose
  // b). shit changing colors when you hit
  // c). having back or pause Button

  //draw head, draw null, get text to stay
      // DONE


var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("click", releaseBall, false);


function releaseBall(e){
  //ballReleased = true
    drawWords();
    document.alert("Hello");
}

function keyDownHandler(e) {
    if(e.keyCode == 32 && ballReleased == false) {
        ballReleased = true;
        dx = 2;
        dy = -3;
    }
    else if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                    if (r == 0 ){
                      // alert("Head Brick!");
                    }
                    if(r==6){
                      // alert("Null Brick!");
                    }
                    if(r==1 || r==2 || r==3 || r==4 || r==5){
                      // ctx.fillStyle("#FFFFFF");
                      ctx.fillText("4", 300, 50);
                      b.status = 0;
                      score++;
                    }
                    dy = -dy;
                    // drawWords();
                    if(score == (brickRowCount*brickColumnCount-2)) {
                        document.location.reload();
                        alert("YOU WIN, CONGRATS!");
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    if (ballReleased == false){
      x = paddleX + (.5 * paddleWidth);
      y = canvas.height-(2*paddleHeight);
    }
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r = 0 ; r<brickRowCount ; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                if(r == 0){
                  ctx.fillStyle = "#000000";
                  ctx.fillText("Head",30,50);
                }else if(r==6){
                  ctx.fillStyle = "#000000";
                  ctx.fillText("NULL",420,50);
                // }else if(r==2){
                //   ctx.fillText("2", 90, 50);
                }else{
                  ctx.fillStyle = "#0095DD";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Hello: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawWords(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Testing Draw", canvas.width-90, 100);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    //drawWords();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
              document.location.reload();
                  alert("GAME OVER");
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                // dx = 3;
                // dy = -3;
                ballReleased = false;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();
