let y= 0
let x = 200;
let vx = 3;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(30);


  fill(250, 100, 255);
  noStroke();
  rect(200,y,20,20);
  y +=1;
  
  fill(255, 0, 0);
  noStroke();
  circle(x, 150, 40);
  x += vx;

  if (y > width){
    y=0 //vuelve arriba
  }

  if (x > width - 20 || x < 20) {
    vx *= -1;       // invierte la dirección (rebote)
  }
}
