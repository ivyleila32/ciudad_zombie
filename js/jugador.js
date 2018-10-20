/* El objeto jugador es un objeto literal que se encuentra incompleto.
 Solo tiene asignadas algunas de sus propiedades y ningun metodo */
var Jugador = {
  /* el sprite contiene la ruta de la imagen
  */
  sprite: 'imagenes/auto_rojo_abajo.png',
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
// Hay que agregar lo que falte al jugador: movimientos, perdida de vidas,
// y todo lo que haga falta para que cumpla con sus responsabilidades
  perderVidas(cantVidas) {
    this.vidas -= cantVidas;
  },
  mover(x, y) {
    this.x = x;
    this.y = y;

  }
}



















var obj = {  
  nombre: 'Javier', 
  apellido: 'Marcelino', 
  saludar() { 
    return "Hola, Soy " + this.nombre; 
  }  
};
// Constructor de Nuestra Clase Empleado 
var Empleado = function(nombre, apellido, legajo) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.legajo = legajo;
  this.sueldo = 10000;
};
Empleado.prototype.saludar = function() {
  console.log(`Hola soy ${this.nombre} ${this.apellido}`);
};


var empleados = [];
empleados.push(new Empleado('Ivana', 'Di Biase', '1234'));
empleados.push(new Empleado('Francisco', 'Pane', '3333'));

