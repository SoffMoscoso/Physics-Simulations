//////////////////////////////////////////////////////////////
//Clases
//una clase es un molde para crear objetos con datos y comportamiento propio

class Pelota {
  constructor() {  //valores iniciales
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
  }

  mover() {  //acciones
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width || this.x < 0) this.vx *= -1;
    if (this.y > height || this.y < 0) this.vy *= -1;
  }

  mostrar() { //objeto
    fill(255, 125, 200);
    circle(this.x, this.y, 16);
  }
}

//let p = new Pelota(): crear el objeto con la clase. (crear una pelota)
// p.mover() , p.mostrar() : usar la clase.

////////////////////////////////////////////////////////////////////

let pelotas = [];

function setup() {
  createCanvas(400, 300);
  
 for (let i = 0; i < 50; i++) {  //50 pelotas
    pelotas.push(new Pelota());  
  }
}

function draw() {
  background(30);
  for (let p of pelotas) {
    p.mover();
    p.mostrar();
  }
}
