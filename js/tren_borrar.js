/*
 * Tren:
 * Enemigo que se desplaza horizontal o verticalmente
 */

/*
Los parametros que recibe para su construccion son los siguientes:
tipo: si es horizontal o vertical
x: posicion x actual del enemigo en el mapa
y: posicion y actual del enemigo en el mapa
ancho: el ancho del enemigo
alto: el alto del enemigo
velocidad: es la velocidad de movimiento, pixeles que podra moverse en cada mov

rangoMov: los limites en el mapa donde se puede mover dependiendo del tipo elejido, 
  sera un diccionario de la siguiente forma: { desde: valor, hasta: valor }
 */
var Tren = function(tipo, x, y, velocidad, rangoMov) {
  /* ZombieCaminante llama al constructor de Enemigo utilizando los parametros
  necesarios */
  var lRangoMov, ancho, alto, sprite;
  switch (tipo) {
    case 'horizontal':
      lRangoMov = { desdeX: rangoMov.desde, hastaX: rangoMov.hasta, desdeY: 0, hastaY: 0 };
      ancho = 90;
      alto = 30;
      sprite = 'imagenes/tren_horizontal.png';
      break;
    case 'vertical':
    lRangoMov = { desdeX: 0, hastaX: 0, desdeY: rangoMov.desde, hastaY: rangoMov.hasta };
      ancho = 30;
      alto = 90;
      sprite = 'imagenes/tren_vertical.png';
      break;
    default:
      break;
  }
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, lRangoMov);
  this.tipo = tipo;
}
/* Completamos la creacion del objeto asignando su prototipo y la funcion
constructor para poder usarla con 'new' al crear nuevos Zombies Caminantes */
Tren.prototype = Object.create(Enemigo.prototype);
Tren.prototype.constructor = Tren;

Tren.prototype.mover = function() {
  // Hacer
}

/* El ataque lo toma de su prototipo Enemigo que ya implementa un metodo atacar
haciendole perder 1 vida al jugador. Si se quiere modificar el valor de ataque
del zombie caminante habra que reimplementar este metodo desde el objeto ZombieCaminante

ZombieConductor.prototype.atacar = function(jugador) {
  ...
}*/
