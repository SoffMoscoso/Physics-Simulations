//colors
const C = {
  fondo:       [10, 10, 10],
  trayectoria: [255, 255, 255],   // partículas alfa: blancas
  zns:         [150, 150, 150],   // pantalla de ZnS: gris
  colimador:   [120, 120, 120],
  fuente:      [255, 255, 255],
  atomoNube:   [255, 220, 0],     // nube de electrones
  nucleo:      [255, 20, 20],
  thomson:     [255, 220, 0],
  destello:    [120, 255, 170],
  texto:       [230, 230, 230],
  histograma:  [255, 220, 0]        // histograma: amarilla
};

let cx, cy;
const R = 220;
let atomos = [];
let particulas = [];
let destellos = [];
let estela;
let slider;
let boton;
let modoRutherford = true;
let bins = new Array(12).fill(0);
let total = 0, grandes = 0;

function setup() {
  createCanvas(900, 450);
  cx = width / 1.8;
  cy = height / 1.8;

  boton = createButton('Limpiar');
  boton.position(20, 330);
  boton.mousePressed(limpiar);

  slider = createSlider(5, 60, 20);
  slider.position(20, 370);
  slider.style('width', '170px');
  slider.style('accent-color', 'red');

  estela = createGraphics(width, height);
  estela.background(...C.fondo);

  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 9; r++) {
      atomos.push(createVector(cx + (c - 1.5) * 14, cy + (r - 4) * 14));
    }
  }
}

function draw() {
  estela.noStroke();
  estela.fill(...C.fondo, 25);
  estela.rect(0, 0, width, height);

  for (let i = 0; i < 2; i++) particulas.push(new Alfa());

  for (let i = particulas.length - 1; i >= 0; i--) {
    particulas[i].actualizar();
    particulas[i].dibujarEnEstela();
    if (particulas[i].detectada) particulas.splice(i, 1);
  }

  background(...C.fondo);
  image(estela, 0, 0);
  dibujarMontaje();
  dibujarAtomos();
  dibujarDestellos();
  dibujarPanel();
}

class Alfa {
  constructor() {
    this.pos = createVector(cx - R + 5, cy + random(-35, 35));
    this.vel = createVector(6, 0);
    this.entro = false;
    this.detectada = false;
  }

  actualizar() {
    let K = slider.value();
    let radioAtomo = 7;
    for (let a of atomos) {
      let f = p5.Vector.sub(this.pos, a);
      let d2 = f.magSq();
      if (d2 > 2500) continue;
      let d = max(sqrt(d2), 1);
      let mag;
      if (modoRutherford) {
        mag = K / (d * d);
      } else {
        mag = d < radioAtomo ? K * d / pow(radioAtomo, 3) : K / (d * d);
      }
      f.setMag(mag);
      this.vel.add(f);
    }
    this.pos.add(this.vel);

    let d = dist(this.pos.x, this.pos.y, cx, cy);
    if (d < 60) this.entro = true;

    if (this.entro && d >= R) {
      this.detectada = true;
      let ang = abs(degrees(atan2(this.pos.y - cy, this.pos.x - cx)));
      bins[min(floor(ang / 15), 11)]++;
      total++;
      if (ang > 90) grandes++;
      destellos.push({ x: this.pos.x, y: this.pos.y, vida: 255 });
    }
    if (d > R + 40) this.detectada = true;
  }

  dibujarEnEstela() {
    estela.noStroke();
    estela.fill(...C.trayectoria);
    estela.circle(this.pos.x, this.pos.y, 2.5);
  }
}

function dibujarMontaje() {
  noFill();
  stroke(...C.zns, 255);          // gris sólido
  strokeWeight(3);
  circle(cx, cy, R * 2);

  noStroke();
  fill(...C.colimador);
  rect(cx - R - 22, cy - 60, 18, 52);
  rect(cx - R - 22, cy + 8, 18, 52);
  fill(...C.fuente);
  rect(cx - R - 50, cy - 8, 28, 16);

  fill(...C.texto);
  textSize(11);
  textAlign(CENTER);
  text("Fuente α", cx - R - 36, cy + 85);
  text("Colimador de plomo", cx - R - 36, cy + 100);
  text("Pantalla de ZnS", cx, cy - R - 10);
  text("Lámina de oro", cx, cy + 85);
}

function dibujarAtomos() {
  noStroke();
  for (let a of atomos) {
    if (modoRutherford) {
      fill(...C.atomoNube, 150);   // amarillo visible
      circle(a.x, a.y, 14);
      fill(...C.nucleo);
      circle(a.x, a.y, 3);
    } else {
      fill(...C.thomson, 90);
      circle(a.x, a.y, 14);
    }
  }
}

function dibujarDestellos() {
  noStroke();
  for (let i = destellos.length - 1; i >= 0; i--) {
    let d = destellos[i];
    fill(...C.destello, d.vida);
    circle(d.x, d.y, 6);
    d.vida -= 6;
    if (d.vida <= 0) destellos.splice(i, 1);
  }
}

function dibujarPanel() {
  const px = 20;
  fill(...C.texto);
  noStroke();
  textAlign(LEFT);
  textSize(14);
  text(modoRutherford ? "RUTHERFORD EXPERIMENT" : "THOMSON MODEL", px, 35);
  textSize(12);
  text("Detectadas: " + total, px, 60);
  text("Desviadas > 90°: " + grandes, px, 77);
  if (total > 0) text("(" + nf(100 * grandes / total, 1, 2) + " %)", px, 94);
  text("Carga K = " + slider.value(), px, 370);

  text("Partículas por ángulo (log)", px, 160);
  for (let i = 0; i < 12; i++) {
    let h = log(1 + bins[i]) * 14;
    fill(...C.histograma);
    rect(px + i * 14, 290 - h, 11, h);
    fill(180);
    textSize(9);
    if (i % 3 === 0) text(i * 15 + "°", px + i * 14, 304);
  }
  fill(160);
  textSize(11);
  text("M: cambiar de modelo", px, 400);
}

function keyPressed() {
  if (key === 'm' || key === 'M') {
    modoRutherford = !modoRutherford;
    limpiar();
  }
}

function limpiar() {
  bins.fill(0);
  total = 0;
  grandes = 0;
  particulas = [];
  destellos = [];
  estela.background(...C.fondo);
}
