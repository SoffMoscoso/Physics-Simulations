function setup() {
  createCanvas(400,400);
  angleMode(DEGREES)
}

function draw() {
  background(0);
  translate(width/2, height/2);
  rotate(-90);
  
  let s = map(second(), 0, 60, 0, 360);
  let m = map(minute(), 0, 60, 0, 360);
  let h = map(hour() % 12, 0, 12, 0, 360);

  ///Forma del reloj
  fill(0,0,0);
  stroke(255,255,255);
  strokeWeight(4);
  circle(0,0,400);

  ///segundos
  push();
  rotate(s);
  stroke(255,255,0);
  strokeWeight(3);
  line(0,0,170,0);
  pop();

  ///minutos
  push();
  rotate(m);
  stroke(255,165,0);
  strokeWeight(5);
  line(0,0,140,0);
  pop();

  //horas
  push();
  rotate(h);
  stroke(255,0,0);
  strokeWeight(7);
  line(0,0,100,0);
  pop();
  
}
