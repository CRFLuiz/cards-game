const appendElement = (appends = [], element) => {
    for(let i = 0; i < appends.length; i++){
        element.appendChild(appends[i]);
    }
}

const createElementAndAddProperties = (properties = [], element = 'div', classes = []) => {
    const el = document.createElement(element);
    for(let i = 0; i < properties.length; i++){
        el[properties[i].prop] = properties[i].val;
    }
    el.classList.add(...classes);
    return el;
}

const createElementAndAddClass = (classes = [], element = 'div') => {
    const el = document.createElement(element);
    el.classList.add(...classes);
    return el;
}

const createHeroDetails = (hero, div) => {
    const heroBox = createElementAndAddClass(['row', 'heroBox']);

    const box1 = createElementAndAddClass(['box1']);
    const imageBox = createElementAndAddClass(['col-12', 'imageBox']);
    const image = createElementAndAddProperties([{ prop: 'src', val: hero.thumb }], 'img');
    const box2 = createElementAndAddClass(['box2']);
    const nameBox = createElementAndAddProperties([{ prop: 'textContent', val: hero.name }], 'div', ['col-12', 'nameBox']);
    const typeBox = createElementAndAddProperties([{ prop: 'textContent', val: hero.type }], 'div', ['col-12', 'typeBox']);
    const statsBox = createElementAndAddClass(['row', 'statsBox']);
    const statsBoxA = createElementAndAddClass(['col-8', 'statsBoxA'])
    const statsBoxARow = createElementAndAddClass(['row', 'statsBoxARow']);
    const healthA = createElementAndAddProperties([{ prop: 'textContent', val: 'Health:' }], 'div', ['col-12', 'createHealthA']);
    const energyA = createElementAndAddProperties([{ prop: 'textContent', val: 'Energy:' }], 'div', ['col-12', 'createEnergyA']);
    const attackA = createElementAndAddProperties([{ prop: 'textContent', val: 'Attack:' }], 'div', ['col-12', 'createAttackA']);
    const spellA = createElementAndAddProperties([{ prop: 'textContent', val: 'Spell:' }], 'div', ['col-12', 'createSpellA']);
    const physicalResistanceA = createElementAndAddProperties([{ prop: 'textContent', val: 'Physical Resistance:' }], 'div', ['col-12', 'createPhysicalResistanceA']);
    const magicResistanceA = createElementAndAddProperties([{ prop: 'textContent', val: 'Magic Resistance:' }], 'div', ['col-12', 'createMagicResistanceA']);
    const statsBoxB = createElementAndAddClass(['col-4', 'statsBoxB']);
    const statsBoxBRow = createElementAndAddClass(['row', 'statsBoxBRow']);
    const healthB = createElementAndAddProperties([{ prop: 'textContent', val: hero.health }], 'div', ['col-12', 'healthB']);
    const energyB = createElementAndAddProperties([{ prop: 'textContent', val: hero.energy }], 'div', ['col-12', 'energyB']);
    const attackB = createElementAndAddProperties([{ prop: 'textContent', val: hero.physicalDamage }], 'div', ['col-12', 'attackB']);
    const spellB = createElementAndAddProperties([{ prop: 'textContent', val: hero.magicDamage }], 'div', ['col-12', 'spellB']);
    const physicalResistanceB = createElementAndAddProperties([{ prop: 'textContent', val: hero.physicalResistance }], 'div', ['col-12', 'physicalResistanceB']);
    const magicResistanceB = createElementAndAddProperties([{ prop: 'textContent', val: hero.magicResistance }], 'div', ['col-12', 'magicResistanceB']);
    
    appendElement([heroBox], div);

    appendElement([box1, box2], heroBox);

    appendElement([imageBox], box1);
    
    appendElement([nameBox, typeBox, statsBox], box2);
    
    appendElement([image], imageBox);

    appendElement([statsBoxA, statsBoxB], statsBox);

    appendElement([statsBoxARow], statsBoxA);
    appendElement([statsBoxBRow], statsBoxB);

    appendElement([healthA, energyA, attackA, spellA, physicalResistanceA, magicResistanceA], statsBoxARow);
    appendElement([healthB, energyB, attackB, spellB, physicalResistanceB, magicResistanceB], statsBoxBRow);
}

const paintingMediumHero = (hero) => {
    const div = document.createElement('div');
    div.classList.add('paintingMediumHero');

    createHeroDetails(hero, div);
    return div;
}

const paintingSmallCard = (card) => {
    const div = document.createElement('div');
    div.classList.add('paintingSmallHero');

    const imageDiv = createElementAndAddClass(['imageDiv']);
    const image = createElementAndAddProperties([{ prop: 'src', val: card.hero.thumb }], 'img', ['heroImageThumb'])
    appendElement([image], imageDiv);
    appendElement([imageDiv], div);
    return div;
}