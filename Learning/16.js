///Exercise 2: Collision between particles
let particulas = [];
let K;
let c;

function setup() {
  createCanvas(400, 400);
  c = createVector(200,200)
  
  K = createSlider(100, 500, 250);
  K.position(20,410);
  K.style('accent-color', 'red');

  for (let i=0; i<150; i++) {
    particulas.push(new Particula());
  }
}

function draw() {
  background(30); 

  fill(255,0,0);
  noStroke();
  circle(c.x,c.y,10);

  for (let p of particulas) {
    p.repeler(c);
    p.mover();
  }
  //Colisions
  for (let i =0 ; i<particulas.length; i++) {
    for (let j= i+1; j<particulas.length; j++) {
      particulas[i].chocar(particulas[j]);
    }
  }
  for (let p of particulas) {
    p.mostrar();
  }
}

class Particula {
  constructor() {
    this.r = 4
    this.pos= createVector(random(width),random(height));
    this.vel= p5.Vector.random2D().mult(3);
  }
  repeler(punto) {
    let f = p5.Vector.sub(this.pos, punto); //direccion de c hasta la particula
    let d = max(f.mag(), 5); //Distancia
    f.setMag(K.value()/(d*d)); //Fuerza de coulumb
    this.vel.add(f);     
    this.vel.limit(8);
  }
  mover() {
    this.pos.add(this.vel);
    if (this.pos.x > width - 20 || this.pos.x < 20) this.vel.x *= -1;
    if (this.pos.y > height - 20 || this.pos.y < 20) this.vel.y *= -1;
  }
  chocar(otra) {
    let delta = p5.Vector.sub(otra.pos, this.pos); //vector entre ambos (la direccion de delta es hacia la otra)
    let d = delta.mag(); //distancia entre particulas
    let minimo = this.r + otra.r; //distancia minima de choque(radios)

    if (d<minimo && d>0) {
      let n = delta.copy().div(d) //direccion unitaria del choque

      //separarlas
      let traslape = minimo -d // "traspasar la particula"
      this.pos.sub(p5.Vector.mult(n, traslape/2)); //restar
      otra.pos.add(p5.Vector.mult(n, traslape/2));//sumar
      //otra está en la dirección +n respecto a this, así que sumarle n la aleja de this.
      //this está en la dirección -n respecto a otra, así que restarle n la aleja de otra.
  
      //velocidad relativa a lo largo del choque
      let vrel = p5.Vector.sub(this.vel, otra.vel).dot(n) //dot(n):producto punto. En el choque solo importa el movimiento a lo largo de la línea que une los centros. el producto punta determina la "componente" de v en la dirección de n.

      //rebote solo si se acercan
      if (vrel>0) {
        this.vel.sub(p5.Vector.mult(n,vrel));
        this.vel.add(p5.Vector.mult(n,vrel));
      }
    }
  }
  mostrar() {
    fill(215 ,100,200);
    noStroke();
    circle(this.pos.x, this.pos.y, this.r*2)
  }
}
