//la funcion translate toma ahora 3 argumentos: translate(x,y,z)
//con z positivo se acerca y z negativo se aleja.
let x = -100;
let y = -200;

let vx = 5;
let vy = 5;

function setup() {
  createCanvas(400,400,WEBGL);
}

function draw() {
  background(20);
  normalMaterial();

//las formas 3d se ubican en la mitad de las coordenadas del lienzo, para moverlas hay que jugar con el sistema coordenado
  push();
  translate(x,y,0)
  rotateX(frameCount*0.5)
  rotateY(frameCount*0.01)
  sphere(20); 
  pop();

  x += vx;
  y += vy;

  if (x > width/2 || x < -200) vx *= -1;
  if (y > height/2 || y < -200) vy *= -1;

}
