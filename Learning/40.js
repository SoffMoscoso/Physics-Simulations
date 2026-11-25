///////mvto browniano 3D/////////
let particulas = []

function setup() {
  createCanvas(500,500,WEBGL);
  noStroke();
  for (let i=0; i<100;i++) {
    particulas.push( new Part3D());
  }
}

function draw() {
  background(30);
  orbitControl();

  ambientLight(60);
  pointLight(255,255,255,0,-200,300);

  for (let p of particulas) {
    p.mover();
    p.mostrar();
  }
}

class Part3D {
  constructor() {
    this.pos = createVector(random(-200,200), random(-200,200), random(-200,200));
    this.vel = p5.Vector.random3D().mult(2);
  }

  mover() {
    this.pos.add(this.vel);
    if (abs(this.pos.x)>200) this.vel.x *=-1;
    if (abs(this.pos.y) > 200) this.vel.y *= -1;
    if (abs(this.pos.z) > 200) this.vel.z *= -1;
  }

  mostrar() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    fill(255,120,200);
    sphere(6);
    pop();
  }
}
