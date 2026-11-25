///////3D simulations//////////

function setup() {
  // Webgl usa la tarjeta grafica para dibujar en 3D
  createCanvas(400,400,WEBGL);
}

function draw() {
  background(0);
  normalMaterial(); //colorea segun la orientacion
  
  rotateX(frameCount*0.01);
  rotateY(frameCount*0.013);
//rotateZ(); version 3D de la funcion rotate()
  
  box(100); //cubo de 100 de lado
}

//////////////////////////////
//box(tamaño): cubo
//box(ancho,alto,fondo): rectangulo
//sphere(radio) , cylinder(r,h), torus(r,grosor), cone(r,h), plane(x,h)
