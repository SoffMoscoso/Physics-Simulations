//definicion de variables
let x1 = 0;
let x2 = 0
let time = 1
let velocidad = 0.5

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(30);

  // x aumenta una unidad en cada ciclo, visualizando asi un movimiento de la figura
  fill(255, 197, 211);
  circle(x1, 100, 40);   // x como posición horizontal
  x1 += 1;            // en cada cuadro, x crece en 1

  //velocity funtion. Definicion de la posicion en funcion de la velocidad.
  fill(255,0,128);
  circle(x2,200,40);
  x2 += velocidad * time
  time +=1
}
