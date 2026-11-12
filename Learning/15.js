//EXERCISE 1: particle simulation with center repulsion effect

let particulas = [];
let K;
let c;

function setup() {
  createCanvas(400, 400);
  c = createVector(200,200)
  
  K = createSlider(100, 500, 250);
  K.position(20,410);

  for (let i=0; i<300; i++) {
    particulas.push(new particula());
  }
}

function draw() {
  background(30,30); //rastro

  fill(255,0,0);
  noStroke();
  circle(c.x,c.y,10);

  for (let p of particulas) {
    p.repeler(c);
    p.mover();
    p.mostrar();
  }
}

class particula {
  constructor() {
    this.r = 3
    this.pos= createVector(30,random(height));
    this.vel= createVector(5,0);
  }
  repeler(punto) {
    let f = p5.Vector.sub(this.pos, punto); //direccion de c hasta la particula
    let d = max(f.mag(), 5); //Distancia
    f.setMag(K.value()/(d*d)); //Fuerza de coulumb
    this.vel.add(f);     
  }
  mover() {
    this.pos.add(this.vel);
    if (this.pos.x > width - 20 || this.pos.x < 20) this.vel.x *= -1;
    if (this.pos.y > height - 20 || this.pos.y < 20) this.vel.y *= -1;
  }
  mostrar() {
    fill(100 + this.vel.mag() * 15 ,100,200);
    noStroke();
    circle(this.pos.x, this.pos.y, this.r*2)
  }
}
