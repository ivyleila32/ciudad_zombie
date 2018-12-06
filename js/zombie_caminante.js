/* Aca podes encontrar al zombie caminante cuyo codigo esta completo. Podes
modificarlo para hacer que se comporte de la forma que mas te guste.
Este zombie recibe los mismos parametros que el objeto Enemigo. Podes consultar
el archivo Enemigo.js para entender que es cada uno. */

var ZombieCaminante = function(sprites, x, y, ancho, alto, velocidad, rangoMov, potencia) {
  /* ZombieCaminante llama al constructor de Enemigo utilizando los parametros
  necesarios */
  
  Enemigo.call(this, null, x, y, ancho, alto, velocidad, rangoMov,potencia);
  this.sprites = sprites;
  this.girar();
}
/* Completamos la creacion del objeto asignando su prototipo y la funcion
constructor para poder usarla con 'new' al crear nuevos Zombies Caminantes */
ZombieCaminante.prototype = Object.create(Enemigo.prototype);
ZombieCaminante.prototype.constructor = ZombieCaminante;

ZombieCaminante.prototype.girar = function() {
  // Si la velocidad es negativa la direccion es derecha
  if (this.velocidad < 0) { 
    this.sprite = this.sprites['derecha'];
  } else { // Si no la direccion es izquierda
    this.sprite = this.sprites['izquierda'];
  }
};
ZombieCaminante.prototype.mover = function() {
  /* Los movimientos estan basados en un numero aleatorio
  La direccion horizontal es siempre la misma y va ondulando verticalmente.
  Esto hasta llegar a sus limites, donde se invierte su direccion horizontal */
  if (Math.random() < 0.5) {
    this.x -= this.velocidad;
    this.y -= this.velocidad;
  } else {
    //Sino, hace otro movimiento
    this.y += this.velocidad;
    this.x -= this.velocidad;
  }

  /* En esta parte lo que hacemos es invertir la direccion horizontal si
  toca uno de sus limites, modificando su velocidad. Si multiplicamos por -1 la
  velocidad lo que estamos haciendo es invertir su direccion.*/
  if ((this.x < this.rangoMov.desdeX) || (this.x > this.rangoMov.hastaX)) {
    this.velocidad *= -1;
    this.girar();
  }
  // Si sobrepasa el rangoY, ajusta hacia el centro
  if ((this.y < this.rangoMov.desdeY)) {
    this.y = this.rangoMov.desdeY + Math.abs(this.velocidad);
  }
  if (this.y > this.rangoMov.hastaY) {
    this.y = this.rangoMov.hastaY - (Math.abs(this.velocidad) * 4);
  }
};


