////other functions of p5.sound()/////////////////////

//new p5.Oscillator(type):  genera un tono
//osx.freq(hz)/osc.amp(v): frecuencia y volumen

//loadSound("archivo"): carga un audio en preload()
//play() / pause() / loop() / stop():  controla la reproduccion

//new p5.FFT() : espectro de frecuencias
// analyze(): devuelve un arreglo, las posiciones altas son los agudos y las bajas los graves
// fft.getEnergy("bass"): energia de graves, medios(mid) o agudos(treble)

// new p5.AudioIn(): activar microfono
// userStarAudio(): activa el audio del navegador
//mic.star(): pide permiso para el microfono
------------------------------------------------------------------------

let cancion, fft;

function preload() {
  cancion = loadSound('musica.mp3');
}

function setup() {
  createCanvas(512, 300);
  colorMode(HSB);
  noStroke();
  fft = new p5.FFT(0.8, 64);        // suavizado, número de barras
}

function draw() {
  background(0);
  let espectro = fft.analyze();     // arreglo de valores 0 a 255

  let ancho = width / espectro.length;
  for (let i = 0; i < espectro.length; i++) {
    let alto = map(espectro[i], 0, 255, 0, height);
    fill(map(i, 0, espectro.length, 0, 300), 100, 100);
    rect(i * ancho, height - alto, ancho - 1, alto);
  }
}

function mousePressed() {
  if (!cancion.isPlaying()) cancion.loop();
}
