const Card = require('./Card');

class Communication{
    constructor(socket, game){
        this.socket = socket;
        this.game = game;

        socket.emit('cardsInGame', this.game.heroesInGame);
        this.listening();
    }

    listening(){
        this.socket.on('startMatch', obj => {
            let ordination1 = this.randomize([0, 1, 2, 3, 4]);
            
            let cards1 = this.createCards(this.game.heroesInGame);
            let cards2 = this.createCards(this.game.heroesInGame);

            let cards1Random = [];
            let cards2Random = [];
            for(let i = 0; i < ordination1.length; i++){
                cards1Random.push(cards1[ordination1[i]]);
            }

            let ordination2 = this.randomize([0, 1, 2, 3, 4]);
            for(let i = 0; i < ordination2.length; i++){
                cards2Random.push(cards2[ordination2[i]]);
            }

            let startPlayer = Math.random() > 0.5 ? 0 : 1;

            this.game.rooms[this.socket.id] = { player1: cards1Random, player2: cards2Random, startPlayer, round: 0, turns: [0], results: [], history: [], pontuation: [[], []] };

            this.player1Properties(this.game.rooms[this.socket.id])
            this.socket.emit('matchReady', this.game.rooms[this.socket.id]);
        });

        this.socket.on('playerReady', obj => {
            let room = this.game.rooms[this.socket.id];
            if(room.startPlayer == 1){
                room.round += 1;
                this.player2RandomAction(room);
            }

            this.player1Properties(room);
            this.socket.emit('nextTurn', this.game.rooms[this.socket.id]);
        });

        this.socket.on('playerMove', obj => this.playerMove(obj));
    }

    createCard(hero){
        return new Card(hero);
    }

    createCards(heroes){
        let cards = [];
        for(let i = 0; i < heroes.length; i++){
            cards.push(this.createCard(heroes[i]));
        }
        return cards;
    }

    randomize(array){
        let arr = [...array], newArr = [];
        while(arr.length > 0){
            let r = Math.floor(Math.random() * array.length);
            newArr = newArr.concat(arr.splice(r, 1));
        }
        return newArr;
    }

    player2RandomAction(room){
        let moves = room.player2[room.round > 0 ? room.round - 1 : 0].actions();
        let move = Math.floor(Math.random() * moves.length);
        move = moves[move];
        try{
            room.player2[room.round > 0 ? room.round - 1 : 0].checkWinLoss(room.player1[room.round > 0 ? room.round - 1 : 0]);
            switch(move.actionType){
                case 'attack':
                    room.player2[room.round > 0 ? room.round - 1 : 0].attackAction(move.actionId, room.player1[room.round > 0 ? room.round - 1 : 0]);
                    break;
                case 'spell':
                    room.player2[room.round > 0 ? room.round - 1 : 0].spellAction(move.actionId, room.player1[room.round > 0 ? room.round - 1 : 0]);
                    break;
                default:
                    room.player2[room.round > 0 ? room.round - 1 : 0].othersAction(move.actionId, room.player1[room.round > 0 ? room.round - 1 : 0]);
                    break;
            }
            room.turns.push(move);
            room.history.push({ player: 2, move });
            room.pontuation[1][room.round - 1] = (room.player1[room.round > 0 ? room.round - 1 : 0].maxHealth - room.player1[room.round > 0 ? room.round - 1 : 0].health) / room.player1[room.round > 0 ? room.round - 1 : 0].maxHealth;
            room.pontuation[1][room.round - 1] = room.pontuation[1][room.round - 1] * 100;
        }catch(er){
            if(er.name == "WinLoss"){
                room.pontuation[1][room.round - 1] = (room.player1[room.round > 0 ? room.round - 1 : 0].maxHealth - room.player1[room.round > 0 ? room.round - 1 : 0].health) / room.player1[room.round > 0 ? room.round - 1 : 0].maxHealth;
                room.pontuation[1][room.round - 1] = room.pontuation[1][room.round - 1] * 100;

                if(room.round == 5) return this.socket.emit('gameEnd', room);
                console.log('WinLoss!')
                console.log('Winner:', er.win.hero.name);
                console.log('Loser:', er.loss.hero.name);
                room.pontuation[1][room.round - 1] = 100;
                room.round += 1;
            }
        }
        this.player1Properties(room);
        this.socket.emit('nextTurn', room);
    }

    player1Properties(room){
        room.playerCard = room.player1[room.round > 0 ? room.round - 1 : 0];
        room.playerActions = room.playerCard.actions();
        room.playerAllActions = room.playerCard.getAllActions();
    }

    playerMove(move){
        let room = this.game.rooms[this.socket.id];
        try{
            room.player1[room.round > 0 ? room.round - 1 : 0].checkWinLoss(room.player2[room.round > 0 ? room.round - 1 : 0]);
            switch(move.actionType){
                case 'attack':
                    room.player1[room.round > 0 ? room.round - 1 : 0].attackAction(move.actionId, room.player2[room.round > 0 ? room.round - 1 : 0]);
                    break;
                case 'spell':
                    room.player1[room.round > 0 ? room.round - 1 : 0].spellAction(move.actionId, room.player2[room.round > 0 ? room.round - 1 : 0]);
                    break;
                default:
                    room.player1[room.round > 0 ? room.round - 1 : 0].othersAction(move.actionId, room.player2[room.round > 0 ? room.round - 1 : 0]);
                    break;
            }
            room.turns.push(move);
            room.history.push({ player: 1, move });
            room.pontuation[0][room.round - 1] = (room.player2[room.round > 0 ? room.round - 1 : 0].maxHealth - room.player2[room.round > 0 ? room.round - 1 : 0].health) / room.player2[room.round > 0 ? room.round - 1 : 0].maxHealth;
            room.pontuation[0][room.round - 1] = room.pontuation[0][room.round - 1] * 100;
        }catch(er){
            if(er.name == "WinLoss"){
                room.pontuation[0][room.round - 1] = (room.player2[room.round > 0 ? room.round - 1 : 0].maxHealth - room.player2[room.round > 0 ? room.round - 1 : 0].health) / room.player2[room.round > 0 ? room.round - 1 : 0].maxHealth;
                room.pontuation[0][room.round - 1] = room.pontuation[0][room.round - 1] * 100;

                if(room.round == 5) return (this.socket.emit('gameEnd', room)) 
                console.log('WinLoss!')
                console.log('Winner:', er.win.hero.name);
                console.log('Loser:', er.loss.hero.name);
                room.pontuation[0][room.round - 1] = 100;
                room.round += 1;
            }
        }
        this.player1Properties(room);
        this.player2RandomAction(room);
    }
}

module.exports = Communication;