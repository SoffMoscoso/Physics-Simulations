//orbitControl(): Mover el punto de vista 3D
function setup() {
  createCanvas(400,400,WEBGL);
}

function draw() {
  background(20);
  orbitControl();   // arrastra con el mouse para girar, rueda para acercar

  ambientLight(80);
  pointLight(255, 255, 255, 0, -200, 90);
  noStroke();
  fill(100, 180, 255);
  box(120);
}

//////////////
//tambien se puede definir un limite de movto:
// camara(ojoX, ojoY, ojoZ, centroX, centroY, centroZ, arribaX, arribaY, arribaZ)
