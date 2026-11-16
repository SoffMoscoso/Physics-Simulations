//////LIENZO DE PINTURA////////////////

let pintura;

function setup() {
  createCanvas(400, 400);
  pintura = createGraphics(400, 400);
}

function draw() {
  background(0);

  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      pintura.stroke(255, 80, 80);
      pintura.strokeWeight(8);
      pintura.line(pmouseX, pmouseY, mouseX, mouseY);
    } else {
      pintura.erase();   // modo borrador
      pintura.strokeWeight(20);
      pintura.line(pmouseX, pmouseY, mouseX, mouseY);
      pintura.noErase();
    }
  }

  image(pintura, 0, 0);
}

//capa.clear(): borrar capa completa
//capa.erase(): escoger que borrar
//image(capa,x,y): mostrar capa
