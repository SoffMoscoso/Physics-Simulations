////createGraphics(): crea un lienzo invisible donde se dibuja aparte, luego se pega sobre el lienzo principal con image(). La capa conserva lo dibujado.

let capa;

function setup() {
  createCanvas(400,400);
  capa = createGraphics(400,400); //lienzo auxiliar
  capa.background(15);
}

function draw() {
  
  // Desvanece lo anterior
  //capa.noStroke();
  //capa.fill(15, 10);               // mismo color del fondo, alpha bajo
  //capa.rect(0, 0, width, height);
  
  //Dibujar en la capa con el prefijo capa
  capa.fill(5,190,220);
  capa.noStroke();
  capa.circle(mouseX,mouseY, 20);

  //pegar la capa al lienzo
  image(capa,0,0); 
}
