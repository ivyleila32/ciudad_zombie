const Bonus = function (sprite, x, y, ancho, alto, potencia, duracion) {
    Obstaculo.call(this, sprite, x, y, ancho, alto, potencia);
    setTimeout(() => {
        this.desaparecer();
    }, duracion);
};

Bonus.prototype = Object.create(Obstaculo.prototype);
Bonus.prototype.constructor = Bonus;


// Cuando se Choca un Bouns recupera vidas en lugar de perder
Bonus.prototype.chocar = function (jugador) {
    jugador.recuperarVidas(this.potencia)
    this.desaparecer(); // despues de recuperar el bonus desaparece
};
// Para desaparecer el bonus se sale de la pantalla
Bonus.prototype.desaparecer = function () {
    this.x = 1000;
    this.y = 1000;
};
