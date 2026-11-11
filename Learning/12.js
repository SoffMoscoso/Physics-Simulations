//crear y borrar particulas 
let particulas = [];

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(30);

  // Crea una nueva en cada cuadro
  particulas.push(new Chispa());

  // Recorre de atrás hacia adelante para poder borrar
  for (let i = particulas.length - 1; i >= 0; i--) {
    particulas[i].mover();
    particulas[i].mostrar();
    if (particulas[i].muerta()) {
      particulas.splice(i, 1);
    }
  }
}

class Chispa {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.vx = random(-2, 2);
    this.vy = random(-3, -1);
    this.vida = 255;
  }

  mover() {
    this.x += this.vx;
    this.y += this.vy;
    this.vida -= 4;
  }

  mostrar() {
    noStroke();
    fill(255, 50, 0, this.vida);   // se vuelve transparente
    circle(this.x, this.y, 8);
  }

  muerta() {
    return this.vida <= 0;
  }
}

