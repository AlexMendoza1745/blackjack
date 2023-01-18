(() => {
  "use strict";
  //variables y constantes

  let cartas = [],  
    tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "K", "Q"],
   puntajeJugador=0,
   perdio,
   puntosJugadores=[];

 
   const divCartaJugadores = document.querySelectorAll('.divCartas')
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
   puntajeJugador+=acumularPuntos(0,carta);
  console.log("puntaje jugador: "+puntajeJugador)
   crearCarta(carta,0);
    //const verificacion=verificar();
    if (verificar()) {
      juegaComputadora(puntajeJugador);
    }
  });

//////////////////////////////////////////

  detenerJuego.addEventListener("click", () => {
    pedir.disabled = true;
    detenerJuego.disabled = true;
    console.warn("has obtenido: " + puntajeJugador + " puntos");
    juegaComputadora(puntajeJugador);
  });

  //funcion verificar
  function verificar() {
    if (puntajeJugador > 21) {
      console.warn("has perdido");
      pedir.disabled = true;
      return true;
    } else if (puntajeJugador === 21) {
      console.log("has logrado 21!!");
      pedir.disabled = true;
      return true;
    }
    return false;
  }
   //turno: 0 = primero jugador y el ultimo sera de la computadora
  const acumularPuntos=(turno,carta)=>{
    console.log(carta);
   // puntosJugadores[turno]=puntajeJugador[turno];
    puntosJugadores[turno] = valorCarta(carta);
    puntosHTMLC[turno].innerText = puntosJugadores[turno];
      return puntosJugadores[turno];
  };

  //crear carta

const crearCarta=(carta,turno)=>{
  const imgCarta = document.createElement("img");
      imgCarta.src = `/assets/img/cartas/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartaJugadores[turno].append(imgCarta);
}
  //////////

//turno de la computadora
  const juegaComputadora = (jugador) => {
    let puntosComputadora=0;
    do {
      const carta = pedirCarta();
      puntosComputadora+= acumularPuntos(1,carta);
     crearCarta(carta,1);
     console.log("puntos computadora: "+puntosComputadora);
    } while (puntosComputadora <= jugador && jugador <= 21);
    perdio = puntosComputadora > 21 ? true : false;
    setTimeout(() => {
      if (perdio == true && puntajeJugador <= 21) {
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
    //puntosJugador = 0;
    //puntosComputadora = 0;
    detenerJuego.disabled = false;
    puntosHTMLC.forEach(elemt=>elemt.innerText=0);
    divCartaJugadores.forEach(elemt=>elemt.innerText=0);
    const imgCarta = document.createElement("img");
    imgCarta.src = `/assets/img/cartas/red_back.png`;
    imgCarta.classList.add("carta");
    const imgCarta2 = document.createElement("img");
    imgCarta2.src = `/assets/img/cartas/red_back.png`;
    imgCarta2.classList.add("carta");
    divCartaJugadores.append(imgCarta2);
    console.log({ cartas });
  });
})();
