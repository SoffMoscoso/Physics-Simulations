///////funciones avanzadas de mouse y teclado//////////////////
//mousePressed(): al pulsar el boton (una vez)
//mouseDragged(): cuando el mouse se mueve con el boton pulsado
//mouseReleased(): Al soltar el boton (una vez)
let tam = 20;

function setup() {
  createCanvas(400, 300);
  background(30);
}

function draw() {
  // vacío: se dibuja desde los eventos
}

function mouseDragged() {
  fill(255, 220, 0);
  noStroke();
  circle(mouseX, mouseY, tam);
}

function mouseReleased() {
  tam = random(5, 40);    // nuevo tamaño de pincel en cada trazo
}
