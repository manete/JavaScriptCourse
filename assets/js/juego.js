(() => {
    'use strict' // obliga a la definición de variables y más cosas ¿que hace?. RECOMENDADO PARA USAR EN EL PATRON MODULE


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        figuras = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //Referencias del html
    const bntPedirCarta = document.querySelector('#pedirCartaBtn'),
        bntDetener = document.querySelector('#detenerBtn'),
        bntNuevoJuego = document.querySelector('#nuevoBtn');

    const marcadores = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');

    // Inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {

        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        console.log({ puntosJugadores });
    }

    //Esta función crea una nueva baraja
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let figura of figuras) {
                deck.push(figura + tipo);
            }
        }

        return _.shuffle(deck);
    }

    //Esta función permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No quedan cartas en el deck';
        }
        return deck.pop();
    }

    // Obtener el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1);
    }

    //turno: 0 es el primer jugaro y el último sera la banca
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        marcadores[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const nuevaCarta = document.createElement('img');
        nuevaCarta.src = `assets/cartas/${carta}.png`;
        nuevaCarta.classList = 'carta';
        divCartasJugadores[turno].append(nuevaCarta);
    }

    // turno de la computadora
    const turnoBanca = (puntosMinimos) => {
        let puntosBanca = 0;
        do {
            const carta = pedirCarta();
            puntosBanca = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1)
                // const nuevaCarta = document.createElement('img');
                // nuevaCarta.src = `assets/cartas/${carta}.png`;
                // nuevaCarta.classList = 'carta';
                // cartasBanca.append(nuevaCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosBanca < puntosMinimos) && puntosMinimos <= 21);

        setTimeout(() => {
            if (puntosBanca === puntosMinimos) {
                alert('NADIE GANA :(');
            }
            if (puntosMinimos > 21) {
                alert('LA BANCA GANA');
            } else if (puntosBanca > 21) {
                alert('JUGADOR GANA');
            } else {
                alert('LA BANCA GANA');
            }
        }, 100);
    }

    //Eventos
    bntPedirCarta.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            turnoBanca(puntosJugador);
            bntDetener.disabled = true;
            bntPedirCarta.disabled = true;
        } else if (puntosJugador === 21) {
            console.warn("21, Genial!");
            bntPedirCarta.disabled = true;
            bntDetener.disabled = true;
        }
    });


    bntDetener.addEventListener('click', () => {
        bntPedirCarta.disabled = true;
        bntDetener.disabled = true;
        turnoBanca(puntosJugador);
    });


    bntNuevoJuego.addEventListener('click', () => {

        inicializarJuego();
        // puntosBanca = 0;
        // puntosJugador = 0;

        // marcadores[0].innerHTML = 0;
        // marcadores[1].innerHTML = 0;

        // cartasJugador.innerHTML = '';
        // cartasBanca.innerHTML = '';


        // bntPedirCarta.disabled = false;
        // bntDetener.disabled = false;


    });
})();