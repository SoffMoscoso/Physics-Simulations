// FUNCIONES MATEMATICAS///////////////////
//map(valor, minOriginal, maxOriginal, minNuevo, maxNuevo): convertir un rango en otro
//constrain(valor,min,max): poner limites
//lerp(inicion,fin,t): acercarse suavemente, t va de 0 a 1. con t=0 devuelve inicio, con t=1 devuelve fin.
//////////////////////////////////////////////////////

let x= 0 , y = 0;

function setup() {
  createCanvas(400,400);
}

function draw() {
  background(0);

  //map es util cuando una variable depende de otra
  let tam = map(mouseX, 0, width, 10, 200);
  let rojo = map(mouseX, 0, width, 0,255);
  fill(rojo, 255-rojo, 255);
  noStroke();
  circle(width/2, height/2, tam);

  //se usa para confinar algo en el lienzo
  let x = constrain(mouseX, 50, width-50);
  fill(200,120,200);
  noStroke();
  circle(x,200,40);

  //movimiento suave
  x = lerp(x,mouseX, 0.1);
  y = lerp(y,mouseY, 0.1);
  fill(255,220,0);
  circle(x,y,30);
}
