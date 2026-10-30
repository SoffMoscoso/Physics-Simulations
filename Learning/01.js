function setup() {  //se ejecuta una sola vez

 // en setup() se prepara el tamaño del lienzo, los botones,  y las posiciones iniciales. 
  
  createCanvas(400, 300);  //crea el lienzo en el cual se dibuja
  background(0);   //toma valores de 0-255 para la escala de grises
  console.log("setup ejecutado") //inserta mensajes en la consola. se usa para visualizar que esta pasando en la ejecucion.
}

function draw() {  //se ejecuta de forma continua, 60 veces/s
  
//  en draw() se construye la secuencia, cada ejecucion es un cuadro de animacion. 
  
  background(220); //pinta el lienzo de gris
  console.log("draw ejecutado")
}
