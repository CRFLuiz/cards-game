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
            // smallCard1.style.left = `${(i + 1) * 80}px`;
            let smallCard2 = paintingSmallCard(obj.player2[i]);
            // smallCard2.style.left = `${(i + 1) * 80}px`;

            // switch(i){
            //     case 0:
            //         smallCard1.classList.add('loss');
            //         smallCard2.classList.add('win');
            //         break;
            //     case 1:
            //     case 2:
            //         smallCard1.classList.add('win');
            //         smallCard2.classList.add('loss');
            //         break;
            //     case 3:
            //         smallCard1.classList.add('active');
            //         smallCard2.classList.add('active');
            //         break;
            // }

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