
// =====================================================================
//  Problemas: 1) alambre infinito  2) esfera conductora  3) anillo conductor
// =====================================================================


// ---------------------------------------------------------------------
// 1. VARIABLES GENERALES

// Variables del background
let escala = 45;
let anchoPanel = 270;
let anguloVista = 2.0;
let k = 8.99e9;         // constante de Coulomb, k = 1/(4·π·ε0), en N·m²/C²  (8.99e9 significa 8.99 × 10^9)
let nano = 1e-9;        // 1 nC (nanocoulomb) = 10^-9 C. Las cargas las escribimos en nC

// Variables donde guardaremos los controles de la pantalla
let selProblema; //deslizador problema
let sCarga, sRadio; // deslizadores de la carga y el radio del objeto
let sObjX, sObjY; // deslizadores de la posición del objeto
let sQ0, sQ0X, sQ0Y; // deslizadores de la carga de prueba
let chkLineas; // casilla para mostrar u ocultar las líneas de campo
let cajaResultados;     // resultados
let yPanel = 10;        // posición vertical del siguiente control (va bajando a medida que creamos controles)


// ---------------------------------------------------------------------

// 2. setup()
function setup() {
  let lienzo = createCanvas(windowWidth - anchoPanel, windowHeight, WEBGL);
  lienzo.position(anchoPanel, 0);
  
  //Paso 1: sistema de referencia
  titulo('1. Sistema de referencia');
  texto('Ejes: x morado, y negro, z naranja (z hacia arriba). Arrastra el dibujo hacia los lados para girarlo.');

  // ---- Paso 2: escoger el problema ----
  titulo('2. Problema');
  selProblema = createSelect();                // menú desplegable
  selProblema.option('Alambre infinito');
  selProblema.option('Esfera conductora');
  selProblema.option('Anillo conductor');
  selProblema.position(10, yPanel);
  yPanel += 34;
  selProblema.changed(cambioDeProblema);   
  // ---- Paso 3: el objeto cargado ----
  titulo('3. Parámetros del problema');
  sCarga = crearDeslizador(-10, 10, 3, 0.5);   // carga: de -10 a 10, empieza en 3, cambia de a 0.5
  sRadio = crearDeslizador(0.1, 3, 0.15, 0.05);
  sObjX  = crearDeslizador(-4, 4, 0, 0.1);
  sObjY  = crearDeslizador(-4, 4, 0, 0.1);
  
  // ---- Paso 4: la carga de prueba ----
  titulo('4. Carga de prueba q0');
  sQ0  = crearDeslizador(-5, 5, 1, 0.5); 
  sQ0X = crearDeslizador(-5, 5, 2.5, 0.1);
  sQ0Y = crearDeslizador(-5, 5, 0, 0.1);

  // ---- Paso 5: líneas de campo y resultados ----
  titulo('5. Líneas de campo');
  chkLineas = createCheckbox(' Mostrar líneas de campo', true);  // casilla marcada al inicio
  chkLineas.position(10, yPanel);
  yPanel += 34;

  cajaResultados = createDiv('');              // recuadro vacío; lo llenamos en draw()
  cajaResultados.position(10, yPanel);
  cajaResultados.style('width', '245px');
  cajaResultados.style('font-size', '13px');
  cajaResultados.style('font-family', 'sans-serif');
}

// 3. draw()
function draw() {
  // CALENTAMIENTO: en el primer cuadro (frameCount === 1) solo dibujamos una
  // rayita y una bolita pequeñas, FUERA de cualquier ciclo "for". Así el
  // navegador prepara el dibujo 3D sin que el editor crea que hay un ciclo infinito.
  // "return" termina draw() aquí; desde el segundo cuadro todo se dibuja normal.
  if (frameCount === 1) {
    stroke(0);
    line(0, 0, 0, 1, 1, 1);   // una rayita: prepara el dibujo de líneas
    lights();
    noStroke();
    sphere(1);                // una bolita: prepara el dibujo de figuras con luz
    return;
  }

  background(255, 240, 225);  // color de fondo
  actualizarTextos();                // escribimos junto a cada deslizador su valor actual

  // Condicional para la acción del mouse en el lienzo
  if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    anguloVista += (mouseX - pmouseX) * 0.01;
  }

  rotateX(PI / 2.3);
  rotateZ(anguloVista); // giro lateral, alrededor de z
  lights();  // para que las figuras se vean con volumen

  // Leemos los valores de los controles y los guardamos en variables
  let problema = selProblema.value();
  let carga = sCarga.value();
  let R = sRadio.value();
  let centro = createVector(sObjX.value(), sObjY.value(), 0);
  let q0 = sQ0.value();                                  
  let posQ0 = createVector(sQ0X.value(), sQ0Y.value(), 0);
  dibujarEjes();
  let signo = Math.sign(carga);
  if (chkLineas.checked() && signo !== 0) { 
    if (problema === 'Alambre infinito') lineasAlambre(centro, R, signo);
    if (problema === 'Esfera conductora') lineasEsfera(centro, R, signo);
    if (problema === 'Anillo conductor') lineasAnillo(centro, R, carga, signo);
  }

  // Campo eléctrico E en el lugar donde está la carga de prueba
  let E = campo(problema, posQ0, centro, R, carga);
  // Fuerza sobre la carga de prueba
  let F = p5.Vector.mult(E, q0 * nano);

  dibujarCargaDePrueba(posQ0, q0, F);
  dibujarObjeto(problema, centro, R, carga);
  escribirResultados(problema, posQ0, centro, R, carga, q0, E, F);
}

// 4. EL CAMPO ELÉCTRICO DE CADA PROBLEMA

function campo(problema, p, centro, R, carga) {
  if (problema === 'Alambre infinito') return campoAlambre(p, centro, R, carga);
  if (problema === 'Esfera conductora') return campoEsfera(p, centro, R, carga);
  return campoAnillo(p, centro, R, carga);
}

// Alambre infinito vertical, Fórmula: E = λ / (2·π·ε0·r) = 2·k·λ / r
function campoAlambre(p, centro, R, lambda) {
  let r = createVector(p.x - centro.x, p.y - centro.y, 0);
  let distancia = r.mag();                       // r = distancia perpendicular al alambre
  if (distancia < R) return createVector(0, 0, 0);   // dentro del alambre (conductor): E = 0
  return r.setMag(2 * k * lambda * nano / distancia);  // tamaño 2kλ/r, apuntando desde el alambre hacia el punto
}

// Esfera conductora de radio R con carga Q.
// Fórmula: E = k·Q / r²  afuera,  E = 0  adentro
function campoEsfera(p, centro, R, Q) {
  let r = p5.Vector.sub(p, centro);              // vector del centro de la esfera al punto
  let distancia = r.mag();                       // r = distancia al centro
  if (distancia < R) return createVector(0, 0, 0);   // dentro del conductor el campo es cero
  return r.setMag(k * Q * nano / (distancia * distancia));
}

// Anillo de radio a con carga Q. Su eje es paralelo al eje x y pasa por "centro".
// Fuera del eje no hay fórmula sencilla, así que partimos el anillo en
// 60 pedacitos de carga dq y sumamos el campo de cada pedacito,
// como si fuera una carga puntual:  dE = k·dq / d²  (principio de superposición).
function campoAnillo(p, centro, a, Q) {
  let N = 60;
  let dq = Q * nano / N;
  let Ex = 0, Ey = 0, Ez = 0; // componentes d E
  for (let i = 0; i < N; i++) {   // repetimos para cada pedacito i = 0, 1, 2, ..., 59
    let phi = TWO_PI * i / N;     // ángulo del pedacito alrededor del anillo
    // Posición del pedacito: el anillo está en un plano paralelo al plano yz
    let px = centro.x;
    let py = centro.y + a * cos(phi);
    let pz = centro.z + a * sin(phi);
    // Vector que va del pedacito al punto p, y su distancia
    let dx = p.x - px, dy = p.y - py, dz = p.z - pz;
    let d = sqrt(dx * dx + dy * dy + dz * dz);
    let f = k * dq / (d * d * d);
    Ex += f * dx;
    Ey += f * dy;
    Ez += f * dz;
  }
  return createVector(Ex, Ey, Ez);
}


// 5. LÍNEAS DE CAMPO

function lineasEsfera(centro, R, signo) {
  for (let i = 1; i <= 5; i++) {
    let theta = i * PI / 6;
    for (let j = 0; j < 8; j++) {
      let phi = j * TWO_PI / 8;
      let dir = createVector(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta));
      lineaRecta(centro, dir, R, R + 4, signo);
    }
  }
  lineaRecta(centro, createVector(0, 0, 1), R, R + 4, signo);
  lineaRecta(centro, createVector(0, 0, -1), R, R + 4, signo);
}



function lineasAlambre(centro, R, signo) {
  for (let z = -4; z <= 4; z += 2) {          for (let j = 0; j < 8; j++) {
      let phi = j * TWO_PI / 8;
      let dir = createVector(cos(phi), sin(phi), 0);
      let puntoDelAlambre = createVector(centro.x, centro.y, z);
      lineaRecta(puntoDelAlambre, dir, R, R + 4, signo);
    }
  }
}

// Escoge el color de las líneas de campo según el signo de la carga:
// rojo si la carga es positiva (las líneas salen) y azul si es negativa (las líneas entran)
function colorLineas(signo) {
  if (signo > 0) {
    stroke(200, 30, 30);    // rojo
  } else {
    stroke(30, 70, 200);    // azul
  }
}

function lineaRecta(origen, dir, desde, hasta, signo) {
  let a = p5.Vector.add(origen, p5.Vector.mult(dir, desde));
  let b = p5.Vector.add(origen, p5.Vector.mult(dir, hasta));   
  colorLineas(signo);       // rojo si la carga es +, azul si es −
  strokeWeight(1.5);                                            
  linea(a, b);
  let medio = p5.Vector.add(origen, p5.Vector.mult(dir, (desde + hasta) / 2));

  flecha(medio, p5.Vector.mult(dir, signo), 0.25);
}

// Anillo: las líneas NO son rectas, así que las "seguimos" paso a paso:
// empezamos cerca del anillo y en cada paso avanzamos un poquito en la
// dirección del campo en ese punto. Así se dibuja la curva.

let curvasAnillo = [];  
let datosAnteriores = '';

function lineasAnillo(centro, a, Q, signo) {
  let datos = centro.x + ',' + centro.y + ',' + a + ',' + Q;
  if (datos !== datosAnteriores) {
    calcularCurvasAnillo(centro, a, Q, signo);
    datosAnteriores = datos; 
  }
  // Dibujamos las curvas guardadas
  colorLineas(signo);       // rojo si la carga es +, azul si es −
  strokeWeight(1.5);
  noFill();     
  for (let curva of curvasAnillo) {
    beginShape();  
    for (let p of curva.puntos) {
      vertex(p.x * escala, -p.y * escala, p.z * escala);   
    }
    endShape(); 
    for (let f of curva.flechas) flecha(f.punto, f.dir, 0.22);   
  }
}

function calcularCurvasAnillo(centro, a, Q, signo) {
  curvasAnillo = [];  
  for (let j = 0; j < 12; j++) {         
    let phi = j * TWO_PI / 12;
    let enAnillo = createVector(centro.x, centro.y + a * cos(phi), centro.z + a * sin(phi));

    let salidas = [createVector(0, cos(phi), sin(phi)), createVector(1, 0, 0), createVector(-1, 0, 0)];
    for (let s of salidas) {
      let inicio = p5.Vector.add(enAnillo, p5.Vector.mult(s, 0.08));   curvasAnillo.push(seguirLinea(inicio, centro, a, Q, signo)); 
    }
  }
}


function seguirLinea(p, centro, a, Q, signo) {
  let curva = { puntos: [p], flechas: [] }; 
  let paso = 0.08;     
  for (let n = 0; n < 90; n++) { 
    let E = campoAnillo(p, centro, a, Q);    
    if (E.mag() === 0) break;            
    let dir = E.copy().normalize().mult(signo);
    p = p5.Vector.add(p, p5.Vector.mult(dir, paso)); 
    curva.puntos.push(p);               
    if (n === 15 || n === 50) {  
      curva.flechas.push({ punto: p, dir: p5.Vector.mult(dir, signo) });
    }
    if (p5.Vector.dist(p, centro) > 6) break; 
  }
  return curva;
}


// 6. DIBUJOS: EJES, OBJETOS, CARGA DE PRUEBA


function linea(a, b) {
  line(a.x * escala, -a.y * escala, a.z * escala, b.x * escala, -b.y * escala, b.z * escala);
}

function irA(p) {
  translate(p.x * escala, -p.y * escala, p.z * escala);
}

function flecha(punta, direccion, tam) {
  let d = direccion.copy().normalize();
  let ayuda = createVector(0, 0, 1);
  if (abs(d.z) > 0.9) ayuda = createVector(1, 0, 0);
  let lado1 = p5.Vector.cross(d, ayuda).normalize();  
  let lado2 = p5.Vector.cross(d, lado1);
  let atras = p5.Vector.sub(punta, p5.Vector.mult(d, tam));  
  linea(punta, p5.Vector.add(atras, p5.Vector.mult(lado1, tam * 0.5)));
  linea(punta, p5.Vector.sub(atras, p5.Vector.mult(lado1, tam * 0.5)));
  linea(punta, p5.Vector.add(atras, p5.Vector.mult(lado2, tam * 0.5)));
  linea(punta, p5.Vector.sub(atras, p5.Vector.mult(lado2, tam * 0.5)));
}

// Sistema de referencia: piso cuadriculado y ejes x, y, z
function dibujarEjes() {
  let L = 5;
  stroke(128, 128, 128, 60); 
  strokeWeight(1);
  for (let i = -L; i <= L; i++) {
    linea(createVector(i, -L, 0), createVector(i, L, 0)); 
    linea(createVector(-L, i, 0), createVector(L, i, 0)); 
  }
  strokeWeight(2.5);
  stroke(128, 0, 128); 
  linea(createVector(-L, 0, 0), createVector(L, 0, 0));
  flecha(createVector(L, 0, 0), createVector(1, 0, 0), 0.35);
  stroke(0, 0, 0);
  linea(createVector(0, -L, 0), createVector(0, L, 0));
  flecha(createVector(0, L, 0), createVector(0, 1, 0), 0.35);
  stroke(255, 165, 0); 
  linea(createVector(0, 0, -L), createVector(0, 0, L));
  flecha(createVector(0, 0, L), createVector(0, 0, 1), 0.35);
}


function colorCarga(q) {
  if (q > 0) return color(225, 80, 75);
  if (q < 0) return color(60, 130, 230);
  return color(150);
}

function dibujarObjeto(problema, centro, R, carga) {
  push();                       
  irA(centro);                 
  noStroke();                  
  if (problema === 'Esfera conductora') {
    fill(185, 188, 195);                   // plateado macizo (sin transparencia)
    sphere(R * escala);                    
  }
  if (problema === 'Alambre infinito') {
    fill(185, 188, 195);                   // plateado macizo, igual que la esfera
    rotateX(PI / 2);                     
    cylinder(R * escala, 12 * escala);   
  }
  if (problema === 'Anillo conductor') {
    fill(212, 175, 55);                    // dorado macizo
    rotateY(PI / 2); 
    torus(R * escala, 0.06 * escala);
  }
  pop();
}

function dibujarCargaDePrueba(pos, q0, F) {

  push();
  irA(pos);
  noStroke();
  fill(colorCarga(q0));
  sphere(0.15 * escala);      
  pop();
  if (F.mag() > 0) {
    let dir = F.copy().normalize();
    let punta = p5.Vector.add(pos, p5.Vector.mult(dir, 1.2));
    stroke(0, 150, 70);         // verde: se distingue del fondo, de los ejes y de las líneas azules
    strokeWeight(4);
    linea(pos, punta);
    flecha(punta, dir, 0.3);
  }
}



// 7. TEXTOS DEL PANEL


function titulo(t) {
  let p = createP('<b>' + t + '</b>');
  p.position(10, yPanel);
  p.style('margin', '0');
  p.style('font-family', 'sans-serif');
  yPanel += 26;
}


function texto(t) {
  let p = createP(t);
  p.position(10, yPanel);
  p.style('margin', '0');
  p.style('width', '245px');
  p.style('font-size', '12px');
  p.style('font-family', 'sans-serif');
  yPanel += (t.length > 40) ? 52 : 26;   
}


function crearDeslizador(min, max, inicial, paso) {
  let etiqueta = createP('');
  etiqueta.position(10, yPanel);
  etiqueta.style('margin', '0');
  etiqueta.style('font-size', '12px');
  etiqueta.style('font-family', 'sans-serif');
  let s = createSlider(min, max, inicial, paso);
  s.position(10, yPanel + 16);
  s.style('width', '240px');
  s.etiqueta = etiqueta;       
  yPanel += 44;
  return s;
}


function actualizarTextos() {
  let problema = selProblema.value();
  let nombreCarga = (problema === 'Alambre infinito') ? 'Carga por metro λ (nC/m)' : 'Carga Q (nC)';
  let nombreRadio = (problema === 'Anillo conductor') ? 'Radio del anillo a (m)' : 'Radio R (m)';
  sCarga.etiqueta.html(nombreCarga + ': ' + sCarga.value());
  sRadio.etiqueta.html(nombreRadio + ': ' + sRadio.value());
  sObjX.etiqueta.html('Posición x del objeto (m): ' + sObjX.value());
  sObjY.etiqueta.html('Posición y del objeto (m): ' + sObjY.value());
  sQ0.etiqueta.html('Carga de prueba q0 (nC): ' + sQ0.value());
  sQ0X.etiqueta.html('Posición x de q0 (m): ' + sQ0X.value());
  sQ0Y.etiqueta.html('Posición y de q0 (m): ' + sQ0Y.value());
}

// Cuando cambia el problema, ponemos un radio razonable para esa figura
function cambioDeProblema() {
  let problema = selProblema.value();
  if (problema === 'Alambre infinito') sRadio.value(0.15);
  if (problema === 'Esfera conductora') sRadio.value(1);
  if (problema === 'Anillo conductor') sRadio.value(1.5);
}


function formato(n) {
  if (n === 0) return '0';
  if (abs(n) >= 0.01 && abs(n) < 10000) return n.toFixed(2);   
  return n.toExponential(2);
}

function escribirResultados(problema, p, centro, R, carga, q0, E, F) {
  let t = '<b>Resultados</b><br>';      
  if (problema === 'Alambre infinito') {
    let r = dist(p.x, p.y, centro.x, centro.y); 
    t += 'Fórmula: E = λ / (2π ε0 r)<br>';
    t += 'Distancia al alambre r = ' + formato(r) + ' m<br>';
    if (r < R) t += 'q0 está DENTRO del alambre, así que E = 0.<br>';
  }
  if (problema === 'Esfera conductora') {
    let r = p5.Vector.dist(p, centro);   
    t += 'Fórmula: E = k Q / r² (afuera), E = 0 (adentro)<br>';
    t += 'Distancia al centro r = ' + formato(r) + ' m<br>';
    if (r < R) t += 'q0 está DENTRO del conductor, así que E = 0.<br>';
  }
  if (problema === 'Anillo conductor') {
    let x = p.x - centro.x;              
    let alEje = abs(p.y - centro.y);              // qué tan lejos está q0 del eje
    t += 'Sobre el eje: E = k Q x / (x² + a²)^(3/2)<br>';
    t += 'x = ' + formato(x) + ' m, distancia al eje = ' + formato(alEje) + ' m<br>';
    if (alEje < 0.05) {
      let Eformula = k * carga * nano * x / pow(x * x + R * R, 1.5);
      t += 'Estás sobre el eje. Fórmula: Ex = ' + formato(Eformula) + ' N/C<br>';
    } else {
      t += 'Fuera del eje: el valor sale de sumar 60 pedacitos del anillo.<br>';
    }
  }
  t += '|E| = ' + formato(E.mag()) + ' N/C<br>';
  t += 'E = (' + formato(E.x) + ', ' + formato(E.y) + ', ' + formato(E.z) + ') N/C<br>';
  t += 'F = q0·E, |F| = ' + formato(F.mag()) + ' N<br>';
  t += 'La flecha verde muestra la dirección de F.';
  cajaResultados.html(t);
}


function windowResized() {
  resizeCanvas(windowWidth - anchoPanel, windowHeight);
}
