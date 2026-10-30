function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(220);

  //Crear circulo de color
  fill(255, 197, 211);          // color de relleno (R, G, B)
  noStroke();                 // sin borde
  circle(100, 100, 60);       // x, y, diámetro

  //rectangulo de color
  fill(255, 0, 0);
  rect(200, 60, 80, 50);      // x, y, ancho, alto

  //Linea de color
  stroke(255,0,128);                // color del borde
  strokeWeight(3);            // grosor del borde
  noFill();                   // sin relleno
  line(50, 150, 350, 150);    // x1, y1, x2, y2
}
