// pmouseX y pmouseY: guardan la posicion del mouse en el cuadro anterior
function setup() {
  createCanvas(400, 300);
  background(30);
}

function draw() {
  if (mouseIsPressed) {
    stroke(255, 220, 0);
    strokeWeight(6);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

//la diferencia mouseX-pmouseX es la VELOCIDAD DEL MOUSE, se puede definir: 
//let velMouse = createVector(mouseX - pmouseX, mouseY - pmouseY);
