const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const cw = (canvas.width = 1000);
const ch = (canvas.height = 500);

const ballSize = 20;

let ballY = ch / 2 - ballSize / 2;
let ballX = cw / 2 - ballSize / 2;

let ballSpeedX = 5;
let ballSpeedY = 3;

function randomValue() { //losowanie pierwotnych wartosci piłki
  let values = [-5, -4, -3, 3, 4, 5];
  let valueRandom = Math.floor(Math.random() * (values.length - 1));
  ballSpeedX = values[valueRandom];
  valueRandom = Math.floor(Math.random() * (values.length - 1));
  ballSpeedY = values[valueRandom];
}



const racketH = 100;
const racketW = 20;

const playerX = 50;
let playerY = ch / 2 - racketH / 2;

const aioX = cw - playerX - racketW;
let aioY = ch / 2 - racketH / 2;

let chosenMove = new Array;

let navCanvas = document.getElementById('nav-canvas');
let start = document.getElementById("START");

start.addEventListener('click', function () {
  navCanvas.innerHTML = "<ul><li >1 PLAYER</li><li >2 PLAYERS</li></ul>";
  let control = navCanvas.getElementsByTagName("li");
  
  console.log(control.item);
  control[0].addEventListener("click", function(){
    navCanvas.innerHTML = "<div>CONTROL 1<br>↑ UP<br>↓ DOWN</div><div>CONTROL 2<br>MOVE MOUSE<br>UP or DOWN</div><div>CONTROL 3<br>W UP<br>S DOWN</div><div>OK</div>";
    let choiceControl = navCanvas.getElementsByTagName("div");
    choiceControl[0].addEventListener("click",function(){
      if(choiceControl[0].style.backgroundColor == "rgb(172, 9, 9)"){
        chosenMove = [];
        choiceControl[0].style.backgroundColor="rgb(12, 129, 27)";
      }else{
        choiceControl[0].style.backgroundColor="rgb(172, 9, 9)";
        chosenMove.push(38);
        chosenMove.push(40);
      }
    });
    
    /*choiceControl.addEventListener("click",function(){
        console.log(choiceControl);
    });*/
  });

});



window.addEventListener("keydown",function(event){
  console.log(event.which);
});




function table() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, cw, ch);

  ctx.fillStyle = "#ffffff";
  for (let y = 10; y < ch; y += 25) {
    ctx.fillRect(cw / 2 - 10 / 2, y - 10 / 2, 10, 10);
  }
}

function addSpeedToBall() {
  if (ballSpeedX < 0 && ballSpeedX > -7) {
    ballSpeedX -= 1;
  } else if (ballSpeedX > 0 && ballSpeedX < 7) {
    ballSpeedX += 1;
  }
  if (ballSpeedY < 0 && ballSpeedY > -7) {
    ballSpeedY -= 1;
  } else if (ballSpeedY > 0 && ballSpeedY < 7) {
    ballSpeedY += 1;
  }
}

let bit = 0;

function drawBall() {
  ctx.fillStyle = "#c82124";
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballY < 0 || ballY + ballSize > ch) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballX < 0 || ballX + ballSize > cw) {
    ballY = ch / 2 - ballSize / 2;
    ballX = cw / 2 - ballSize / 2;
  }
  if (
    (ballY > playerY || ballY + ballSize > playerY) &&
    (ballY < playerY + racketH || ballY + ballSize < playerY + racketH) &&
    ballX == playerX + racketW
  ) {
    ballSpeedX = -ballSpeedX;
    if (bit > 10) {
      addSpeedToBall();
      bit = 0;
    }
    bit++;
  }
  if (
    (ballY > aioY || ballY + ballSize > aioY) &&
    (ballY < aioY + racketH || ballY + ballSize < aioY + racketH) &&
    ballX + ballSize == aioX
  ) {
    ballSpeedX = -ballSpeedX;
    bit++;
  }
}

function playAio() {

  let distanceY = (ballY + ballSize / 2) - (playerY + racketH / 2);
  let distanceX = (ballX - playerX);
  if (distanceY > 200 && distanceX > 430) {
    playerY += 2;
  } else if (distanceY < -200 && distanceX > 430) {
    playerY -= 2;
  } else if (distanceY > 50 && distanceX > 430) {
    playerY += 1;
  } else if (distanceY < -50 && distanceX > 430) {
    playerY -= 1;
  } else if (distanceY > 200 && distanceX < 430) {
    playerY += 5;
  } else if (distanceY < -200 && distanceX < 430) {
    playerY -= 5;
  } else if (distanceY > 50 && distanceX < 430) {
    playerY += 6;
  } else if (distanceY < -50 && distanceX < 430) {
    playerY -= 6;
  }

  if (playerY > 400) {
    playerY = 400;
  }
}

function playAio2() {

  let distanceY = (ballY + ballSize / 2) - (aioY + racketH / 2);
  let distanceX = (aioX - ballX + ballSize);
  if (distanceY > 200 && distanceX > 430) {
    aioY += 2;
  } else if (distanceY < -200 && distanceX > 430) {
    aioY -= 2;
  } else if (distanceY > 50 && distanceX > 430) {
    aioY += 1;
  } else if (distanceY < -50 && distanceX > 430) {
    aioY -= 1;
  } else if (distanceY > 200 && distanceX < 430) {
    aioY += 5;
  } else if (distanceY < -200 && distanceX < 430) {
    aioY -= 5;
  } else if (distanceY > 50 && distanceX < 430) {
    aioY += 6;
  } else if (distanceY < -50 && distanceX < 430) {
    aioY -= 6;
  }

  if (aioY > 400) {
    aioY = 400;
  }
}



function drawPlayer() {
  ctx.fillStyle = "#66ff33";
  ctx.fillRect(playerX, playerY, racketW, racketH);

  ctx.fillStyle = "#91125E";
  ctx.fillRect(aioX, aioY, racketW, racketH);

}


const move = e => {
  switch (e.keyCode) {
    case 38:
      if (playerY > 0) playerY -= 20;
      break;
    case 40:
      if (playerY + racketH < ch) playerY += 20;
      break;
  }
};

/*let Data = document.getElementById("result");
console.log(Data.getElementsByTagName("span"));*/

function game() {
  //window.addEventListener("keydown", move);
  table();
  drawPlayer();
  //playAio();
  drawBall();
  playAio2();
}

randomValue();



setInterval(game, 1000 / 60);