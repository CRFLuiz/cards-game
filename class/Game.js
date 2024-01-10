const Hero = require("./Hero");
const Card = require("./Card");

const assassins = require('../json/assassin.name.json');
const mages = require('../json/mage.name.json');
const warriors = require('../json/warrior.name.json');
const orcs = require('../json/orc.name.json');
const tanks = require('../json/tank.name.json');

class Game{
    constructor(heroes = 5, timeToReplace = 300){
        this.heroesCount = heroes;
        this.timeToReplace = timeToReplace;
        this.heroes = [];
        this.heroesInGame = [];
        this.generateHeroes();
        this.rooms = {};
    }

    generateAssassins(){
        for(let i = 0; i < assassins.heroes.length; i++){
            this.heroes.push(new Hero(assassins.heroes[i]['name'], 'assassin', assassins.heroes[i]['image']));
        }        
    }

    generateMages(){
        for(let i = 0; i < mages.heroes.length; i++){
            this.heroes.push(new Hero(mages.heroes[i]['name'], 'mage', mages.heroes[i]['image']));
        }        
    }

    generateOrcs(){
        for(let i = 0; i < orcs.heroes.length; i++){
            this.heroes.push(new Hero(orcs.heroes[i]['name'], 'orc', orcs.heroes[i]['image']));
        }        
    }

    generateTanks(){
        for(let i = 0; i < tanks.heroes.length; i++){
            this.heroes.push(new Hero(tanks.heroes[i]['name'], 'tank', tanks.heroes[i]['image']));
        }        
    }

    generateWarriors(){
        for(let i = 0; i < warriors.heroes.length; i++){
            this.heroes.push(new Hero(warriors.heroes[i]['name'], 'warrior', warriors.heroes[i]['image']));
        }        
    }
    
    generateHeroes(){
        this.generateAssassins();
        this.generateMages();
        this.generateWarriors();
        this.generateOrcs();
        this.generateTanks();
    }

    initializeRandom(){
        let max = this.heroes.length;
        let heroes = [];
        while(heroes.length < 5){
            let i = Math.floor(Math.random() * max);
            if(heroes.findIndex(v => v == i) == -1) heroes.push(i);
        }
        this.heroesInGame = heroes.map(hero => this.heroes[hero]);
        console.log('Game initialized randomly')
    }

    removeDuplicate(arr){
        return [...new Set(arr)];
    }

    filterHero(filter = []){
        let heroes = [];
        for(let i = 0; i < filter.length; i++){
            let f = filter[i];
            heroes = heroes.concat(this.heroes.filter(hero => hero[f.prop] == f.val));
        }
        return this.removeDuplicate(heroes);
    }

    initialize(n = 5){
        let heroes = [
            Math.floor(Math.random() * assassins.heroes.length),
            Math.floor(Math.random() * mages.heroes.length),
            /*Math.floor(Math.random() * warriors.heroes.length),
            Math.floor(Math.random() * orcs.heroes.length),
            Math.floor(Math.random() * tanks.heroes.length)*/
            Math.floor(Math.random() * assassins.heroes.length),
            Math.floor(Math.random() * mages.heroes.length),
            Math.floor(Math.random() * assassins.heroes.length),
        ];
        // let types = ['assassin', 'mage', 'warrior', 'orc', 'tank'];
        let types = ['assassin', 'mage', 'assassin', 'mage', 'assassin'];
        for(let i = 0; i < heroes.length; i++){
            heroes[i] = this.filterHero([{ prop: 'type', val: types[i] }])[heroes[i]];
        }
        this.heroesInGame = heroes.map(hero => hero);
        console.log('Game initialized')
    }
}

module.exports = Game;