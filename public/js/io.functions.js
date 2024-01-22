const ioFunctions = () => {
    const heroBoxes = document.querySelectorAll('div#screenMain>div>div:not(.monster-card-bg-title)');
    socket.on('cardsInGame', obj => {
        for(let i = 0; i < obj.length; i++){
            let hero = paintingMediumHero(obj[i]);
            heroBoxes[i].innerHTML = '';
            heroBoxes[i].appendChild(hero);
        }
    });

    socket.on('matchReady', obj => {
        const screenA = document.querySelector('#screenPlayerA .screenPlayerA-left');
        const screenB = document.querySelector('#screenPlayerB .screenPlayerB-right');
        screenA.innerHTML = '';
        screenB.innerHTML = '';
        for(let i = 0; i < obj.player1.length; i++){
            let smallCard1 = paintingSmallCard(obj.player1[i]);
            let smallCard2 = paintingSmallCard(obj.player2[i]);

            screenA.appendChild(smallCard1);
            screenB.appendChild(smallCard2);
        }

        socket.emit('playerReady');
    });

    socket.on('nextTurn', obj => {
        renderGame(obj);
    });

    socket.on('gameEnd', obj => {
        console.log('game end', obj)
        let { pontuation } = obj;
        renderPontuation(pontuation);
    });
}