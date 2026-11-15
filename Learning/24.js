//color avanzado///////////
// RGB --> Red, Green, Blue 
// HSB --> Hue, Saturation, Brightness 
// 0 = rojo, 60 = amarillo, 120 = verde, 180 = cian , 240 = azul , 300 = magenta, 360 = rojo

function setup() {
  createCanvas(400, 300);
  colorMode(HSB);
  //noStroke();
}

function draw() {
  
  background(0);

    //Arcoiris
  for (let i = 0; i < 360; i++) {
    fill(i, 100, 100);
    rect(i * (width / 360), 0, width / 360 + 1, height);
  }
  

  //Con el mismo tono, S y B dan variantes del mismo color
  fill(0, 100, 100);      // verde vivo
  circle(100, 150, 80);
  fill(0, 30, 100);       // verde pálido
  circle(200, 150, 80);
  fill(0, 100, 40);       // verde oscuro
  circle(300, 150, 80);

  let tono = (frameCount * 2) % 360;    // 0 a 359, y vuelve a empezar
  fill(tono, 100, 100);
  circle(mouseX, mouseY, 30);
}
