//Rebote en dos dimensiones//
let x = 100, y = 100;
let vx = 3, vy = 2;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(0);
  fill(200, 120, 200);
  noStroke();
  circle(x, y, 60);

  x += vx;
  y += vy;

  if (x > width - 20 || x < 20) vx *= -1;
  if (y > height - 20 || y < 20) vy *= -1;
}
