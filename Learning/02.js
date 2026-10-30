//el origen coordenado en p5.js esta en la esquina superior izquierda. 
//x crece hacia la derecha, y crece hacia abajo.

function setup() {
  createCanvas(400, 300); //width, height
}

function draw() {
  background(0);
  
  //circle crea un [figura] circulo y lo posiciona en (x,y). 
  //el tercer argumento corrsponde al radio del circulo.
  circle(0, 0, 80);          // esquina superior izquierda
  circle(width, height, 80); // esquina inferior derecha
  circle(width / 2, height / 2, 40); // centro
}
