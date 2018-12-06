/* Para insipirarte para la implementacion del ZombieConductor podes usar
al ZombieCaminante de ejemplo. Tene en cuenta que tendra algunas diferencias.
Por ejemplo, la cantidad parametros que recibe su constructor. En ZombieConductor
no son exactamente los mismos parametros que en el objeto Enemigo, a diferencia
del ZombieCaminante que eran los mismos. */

var ZombieConductor = function(sprite, x, y, ancho, alto, velocidad, rangoMov, direccion,potencia) {
  /* Completar constructor a partir de Enemigo */
  //Enemigo.call(/* ... */);
  /* No olvidar agregar la/s propiedad/es unicas de ZombieConductor necesarias */
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov,potencia);
  this.direccion = direccion;
}

ZombieConductor.prototype = Object.create(ZombieCaminante.prototype);
ZombieConductor.prototype.constructor = ZombieConductor;



/* Completar creacion del ZombieConductor */

/* Completar metodos para el movimiento y el ataque */

ZombieConductor.prototype.atacar = function (jugador) {
  jugador.perderVidas(jugador.vidas);
}

ZombieConductor.prototype.mover = function() {
  if (this.direccion === 'h') { // Si el movimiento es Horizontal
    this.x -= this.velocidad; // muevo el eje x
    // Si x ya llego a su limite
    if ((this.x < this.rangoMov.desdeX) || (this.x > this.rangoMov.hastaX)){
      this.velocidad *= -1; // Invierto el sentido (signo de la velocidad)
    }
  } else { // Sino entonces es Vertical
    this.y -= this.velocidad; // muevo el eje y
    // Si y llego a su limite
    if ((this.y < this.rangoMov.desdeY) || (this.y > this.rangoMov.hastaY)){
      this.velocidad *= -1; // Inverto el sentido de la velocidad
    }
  }

  
}