//p5.oscillator es una clase que viene incluida en la libreria p5.sound que permite generar sonido

let osc;
let sonando = false;

function setup() {
  createCanvas(400, 300);
  osc = new p5.Oscillator('sine');   // 'sine', 'triangle', 'square', 'sawtooth'
}

function draw() {
  background(30);

  if (sonando) {
    let frec = map(mouseX, 0, width, 100, 800);   // frecuencia en Hz
    let vol = map(mouseY, height, 0, 0, 0.5);     // volumen de 0 a 1
    osc.freq(frec);
    osc.amp(vol);
  }

  fill(255);
  textAlign(CENTER, CENTER);
  text(sonando ? "Mueve el mouse" : "Haz clic para empezar", width / 2, height / 2);
}

function mousePressed() {
  if (!sonando) {
    osc.start();
    sonando = true;
  } else {
    osc.stop();
    sonando = false;
  }
}
