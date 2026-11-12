/////Repeler Particulas con el mouse//////////
let particulas = []  //Lista de particulas

function setup() {
  createCanvas(400,300);
  for (let i=0; i<200; i++) { 
    particulas.push(new Part()); //agregar 100 particulas a la lista
  }
}
function draw() {
  background(30);
  let mouse = createVector(mouseX,mouseY);

  for (let p of particulas) {
    p.repeler(mouse);
    p.mover();
    p.mostrar();
  }
}

class Part {
  constructor() {
    this.pos= createVector(random(width),random(height));
    this.vel = createVector(0, 0);
  }

  repeler(punto) {
    let f = p5.Vector.sub(this.pos, punto); 
    let d = max(f.mag(), 5);

    f.setMag(500/ (d*d) );
    this.vel.add(f);
    this.vel.mult(0.97); //friccion
  }
    
  mover() {
    this.pos.add(this.vel);
  }

  mostrar() {
    noStroke();
    fill(255,100,120);
    circle(this.pos.x, this.pos.y, 5);
  }
}
