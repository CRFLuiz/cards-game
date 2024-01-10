class Card{
    constructor(hero, level = 0){
        this.hero = hero;
        this.level = level;
        this.initialize();
    }

    initialize(){
        this.xplv = [0, 20, 100, 500, 2500, 7500];
        this.xp = this.xplv[this.level];
        
        this.loadMultiplier();
        this.loadAttributes();
        this.loadAtks();
        this.loadSpells();
        
        this.heal = Math.floor(this.multiplier * 5);

        // this.health = this.hero.health;
        // this.energy = this.hero.energy;
        // this.physicalDamage = this.hero.physicalDamage;
        // this.magicDamage = this.hero.magicDamage;
        // this.physicalResistance = this.hero.physicalResistance;
        // this.magicResistance = this.hero.magicResistance;
    }

    loadMultiplier(){
        this.multiplier = 0;
        switch(this.xp){
            case '5':
                this.multiplier = 1;
                break;
            case '4':
                this.multiplier = 0.95;
                break;
            case '3':
                this.multiplier = 0.85;
                break;
            case '2':
                this.multiplier = 0.65;
                break;
            case '1':
                this.multiplier = 0.5;
                break;
            default:
                this.multiplier = 0.25;
                break;
        }
    }

    loadAttributes(){
        this.physicalDamage = Math.floor(this.multiplier * this.hero.physicalDamage);
        this.magicDamage = Math.floor(this.multiplier * this.hero.magicDamage);
        this.maxHealth = Math.floor(this.multiplier * this.hero.health);
        this.maxEnergy = Math.floor(this.multiplier * this.hero.energy);
        this.health = this.maxHealth;
        this.energy = this.maxEnergy;
        this.physicalResistance = this.multiplier * this.hero.physicalResistance;
        this.magicResistance = this.multiplier * this.hero.magicResistance;
    }

    loadAtks(){
        this.atks = [];
        this.atks.push({ actionType: 'attack', actionId: 1, damage: Math.floor(this.physicalDamage * 0.3), energy: Math.floor(this.multiplier * 7), enabled: true, btnColor: 'btn-danger' });   // Weak atk
        this.atks.push({ actionType: 'attack', actionId: 2, damage: Math.floor(this.physicalDamage * 0.6), energy: Math.floor(this.multiplier * 20), enabled: true, btnColor: 'btn-danger' });   // Medium atk
        this.atks.push({ actionType: 'attack', actionId: 3, damage: Math.floor(this.physicalDamage * 1), energy: Math.floor(this.multiplier * 90), enabled: true, btnColor: 'btn-danger' });   // High atk
    }

    loadSpells(){
        this.spells = [];
        this.spells.push({ actionType: 'spell', actionId: 1, damage: Math.floor(this.magicDamage * 0.3), energy: Math.floor(this.multiplier * 7), enabled: true, btnColor: 'btn-warning' });   // Weak spell
        this.spells.push({ actionType: 'spell', actionId: 2, damage: Math.floor(this.magicDamage * 0.6), energy: Math.floor(this.multiplier * 20), enabled: true, btnColor: 'btn-warning' });   // Medium spell
        this.spells.push({ actionType: 'spell', actionId: 3, damage: Math.floor(this.magicDamage * 1), energy: Math.floor(this.multiplier * 90), enabled: true, btnColor: 'btn-warning' });   // High spell
    }

    attack(i){
        // let damage = Math.floor(this.atks[i].damage * this.hero.physicalDamage);
        let damage = this.atks[i].damage
        let energy = this.atks[i].energy;
        let type = 'physicalDamage';
        return { damage, energy, type };
    }

    spell(i){
        // let damage = Math.floor(this.spells[i].damage * this.hero.magicDamage);
        let damage = this.spells[i].damage;
        let energy = this.spells[i].energy;
        let type = 'magicDamage';
        return { damage, energy, type };
    }

    receivedDamage(damage){
        /*if(damage.type = 'physicalDamage'){
            let dam = Math.floor(damage.damage - (damage.damage * this.physicalResistance));
            this.health = this.health - dam <= 0 ? 0 : this.health - dam;
            return;
        }
        if(damage.type = 'magicDamage'){
            let dam = Math.floor(damage.damage - (damage.damage * this.magicResistance));
            this.health = this.health - dam <= 0 ? 0 : this.health - dam;
            return;
        }*/
        let dam = Math.floor(damage.damage - (damage.damage * (damage.type == 'physicalDamage' ? this.physicalResistance : this.magicResistance)));
        this.health = this.health - dam <= 0 ? 0 : this.health - dam;
        console.log(this.hero.name, 'received', damage.damage, 'of total', damage.type, 'from', damage.enemy.hero.name, 'Blocked:', damage.damage - dam);
        this.checkWinLoss(damage.enemy);
        return dam;
    }

    pass(){
        let energyHeal = this.heal * 10;
        this.energy = this.energy + energyHeal >= this.maxEnergy ? this.maxEnergy : this.energy + energyHeal;
    }

    getAttributtes(){
        return {
            physicalDamage: this.physicalDamage,
            magicDamage: this.magicDamage,
            health: this.health,
            energy: this.energy,
            physicalResistance: this.physicalResistance,
            magicResistance: this.magicResistance
        };
    }

    checkActions(){
        for(let i = 0; i < this.atks.length; i++){
            if(this.atks[i].energy > this.energy) this.atks[i].enabled = false;
            else this.atks[i].enabled = true;

            if(this.spells[i].energy > this.energy) this.spells[i].enabled = false;
            else this.spells[i].enabled = true;
        }
    }

    checkWinLoss(enemy){
        console.log('checkWinLoss')
        if(this.health <= 0){
            let er = new Error({ win: enemy, loss: this });
            er.name = "WinLoss";
            er.win = this;
            er.loss = enemy;
            throw er;
        }
    }

    actions(){
        this.checkActions();
        let actions = this.atks.filter((atk) => atk.enabled).concat(this.spells.filter((spell) => spell.enabled));
        actions.push({ actionType: 'others', actionId: 0, name: 'pass', enabled: this.energy >= this.maxEnergy ? false : true });
        return actions;
    }

    attackAction(id, target){
        console.log('attackAction', { id, target: target.hero.name })
        let actionId = this.atks.findIndex(val => val.actionId == id);
        let damage = this.attack(actionId);
        if(damage.energy > this.energy){
            this.pass();
            return;
        }
        this.energy = this.energy - damage.energy;
        damage.enemy = this;
        target.receivedDamage(damage);

        this.checkActions();
    }

    spellAction(id, target){
        console.log('spellAction', { id, target: target.hero.name })
        let actionId = this.spells.findIndex(val => val.actionId == id);
        let damage = this.spell(actionId);
        if(damage.energy > this.energy){
            this.pass();
            return;
        }
        this.energy = this.energy - damage.energy;
        damage.enemy = this;
        target.receivedDamage(damage);

        this.checkActions();
    }

    othersAction(id, target){
        console.log('othersAction', { id, target: target.hero.name })
        this.pass();

        this.checkActions();
    }

    runAction(actionType, actionId, target){        
        switch(actionType){
            case 'attack':
                this.attackAction(actionId, target);
                break;
            case 'spell':
                this.spellAction(actionId, target);
                break;
            default:
                this.othersAction(actionId, target);
                break;
        }
    }

    removeDuplicate(arr){
        return [...new Set(arr)];
    }

    filterActions(filter = []){
        let actions = [];
        for(let i = 0; i < filter.length; i++){
            let f = filter[i];
            actions = actions.concat(this.atks.filter(action => action[f.prop] == f.val));
            actions = actions.concat(this.spells.filter(action => action[f.prop] == f.val));
            actions = actions.concat([{ actionType: 'others', actionId: 0, name: 'pass', enabled: this.energy >= this.maxEnergy ? false : true }].filter(action => action[f.prop] == f.val));
        }
        return this.removeDuplicate(actions);
    }

    getAllActions(){
        this.checkActions();
        return {
            attacks: this.filterActions([{ prop: 'actionType', val: 'attack' }]),
            spells: this.filterActions([{ prop: 'actionType', val: 'spell' }]),
            others: this.filterActions([{ prop: 'actionType', val: 'others' }]),
            titles: ['attacks', 'spells', 'others']
        };
    }
}

module.exports = Card;