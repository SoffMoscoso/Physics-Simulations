//Solar system in 3D
function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES); //cambiar radianes a grados
  noStroke();
}

function draw() {
  background(5);
  orbitControl();

  ambientLight(30);
  pointLight(255,255,200,0,0,0);

  pointLight(255,255,100,0,0,300);

  push();
  emissiveMaterial(255,200,0);
  sphere(40);
  pop();

  push();
  rotateY(frameCount*0.8);
  translate(100,0,0);
  fill(80,150,255);
  sphere(15);
  
  rotateY(frameCount * 1.5);
  translate(30, 0, 0);
  fill(200);
  sphere(5);
  pop();

  push();
  rotateY(frameCount*1.2);
  translate(180,0,0);
  fill(200,150,255);
  sphere(10);
  pop();
  
  push();
  rotateY(frameCount);
  translate(220,0,0);
  fill(200,0,255);
  sphere(8);
  pop();
  
  
}
