// Areglos //
//un arreglo es una lista de valores

let numeros = [10, 20, 30]; //arreglo (lista)

// lista[i] : acceder al elemento i de la lista
//lista.length : numeros de elementos en la lista
// lista.push() : agregar valor al final
//lista.splice(i,1): borrar elemento i de la lista

console.log(numeros[0]);       // 10  (se empieza a contar desde 0)
console.log(numeros.length);   // 3 

let xs = [50, 120, 200, 300];

function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(30);
  
  
  for (let i = 0; i < xs.length; i++) {
    fill(255, 100, xs[i]);
    noStroke()
    circle(xs[i], 100, 20);
  }
}
