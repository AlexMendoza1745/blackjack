(() => {
  "use strict";
  //variables y constantes
  let cartas = [],
    tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "K", "Q"],
    carta,
    //puntosJugador = 0,
   // puntosComputadora = 0,
puntosJugadores=[];
    perdio,
    divCartaJugador = document.querySelector("#jugador-cartas"),
    divCartaComputadora = document.querySelector("#computadora-cartas");
  const pedir = document.querySelector("#pedir"),
    puntosHTMLJ = document.querySelectorAll("small"),
    puntosHTMLC = document.querySelectorAll("small"),
    detenerJuego = document.querySelector("#detener"),
    nuevoJuego = document.querySelector("#nuevo"),
    //esta funcion crea una nueva baraja
   iniciarJuego=(numJugadores=2)=>{
      cartas=crearCartas();
      for (i=0;i<numJugadores;i++){
        puntosJugadores.push(0);
      }
    },
    crearCartas = () => {
      cartas=[];
      for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
          cartas.push(i + tipo);
        }
      }
      for (let especial of especiales) {
        for (let tipo of tipos) {
          cartas.push(especial + tipo);
        }
      }
      //utilizamos la libreria de underscore para usar su metodo random y revolver las cartas
      cartas = _.shuffle(cartas);
    },
    pedirCarta = () => {
      if (cartas.length == 0) {
        //manda una excepcion por lo que ya no ejecuta mas codigo
        throw "ya no hay mas cartas en la masa";
      }
      //para poder asignar el dato con el metodo de "pop" hay que hacerlo como funcion ()
      return cartas.pop();
    };
  const valorCarta = (carta) => {
    //en javascript todos los string pueden ser manejados como un arreglo
    const extraer = carta.substring(0, carta.length - 1);
    //con la expresion isNaN se evalua que el parametro sea numero o no y la multiplicacion *1 convierte a un numero String en int
    return isNaN(extraer) ? (extraer === "A" ? 11 : 10) : extraer * 1;
  };
  //llamada a las funciones
  //crearCartas();
  /////////////////////////
  //eventos
  pedir.addEventListener("click", () => {
    crearCartas();
    const carta = pedirCarta();
    console.log(carta);
    puntosJugador = puntosJugador + valorCarta(carta);
    console.log(puntosJugador);
    puntosHTMLJ[0].innerText = puntosJugador;
    const imgCarta = document.createElement("img");
    imgCarta.src = `/assets/img/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartaJugador.append(imgCarta);
    //const verificacion=verificar();
    if (verificar()) {
      juegaComputadora(puntosJugador);
    }
  });

  detenerJuego.addEventListener("click", () => {
    pedir.disabled = true;
    detenerJuego.disabled = true;
    console.warn("has obtenido: " + puntosJugador + " puntos");
    juegaComputadora(puntosJugador);
  });

  //funcion verificar
  function verificar() {
    if (puntosJugador > 21) {
      console.warn("has perdido");
      pedir.disabled = true;
      return true;
    } else if (puntosJugador === 21) {
      console.log("has logrado 21!!");
      pedir.disabled = true;
      return true;
    }
    return false;
  }
  
  const acumularPuntos=(turno)=>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
      puntosHTMLC[1].innerText = puntosJugador;
  };
//turno de la computadora
  const juegaComputadora = (jugador) => {
    do {
      const carta = pedirCarta();
      //console.log('carta de la computadora: '+carta);
      puntosComputadora = puntosComputadora + valorCarta(carta);
      puntosHTMLC[1].innerText = puntosComputadora;
      const imgCarta = document.createElement("img");
      imgCarta.src = `/assets/img/cartas/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartaComputadora.append(imgCarta);
      //console.log(mensajeGanador)
    } while (puntosComputadora <= jugador && jugador <= 21);
    perdio = puntosComputadora > 21 ? true : false;
    setTimeout(() => {
      if (perdio == true && puntosJugador <= 21) {
        alert("ha ganado el jugador ");
      } else if (puntosComputadora <= 21) {
        alert("ha ganado la computadora ");
      } else {
        alert("error");
      }
    }, 35);
  };

  //iniciar un nuevo juego
  nuevoJuego.addEventListener("click", () => {
    console.clear();
    cartas = [];
    pedir.disabled = false;
    puntosJugador = 0;
    puntosComputadora = 0;
    detenerJuego.disabled = false;
    puntosHTMLC[0].innerText = 0;
    puntosHTMLJ[1].innerText = 0;
    divCartaComputadora.innerHTML = "";
    divCartaJugador.innerHTML = "";
    const imgCarta = document.createElement("img");
    imgCarta.src = `/assets/img/cartas/red_back.png`;
    imgCarta.classList.add("carta");
    divCartaComputadora.append(imgCarta);
    const imgCarta2 = document.createElement("img");
    imgCarta2.src = `/assets/img/cartas/red_back.png`;
    imgCarta2.classList.add("carta");
    divCartaJugador.append(imgCarta2);
    console.log({ cartas });
  });
})();
