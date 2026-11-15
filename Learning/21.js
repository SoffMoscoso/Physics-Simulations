////////Transformaciones/////////////////////
//traslate(x,y): mueve el punto (0,0) del origen de coordenadas a esa posicion.
//rotate(angulo): gira todo el sistema de coordenadas alrededor del origen actual. El angulo va en radianes.
//las transformaciones se acumulan en todo el resto de draw(). Para que afecten solo una parte se escoje push() and pop().
//push(): guarda el estado actual.
//pop(): vuelve a ese estado guardado.

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(30);

  push();
  translate(100, 150);
  rotate(frameCount * 0.05);
  rectMode(CENTER);
  fill(255, 100, 100);
  rect(0, 0, 60, 60);        // cuadrado que gira sobre sí mismo
  pop();

  push();
  translate(300, 150);
  rotate(-frameCount * 0.05);
  rectMode(CENTER);
  fill(100, 200, 255);
  rect(0, 0, 60, 60);        // otro, girando al revés
  pop();
}
