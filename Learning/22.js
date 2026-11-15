//Solar system with transformations
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES); //cambiar radianes a grados
}

function draw() {
  background(15);
  translate(width / 2, height / 2);     // origen en el sol

  fill(255, 200, 0);
  circle(0, 0, 50);                      // sol

  rotate(frameCount);             // gira todo el sistema
  translate(120, 0);                     // avanza 120 px hasta el planeta
  fill(100, 180, 255);
  circle(0, 0, 20);                      // planeta

  rotate(frameCount);             // gira de nuevo, ahora sobre el planeta
  translate(30, 0);                      // avanza 30 px hasta la luna
  fill(220);
  circle(0, 0, 8);                       // luna
}
