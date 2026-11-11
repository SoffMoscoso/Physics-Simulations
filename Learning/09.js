//Todo en el mismo
// Slider & Buttom
let size = 20;
let rojo = 255;
let slider;
let boton;
let contador =1;

function setup() {
  createCanvas(400, 300);

  //Controlador manual de una variable
  slider = createSlider(0,250,30); //min. max, init
  slider.position(20,320);

  //activador de una funcion(boton)
  boton = createButton("Sumar")
  boton.position(20,300);
  boton.mousePressed(sumar); // en el argumento la funcion
}

function draw() {
  background(slider.value());
  
  
  if (mouseIsPressed) {  // moseIsPressed : Si se mantiene el click
    fill(255,0,0); 
  } else {
    fill(255,220,0);
  }

  noStroke();
  circle(mouseX, mouseY, 10); //mouseX, mouseY : sin mantenner el click 

  fill(rojo,100,100);
  noStroke();
  circle(width/2, height/2,size);

  fill(255);
  textSize(40);
  textAlign(CENTER,CENTER);
  text(contador, width/2, height/2);
}

function sumar() {
  contador++;
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
