//noise(): aleatoriedad suave. valores que cambian poco de un instante al siguiente (entre 0 y 1).
let t = 0;
 function setup() {
   createCanvas(400,300);
 }

function draw() {
  background(30);
  let x = noise(t)*width;
  let y = noise(t+1000)*height;

  console.log(x)
  
  fill(255,100,200);
  circle(x,y,30);
  t += 0.01;
}
