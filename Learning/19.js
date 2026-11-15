//solar system
function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(0);
  let ang = frameCount * 0.03; //frameCount cuenta los cuadros dibujados desde el inicio del programa (como un reloj)
  let x = width / 2 + cos(ang) * 100;
  let y = height / 2 + sin(ang) * 100;

  let x1 = width / 2 + cos(ang*2) * 150;
  let y2 = height / 2 + sin(ang*2) * 150;
  
  fill(200, 200, 0);
  circle(width / 2, height / 2, 40);   // sol

  // planetas
  fill(100, 180, 255);
  circle(x, y, 25);
  
   fill(200, 180, 255);
  circle(x1, y2, 15); 
}
