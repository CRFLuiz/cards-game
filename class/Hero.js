const attributesLimit = require('../json/attributes.json');

class Hero{
    constructor(name, type, thumb){
        this.name = name;
        this.type = type;
        this.thumb = `/img/heroes/${type}/${thumb}`;
        this.initializeHero();
    }

    randomBetween(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    initializeHero(){
        let stats = attributesLimit[this.type];

        this.health = this.randomBetween(stats.health.min, stats.health.max);
        this.energy = this.randomBetween(stats.energy.min, stats.energy.max);
        this.physicalDamage = this.randomBetween(stats.physicalDamage.min, stats.physicalDamage.max);
        this.magicDamage = this.randomBetween(stats.magicDamage.min, stats.magicDamage.max);
        
        this.physicalResistance = stats.physicalResistance;
        this.magicResistance = stats.magicResistance;
        this.desc = {
            hero: stats.descHero,
            advantage: stats.descAdvantage,
            weaknesses: stats.descWeakness
        };
    }
}

module.exports = Hero;