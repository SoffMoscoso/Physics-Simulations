//////////////////
//sen() y cos() los angulos van en radianes, implica la oscilacion entre -1 y 1 de forma suave.
///////////////////////////

let x= 0 , y = 0;
let W = [0,1,2,3,4,];

function setup() {
  createCanvas(400,400);
}

function draw() {
  background(0,30);

  for (let w of W) {
    let y = 200+sin(frameCount*0.05*w)*80;
    
    circle(100*w,y,30);
  }
  
}
