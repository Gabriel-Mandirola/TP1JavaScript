var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width =700;
canvas.height = 700;
let score = 0;

const resultElement = document.getElementById("score");
/*var img = new Image();
img.src = 'Imagenes/Wailing_Woods_Geo_TopView.png';
img.onload = function(){
  fill_canvas(img);
  }
  function fill_canvas(img){
      
  
    ctx.drawImage(img,0,0);
   }*/

setInterval(main,100)
  
let wood = {
url:'Imagenes/Wailing_Woods_Geo_TopView.png',
load:false
};
wood.imagen = new Image();
wood.imagen.src = wood.url;
wood.imagen.addEventListener("load", loadWood);


function loadWood(){
  wood.loadOK = true;
}
//Caperusita roja
let littleRedRidingHood = { 
url: 'Imagenes/littleredridinghoodR.png',
posicionX:0,
posicionY:0,
futureX:0,
futureY:0,
size:30
 };
littleRedRidingHood.imagen = new Image();
littleRedRidingHood.imagen.src = littleRedRidingHood.url;

//Fin littleRed

//Berry
let berry = {
url: 'Imagenes/BerryDos.png',
posicionX:100,
posicionY:100,
exist:false
};
berry.imagen = new Image();
berry.imagen.src = berry.url;

function main() {
    update();
    draw();
    console.log("intervalo");
    console.log(berry.posicionX);
    console.log(berry.posicionY);
    console.log(littleRedRidingHood.posicionX);
    console.log(littleRedRidingHood.posicionY);
}


function update(){
  
  if(!berry.exist){
    berry.posicionX = getRandomX();
    berry.posicionY = getRandomY();
  }
 
 littleRedRidingHood.posicionX += littleRedRidingHood.futureX;
 littleRedRidingHood.posicionY += littleRedRidingHood.futureY;
 if(berry.exist && littleRedRidingHood.posicionX-30 <= berry.posicionX &&  littleRedRidingHood.posicionX+30 >= berry.posicionX &&  littleRedRidingHood.posicionY -30 <= berry.posicionY &&  littleRedRidingHood.posicionY +30 >= berry.posicionY){
   berry.posicionX = getRandomX();
   berry.posicionY = getRandomY();
   berry.exist = false;
   score ++;
   resultElement.textContent = "Score: " + score;
 }
if(littleRedRidingHood.posicionX > 660 || littleRedRidingHood.posicionX < 0 || littleRedRidingHood.posicionY > 660 || littleRedRidingHood.posicionY < 0){
   //alert('fin del juego')
   littleRedRidingHood.futureX = 0
   littleRedRidingHood.futureY = 0
   littleRedRidingHood.posicionX = 0
   littleRedRidingHood.posicionY = 0
   score = 0;
   resultElement.textContent = "Score: " + score;
  
 }
}

function draw() {
  
   // ctx.fillStyle = "black";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);  
  //drawThing(littleRedRidingHood.imagen,littleRedRidingHood.positionY,littleRedRidingHood.positionX);
  ctx.drawImage(wood.imagen,0,0);

  if(!berry.exist){
    ctx.drawImage(berry.imagen,berry.posicionX ,berry.posicionY)
    berry.exist = true;
  }  else if(berry.exist){
    ctx.drawImage(berry.imagen,berry.posicionX ,berry.posicionY)
  }
  ctx.drawImage(littleRedRidingHood.imagen,littleRedRidingHood.posicionX ,littleRedRidingHood.posicionY );
  console.log("caperucita");
}
  //posiciones al azar
  function getRandomBerry() {
    let position;
  
  //  do {
      position = { positionX: getRandomX(), positionY: getRandomY() };
   // } while (!checkFoodCollision(position));
  
    return position;
  }

  function getRandomX() {
    // 0, 20, 40, ...380
    // 1, 2, ..., 19          x20 (380 / 20 = 19)
    return Math.floor(Math.random() * 34) * 20;
  }
  
  function getRandomY() {
    // 0, 20, 40, ..., 440
    // 1, 2, ..., 22        x20 (440 / 20 = 22)
    return Math.floor(Math.random() * 34) * 20;
  }
  //fin posiciones al azar

  //Movement
  document.addEventListener("keydown", moveLittleRed);
  function moveLittleRed(event) {
  switch (event.key) {
    case "ArrowUp":
      console.log("Move up");
      if (littleRedRidingHood.futureY >= 0) {
        littleRedRidingHood.futureX = 0;
        littleRedRidingHood.futureY -= littleRedRidingHood.size;
      }
      break;
    case "ArrowDown":
      console.log("Move down");
      if (littleRedRidingHood.futureY <= 0) {
        littleRedRidingHood.futureX = 0;
        littleRedRidingHood.futureY += littleRedRidingHood.size;
      }
      break;
    case "ArrowRight":
      console.log("Move right");
      if (littleRedRidingHood.futureX <= 0) {
        littleRedRidingHood.futureX += littleRedRidingHood.size;
        littleRedRidingHood.futureY = 0;
      }
      break;
    case "ArrowLeft":
      console.log("Move left");
      if (littleRedRidingHood.futureX >= 0) {
        littleRedRidingHood.futureX -= littleRedRidingHood.size;
        littleRedRidingHood.futureY = 0;
      }
      break;
    default:
      console.log("Estas tocando otra tecla que no es una flecha");
     
  }
}