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
var lives = 5;
var theOrder = [0,6];
var round = 1;
var index = 0;
var gameOver = false;

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

//Initialize Bricks
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        if(r==0){
          bricks[c][r] = { x: 0, y: 0, color: "black", status: 1, hittable: true  };
        }else if(r==6){
          bricks[c][r] = { x: 0, y: 0, color: "black", status: 1, hittable: false  };
        }else{
          bricks[c][r] = { x: 0, y: 0, color: "blue", status: 1, hittable: false };
        }
    }
}
//Initialize LL
var ll = [];
for(c=0; c<LLColumnCount; c++) {
    ll[c] = [];
    for(r=0; r<LLRowCount; r++) {
        ll[c][r] = { x: 0, y: 0, status: 0 };
    }
}

//Initialize Event Listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// Handling different Keys Pressed
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 87 && ballReleased == false) {//w
        ballReleased = true;
        dx = 0;
        dy = -6;
    }
    else if(e.keyCode == 68 && ballReleased == false) {//d
        ballReleased = true;
        dx = 3;
        dy = -3;
    }
    else if(e.keyCode == 65 && ballReleased == false) {//a
        ballReleased = true;
        dx = -3;
        dy = -3;
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

//Function that takes in the order list and adds one more to it and returns it
function addOrder(list){
  var len = list.length;
  if (len < 7){
    while (true){
       var num = Math.floor((Math.random() * 5) + 1);
      if(list.includes(num) == false){
        break;
      }
    }
    list.push(num);
    list.sort();
  }
  return list;
  }

function hittableHandler(){
  if(gameOver == true){
    document.location.reload();
    alert("YOU WIN, CONGRATS!");
    gameOver = false;
  }
  if (index == (theOrder.length-1)){
    bricks[0][theOrder[index]].hittable = false;
    theOrder = addOrder(theOrder);
    alert(theOrder);
    if(theOrder.length == 7 && index==6){
      gameOver = true;
    }
    index = 0;
    bricks[0][0].hittable = true;
  }
  else{
    bricks[0][theOrder[index]].hittable = false;
    bricks[0][theOrder[index + 1]].hittable = true;
    index ++;
  }
}
//detecting collisions with bricks
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                    if(b.hittable == true){
                      ll[c][r].status = 1;
                      b.color = "green";
                      b.status = 1;
                      ballReleased = false;
                      hittableHandler();
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

// Draws the Bricks
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
                  ctx.fillText("Head",30,155);
                }else if(r==6){
                  ctx.fillStyle = bricks[c][r].color;
                  ctx.fillText("NULL",420,155);
                }else{
                  ctx.fillStyle = bricks[c][r].color;
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Draws LL
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
                  ctx.fillText("Head",30,70);
                }else if(r==6){
                  ctx.fillStyle = "#000000";
                  ctx.fillText("NULL",420,70);
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawLL();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

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
              alert("So close! Try again and you'll get it!");
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
