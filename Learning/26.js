let peces = [];

function setup() {
  createCanvas(400, 300);
  
  for (let i=0 ; i<20; i++) {
    peces.push( new Pez());
  }
  
}

function draw() {
  background(30);

  for (let p of peces) {
    p.mover();
    p.mostrar();
  }

}

class Pez {
  constructor() { //condiciones iniciales
    this.pos = createVector(random(width), random(height));
    this.vel= createVector(0,0)

  }
  mover() { //ejecucion en cada cuadro de tiempo
    this.objetivo = createVector(mouseX, mouseY);
    this.deseo = p5.Vector.sub(this.objetivo,this.pos); 
    this.deseo.setMag(0.2);
    
    this.vel.add(this.deseo);
    this.vel.limit(4);
    this.pos.add(this.vel);
   
  }
  mostrar() { 
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading()); 
    fill(105,200,250);
    noStroke();
    triangle(15,0,-10,-8,-10,8);
    pop();
  } 
}
