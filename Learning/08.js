let size = 20;
let rojo = 255;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(30);
  
  if (mouseIsPressed) {  // moseIsPressed : Si se mantiene el click
    fill(255,0,0);
    
  } else {
    fill(255,220,0);
  }
  
  circle(mouseX, mouseY, 10); //mouseX, mouseY : sin mantenner el click 

  fill(rojo,100,100);
  circle(width/2, height/2,size);
}


//mousePressed y KeyPressed son funciones especiales, se ejecutan 
//con el click la primera y lo que se le asigne a la segunda
function mousePressed() {
  size += 10; //cada click 
  rojo -= 10;
  console.log(rojo)
  if (rojo<0) rojo = 255;  
}

function keyPressed() {
  if (key === "r" || key === "R") {
    size=20; //Se reinicia con la tecla R
    rojo = 255;
  }
}

