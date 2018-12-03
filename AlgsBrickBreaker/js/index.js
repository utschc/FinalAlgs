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
var brickOffsetTop = 60;
var brickOffsetLeft = 20;
var LLRowCount = 7;
var LLColumnCount = 1;
var LLWidth = 55;
var LLHeight = 20;
var LLPadding = 10;
var LLOffsetTop = 30;
var LLOffsetLeft = 20;
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
        if(r==0 || r ==6){
          bricks[c][r] = { x: 0, y: 0, color: "black", status: 1 };
        }else{
          bricks[c][r] = { x: 0, y: 0, color: "blue", status: 1 };
        }
    }
}

var ll = [];
for(c=0; c<LLColumnCount; c++) {
    ll[c] = [];
    for(r=0; r<LLRowCount; r++) {
        ll[c][r] = { x: 0, y: 0, status: 0 };
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

function collisionDetection(chosenOne) {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                    if(chosenOne == b){
                      ll[c][r].status = 1;
                      ll[0][0].status = 1;
                      ll[0][6].status = 1;
                      b.color = "green";
                      ballReleased = false;
                    }
                    dy = -dy;
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
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop+100;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                if(r == 0){
                  ctx.fillStyle = bricks[c][r].color;
                  ctx.fillText("Head",30,160);
                }else if(r==6){
                  ctx.fillStyle = bricks[c][r].color;
                  ctx.fillText("NULL",420,160);
                }else{
                  ctx.fillStyle = bricks[c][r].color;
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawLL() {
    for(c=0; c<LLColumnCount; c++) {
        for(r = 0 ; r<LLRowCount ; r++) {
            if(ll[c][r].status == 1) {
                var llX = (r*(LLWidth+LLPadding))+LLOffsetLeft;
                var llY = (c*(LLHeight+LLPadding))+LLOffsetTop;
                ll[c][r].x = llX;
                ll[c][r].y = llY;
                ctx.beginPath();
                ctx.rect(llX, llY, LLWidth, LLHeight);
                if(r == 0){
                  ctx.fillStyle = "#000000";
                  ctx.fillText("Head",30,60);
                }else if(r==6){
                  ctx.fillStyle = "#000000";
                  ctx.fillText("NULL",420,60);
                }else{
                  ctx.fillStyle = "#223467";
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
    // alert("Hit brick 4!");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawLL();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    //drawWords();
    collisionDetection(bricks[0][4]);

    // while(true){
    //   Random rand = new Random();
    //   rand = rand.nextInt();
    //   alert("you got 5!");
    //   cD(5);
    //
    // }

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius+100) {
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
