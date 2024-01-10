const control = () => {
    
    const attackButtons = document.querySelectorAll(".buttonsDiv .attacks button");
    const spellButtons = document.querySelectorAll(".buttonsDiv .spells button");
    const otherButtons = document.querySelectorAll(".buttonsDiv .others button");

    attackButtons.forEach((attack, key) => {
        attack.addEventListener('click', ev => {
            socket.emit('playerMove', GlobalStatus.player1.playerAllActions.attacks[key]);
            disableAll();
        })
    });

    spellButtons.forEach((attack, key) => {
        attack.addEventListener('click', ev => {
            socket.emit('playerMove', GlobalStatus.player1.playerAllActions.spells[key]);
            disableAll();
        })
    });

    otherButtons.forEach((attack, key) => {
        attack.addEventListener('click', ev => {
            socket.emit('playerMove', GlobalStatus.player1.playerAllActions.others[key]);
            disableAll();
        })
    });
    
}

const disableAll = () => {
    document.querySelectorAll(".buttonsDiv button").forEach(button => button.disabled = true);
}

const enableAll = () => {
    document.querySelectorAll(".buttonsDiv button").forEach(button => button.disabled = false);
}