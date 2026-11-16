//////////////Imagenes, texto y tipografia//////////////
//preload(): es una funcion que carga arrchivos antes de setup()
//loadImage(): carga la imagen.
//loadFont(): carga una fuente de texto.
//image(img,x,y,w,h): la dibuja con su esquina superior izquierda en (x,y)
//imageMode(CENTER): ubica y fija la imagen en el centro
//tint() / noTint(): tiñe o da transparencia
//textFont() / textStyle(): fuente y estilo del texto
// text(t,x,y,w,h): cuadro de texto
//textWidth(t): ancho del texto en pixeles
/////////////////////////////////////////////////////////////////////

let foto;

function preload() {
  foto = loadImage('image.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {

  background(30);
  fill(255, 220, 0);
  textSize(32);
  textStyle(BOLD);              // NORMAL, BOLD, ITALIC, BOLDITALIC
  textFont('Georgia');          // fuente instalada en el sistema
  textAlign(CENTER, CENTER);
  text("Galaxy", width / 2, 80);

  // Texto dentro de una caja: se divide en líneas solo
  textSize(16);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);
  text("Este texto largo se ajusta automáticamente al ancho de la caja que le des.",
       50, 140, 300, 100);      // x, y, ancho, alto
  
  image(foto, 0, 0, 200, 150);  // x, y, ancho, alto (estira la imagen)
  imageMode(CENTER);
  image(foto, width / 2, height / 2);   // (x, y) es el centro
}
