/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. Gran parte de su implementacion esta hecha, pero hay espacios con el
texto COMPLETAR que deben completarse segun lo indique la consigna.

El objeto Juego contiene mucho codigo. Tomate tu tiempo para leerlo tranquilo
y entender que es lo que hace en cada una de sus partes. */
const zombieSprites = { 
  derecha: 'imagenes/zombicito_derecha.png', 
  izquierda: 'imagenes/zombicito_izquierda.png' 
};
const Juego = {
  // Aca se configura el tamanio del canvas del juego
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  // Indica si el jugador gano
  ganador: false,
  _introduccion: 3,
  obstaculosCarretera: [
    /*Aca se van a agregar los obstaculos visibles. Tenemos una valla horizontal
    de ejemplo, pero podras agregar muchos mas. */
    new Obstaculo('imagenes/valla_horizontal.png', 70, 430, 30, 30, 2),
    new Obstaculo('imagenes/bache.png',110,280,30,30,1),
    new Obstaculo('imagenes/bache.png',150,360,30,30,1),
    new Obstaculo('imagenes/bache.png',300,450,30,30,1),
    new Obstaculo('imagenes/bache.png',450,250,30,30,1),
    new Obstaculo('imagenes/bache.png',770,450,30,30,1),
    new Obstaculo('imagenes/valla_horizontal.png', 70, 430, 30, 30, 2),
    new Obstaculo('imagenes/valla_vertical.png', 400, 400, 30, 30, 2),
    new Obstaculo('imagenes/auto_verde_derecha.png', 400, 115, 30, 15, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 550, 370, 30, 30, 2),
    new Obstaculo('imagenes/valla_horizontal.png', 850, 370, 30, 30, 2),
    new Obstaculo('imagenes/auto_verde_abajo.png', 850, 115, 15, 30, 1),
    
  ],

  /* Arreglo de Bonus
   *  Los bonus son un tipo especial de obstaculo 
   *  que aparecen de forma aleatoria en la carretera
   */
  bonus: [
    new Bonus('imagenes/corazon.png', 200, 400, 30, 30, 5, 7000),
    new Bonus('imagenes/medicina.png', 500, 200, 35, 35, 5, 10000),
    new Bonus('imagenes/corazon.png', 800, 150, 30, 30, 5, 14000),
    new Bonus('imagenes/medicina.png', 800, 360, 35, 35, 5, 20000),

  ],
  /* Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
   Ya estan ubicados en sus lugares correspondientes. Ya aparecen en el mapa, ya
   que son invisibles. No tenes que preocuparte por ellos.*/
  bordes: [
    // // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0),
    new Obstaculo('', 0, 559, 961, 18, 0),
    new Obstaculo('', 0, 5, 18, 572, 0),
    new Obstaculo('', 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 1),
    new Obstaculo('', 69, 507, 690, 52, 1),
    new Obstaculo('', 587, 147, 173, 360, 1),
    new Obstaculo('', 346, 147, 241, 52, 1),
    new Obstaculo('', 196, 267, 263, 112, 1),
    new Obstaculo('', 196, 23, 83, 244, 1),
    new Obstaculo('', 279, 23, 664, 56, 1),
    new Obstaculo('', 887, 79, 56, 480, 1)
  ],
  // Los enemigos se agregaran en este arreglo.
  enemigos: [
    new ZombieCaminante(zombieSprites, 50, 50, 30, 30, -1, { desdeX: 0, hastaX: 900, desdeY: 0,    hastaY: 250 }, 1),
    new ZombieCaminante(zombieSprites, 850, 100, 30, 30, 1, { desdeX: 0, hastaX: 900, desdeY: 0,   hastaY: 250 }, 1),
    new ZombieCaminante(zombieSprites, 50, 150, 30, 30, -1, { desdeX: 0, hastaX: 900, desdeY: 0,   hastaY: 250 }, 1),
    new ZombieCaminante(zombieSprites, 850, 200, 30, 30, 1, { desdeX: 0, hastaX: 900, desdeY: 0,   hastaY: 250 }, 1),
    new ZombieCaminante(zombieSprites, 50, 350, 30, 30, -1, { desdeX: 0, hastaX: 900, desdeY: 250, hastaY: 500 }, 1),
    new ZombieCaminante(zombieSprites, 850, 400, 30, 30, 1, { desdeX: 0, hastaX: 900, desdeY: 250, hastaY: 500 }, 1),
    new ZombieCaminante(zombieSprites, 50, 450, 30, 30, -1, { desdeX: 0, hastaX: 900, desdeY: 250, hastaY: 500 }, 1),
    new ZombieCaminante(zombieSprites, 850, 500, 30, 30, 1, { desdeX: 0, hastaX: 900, desdeY: 250, hastaY: 500 }, 1),

    new ZombieCaminante({ 
      derecha: 'imagenes/auto_verde_derecha.png', 
      izquierda: 'imagenes/auto_verde_izquierda.png' 
    }, 850, 500, 30, 15, 0.5, { desdeX: 750, hastaX: 850, desdeY: 200, hastaY: 400 }, 1),
 
    new ZombieConductor('imagenes/tren_horizontal.png', 400, 322, 90, 30, 3, { desdeX: 0, hastaX: 850, desdeY: 324, hastaY: 324 },'h',5),
    new ZombieConductor('imagenes/tren_vertical.png', 644, 0, 30, 90, 3, { desdeX: 644, hastaX: 644, desdeY: 0, hastaY: 500 },'v',5),
    new ZombieConductor('imagenes/tren_vertical.png', 676, 500, 30, 90, -3, { desdeX: 676, hastaX: 676, desdeY: 0, hastaY: 500 },'v',5),
                

    //sprite, x, y, ancho, alto, velocidad, rangoMov, direccion]
  ],
  audios: [
    {
      id: 'principal',
      src: 'audio/level3.mp3',
    },
    {
      id: 'intro',
      src: 'audio/intro1.mp3',
    },
    {
      id: 'gameover',
      src: 'audio/gameover3.mp3',
    },
    {
      id: 'chocar',
      src: 'audio/ruido1.mp3',
    },
    {
      id: 'ganar',
      src: 'audio/win1.mp3',
    },
    {
      id: 'perderVida',
      src: 'audio/gameover2.mp3',
    },
    {
      id: 'bonus',
      src: 'audio/failure2.mp3',
    },
  ],
};

/* Se cargan los recursos de las imagenes, para tener un facil acceso
a ellos. No hace falta comprender esta parte. Pero si queres agregar tus propies
imagenes tendras que poner su ruta en la lista para que pueda ser precargada como
todas las demas. */
Juego.iniciarRecursos = function() {
  Resources.load([
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    'imagenes/Splash.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie1.png',
    'imagenes/zombie2.png',
    'imagenes/zombie3.png',
    'imagenes/zombie4.png',
    'imagenes/auto_rojo_abajo.png',
    'imagenes/auto_rojo_arriba.png',
    'imagenes/auto_rojo_derecha.png',
    'imagenes/auto_rojo_izquierda.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png',
    'imagenes/auto_verde_izquierda.png',
    'imagenes/corazon.png',
    'imagenes/zombicito_derecha.png',
    'imagenes/zombicito_izquierda.png',
    'imagenes/medicina.png',
    'imagenes/Mensaje1.png',
    'imagenes/Mensaje2.png',
    'imagenes/fondo.png'
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function() {
  return this.obstaculosCarretera
          .concat(this.bordes)
          .concat(this.bonus); // Tambien se consideran obstaculos los bonus
};

Juego.comenzar = function() {
  // Inicializar el canvas del juego
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  // Inicializo el audio
  Musicalizador.inicializarAudio(this.audios);
  /* El bucle principal del juego se llamara continuamente para actualizar
  los movimientos y el pintado de la pantalla. Sera el encargado de calcular los
  ataques, colisiones, etc*/
  this.buclePrincipal();
};

Juego.buclePrincipal = function() {

  // Con update se actualiza la logica del juego, tanto ataques como movimientos
  this.update();
  // Funcion que dibuja por cada fotograma a los objetos en pantalla.
  this.dibujar();
  // Maneja la musica de fondo
  this.musicalizar();
  // Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};
 
Juego.musicalizar = function() {
  if (this.introduccion()) {
    Musicalizador.detener('principal');
    Musicalizador.detener('gameover');
    Musicalizador.detener('ganar');
    Musicalizador.reproducir('intro');
    
  } 
  else if(this.terminoJuego()) {
    Musicalizador.detener('intro');
    Musicalizador.detener('principal');
    Musicalizador.detener('ganar');
    Musicalizador.reproducir('gameover');
  }
  else if(this.ganoJuego()) {
    Musicalizador.detener('intro');
    Musicalizador.detener('principal');
    Musicalizador.detener('gameover');
    Musicalizador.reproducir('ganar');
  }
  else {
    Musicalizador.detener('gameover');
    Musicalizador.detener('intro')
    Musicalizador.detener('ganar');
    Musicalizador.reproducir('principal');
  }
};

Juego.update = function() {
  if(this._introduccion > 0) return;
    this.calcularAtaques();
    this.moverEnemigos();
}
// Captura las teclas y si coincide con alguna de las flechas tiene que
// hacer que el jugador principal se mueva
Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = (this._introduccion > 0) ?  0 : this.jugador.velocidad;

  // El movimiento esta determinado por la velocidad del jugador
  switch (tecla) {
    // Para izquierda y arriba debe restar, entonces la velocidad es negativa
    case 'izq':
      movX = -velocidad;
      break;
    case 'arriba':
      movY = -velocidad;
      break;
    // Para derecha y abajo debe sumar, entonces la velocidad es positiva
    case 'der':
      movX = velocidad;
      break;
    case 'abajo':
      movY = velocidad;
      break;
    case 'enter':
      if(this.introduccion()) {
          this._introduccion -= 1;
      }
      break;
  }
  // Se gira el sprite
  this.jugador.girar(tecla); 
  
  // Si se puede mover hacia esa posicion hay que hacer efectivo este movimiento
  movX += this.jugador.x;
  movY += this.jugador.y;
  if (this.chequearColisiones(movX, movY)) {
    /* Aca tiene que estar la logica para mover al jugador invocando alguno
    de sus metodos  */
    this.jugador.mover(movX, movY);
  }
};

Juego.dibujar = function() {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();
  if (this.introduccion() || this.terminoJuego() || this.ganoJuego()) return;

  /* Aca hay que agregar la logica para poder dibujar al jugador principal
  utilizando al dibujante y los metodos que nos brinda.
  "Dibujante dibuja al jugador" */
  Dibujante.dibujarEntidad(Jugador);
  /* Completar */

  // Se recorren los obstaculos de la carretera pintandolos
  this.obstaculosCarretera.forEach(function(obstaculo) {
    Dibujante.dibujarEntidad(obstaculo);
  });
  // se recorren los bonus y se dibujan 
  this.bonus.forEach(function(bonus) {
    Dibujante.dibujarEntidad(bonus);
  });

  // Se recorren los enemigos pintandolos
  this.enemigos.forEach(function(enemigo) {
    /* Completar */
    Dibujante.dibujarEntidad(enemigo);
  });

  // El dibujante dibuja las vidas del jugador
  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = i * 20 + 5;
    Dibujante.dibujarImagen('imagenes/corazon.png', x, 4, 20, 20);
  }
};



/* Recorre los enemigos haciendo que se muevan. De la misma forma que hicimos
un recorrido por los enemigos para dibujarlos en pantalla ahora habra que hacer
una funcionalidad similar pero para que se muevan.*/
Juego.moverEnemigos = function() {
  /* COMPLETAR */
  this.enemigos.forEach(function (enemigo) {
    enemigo.mover();
  });
};

/* Recorre los enemigos para ver cual esta colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar.
Para chequear las colisiones estudiar el metodo posicionValida. Alli
se ven las colisiones con los obstaculos. En este caso sera con los zombies. */
Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
      /* Si el enemigo colisiona debe empezar su ataque
      COMPLETAR */
      enemigo.comenzarAtaque(this.jugador);
      Musicalizador.reproducir('chocar');
    } else {
      /* Sino, debe dejar de atacar
      COMPLETAR */
      enemigo.dejarDeAtacar();
    }
  }, this);
};



/* Aca se chequea si el jugador se peude mover a la posicion destino.
 Es decir, que no haya obstaculos que se interpongan. De ser asi, no podra moverse */
Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {
      /*COMPLETAR, obstaculo debe chocar al jugador*/
      obstaculo.chocar(this.jugador);
      Musicalizador.reproducir('chocar');
      puedeMoverse = false;
    }
  }, this)
  return puedeMoverse;
};

/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
 x e y representan la coordenada a la cual se quiere mover el elemento2*/
Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

Juego.dibujarFondo = function() {
  if(this.introduccion()) {
    // Mostrar Carteles Introduccion
    switch (this._introduccion) {
      case 1:
        Dibujante.dibujarImagen('imagenes/Mensaje2.png', 0, 5, this.anchoCanvas, this.altoCanvas);
        break;
      case 2:
        Dibujante.dibujarImagen('imagenes/Mensaje1.png', 0, 5, this.anchoCanvas, this.altoCanvas);
        break;
      case 3:
        // Dibujante.dibujarImagen('imagenes/fondo.png', 0, 5, this.anchoCanvas, this.altoCanvas);
        Dibujante.dibujarImagen('imagenes/Splash.png', 0, 5, this.anchoCanvas, this.altoCanvas);
        break;
      default:
        break;
    }
  }
  // Si se termino el juego hay que mostrar el mensaje de game over de fondo
  else if (this.terminoJuego()) {
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
  }
  // Si se gano el juego hay que mostrar el mensaje de ganoJuego de fondo
  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
    document.getElementById('reiniciar').style.visibility = 'visible';
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    Dibujante.dibujarRectangulo('white', 759, 510, 128, 20);
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;
};

/* Se gana el juego si se sobre pasa cierto altura y */
Juego.ganoJuego = function() {
  return (this.jugador.y + this.jugador.alto) > 530;
};

Juego.introduccion = function () {
  return this._introduccion > 0;
};

Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo',
    13: 'enter'
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
