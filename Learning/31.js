///////funciones avanzadas de mouse y teclado//////////////////

//KeyPressed() ocurre una vez por pulsacion. Para movimiennto continuo mientras se mantiene una tecla se usa KeyIsDown()

let x = 200, y = 150;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(30);
  text("¡mueveme con las flechas!",100,100)

  if (keyIsDown(LEFT_ARROW))  x -= 3;
  if (keyIsDown(RIGHT_ARROW)) x += 3;
  if (keyIsDown(UP_ARROW))    y -= 3;
  if (keyIsDown(DOWN_ARROW))  y += 3;

  fill(255, 120, 190);
  circle(x, y, 30);
}
