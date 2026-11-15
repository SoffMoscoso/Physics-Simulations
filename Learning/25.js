///more functions for vectors////////////////
// vec.heading(): devuelve el angulo hacia el que apunta el vector.
//p5.Vector.fromAngle(): recibe un angulo y devuelve el vector unitario apuntando en la direccion de ese angulo
//limit(max): recorta la longitud del vector a un maximo sin cambiar su direccion.
//dist(x1,y1,x2,y2): da la distancia entre dos puntos
/////////////////////////////////////////////////////////////

let pos, vel;

function setup() {
  createCanvas(400, 300);
  pos = createVector(200, 150);
  vel = createVector(0, 0);
}

function draw() {
  background(30);

  let objetivo = createVector(mouseX, mouseY);
  let deseo = p5.Vector.sub(objetivo, pos);   // apunta de pos hacia el mouse
  deseo.setMag(0.2);                          // fuerza pequeña
  vel.add(deseo);                             // acelera hacia el mouse
  vel.limit(4);                               // pero con rapidez máxima
  pos.add(vel);

  push();
  translate(pos.x, pos.y);
  rotate(vel.heading());
  fill(255, 220, 0);
  triangle(15, 0, -10, -8, -10, 8);
  pop();
}
