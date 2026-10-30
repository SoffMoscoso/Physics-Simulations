//además de hacer variar la posicion, podemos jugar con otros parametros
let size = 20
let rojo= 0

function setup() {
  createCanvas(400, 300);  
}

function draw() {
  background(30);
  
  fill(rojo, 100, 255-rojo); //cambio en el color en cada ciclo
  noStroke();
  circle(200, 150, size);   //radio del circulo cambiara en cada ciclo
  size += 0.8 ;              
  rojo +=0.45;
}
