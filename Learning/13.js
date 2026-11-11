//VECTORS/////////////////////////////////////////////////////
// createVector(x,y): crear vector
// a.add(b): sumar b con a (modifica a)
// a.mult(n): multiplica por un numero
// a.mag(): longitud del vector
// a.setMag(n): cambia la longitud sin cambiar la direccion
// p5.Vector.sub(a,b): resta a-b y devuelve un vector nuevo
// a.copy(): copia el vector
///////////////////////////////////////////////

//pelota que rebota con vectores y gravedad
let pos, vel;
let gravedad;

function setup() {
  createCanvas(400, 300);
  pos = createVector(200, 50);
  vel = createVector(2, 0);
  gravedad = createVector(0, 0.2);  
}

function draw() {
  background(30);

  vel.add(gravedad);    
  pos.add(vel);          

  if (pos.y > height - 15) {
    pos.y = height - 15;
    vel.y *= -0.8;       // rebota y pierde energía
  }
  if (pos.x > width - 15 || pos.x < 15) vel.x *= -1;

  fill(255, 120, 255);
  noStroke();
  circle(pos.x, pos.y, 30);
}
