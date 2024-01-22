const renderPontuationTitleDiv = pontuation => {
    const emptyDiv = createElementAndAddClass(['col-5', 'emptyDiv']);
    const roundsDiv = createElementAndAddClass(['col-5', 'roundsDiv']);
    const totalDiv = createElementAndAddClass(['col-2', 'totalDiv']);
    
    const roundsTitleDivRow = createElementAndAddClass(['row', 'roundsTitleDivRow']);
    const roundsTitleDiv = createElementAndAddClass(['col-12', 'roundsTitleDiv']);
    roundsTitleDivRow.appendChild(roundsTitleDiv);

    const roundsNumDivRow = createElementAndAddClass(['row', 'roundsNumDivRow']);
    const roundsNumDiv = [
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv'])
    ];
    appendElement(roundsNumDiv, roundsNumDivRow);

    roundsTitleDiv.appendChild(document.createTextNode('Rounds'));
    roundsNumDiv.forEach((round, i) => {
        round.appendChild(document.createTextNode(i+1));
    });
    totalDiv.appendChild(document.createTextNode('Total'));

    appendElement([roundsTitleDivRow, roundsNumDivRow], roundsDiv);

    return [emptyDiv, roundsDiv, totalDiv];
}

const renderPontuationPlayer1Div = (pontuation) => {
    const labelDiv = createElementAndAddClass(['col-5', 'labelDiv']);
    const totalDiv = createElementAndAddClass(['col-2', 'totalDiv']);

    const roundsNumDiv = [
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv'])
    ];
    labelDiv.appendChild(document.createTextNode('Player 1'));
    roundsNumDiv.forEach((round, i) => {
        round.appendChild(document.createTextNode(pontuation[0][i]));
    });
    totalDiv.appendChild(document.createTextNode(pontuation[0].reduce((prev, cur) => prev + cur, 0)));

    return [labelDiv].concat(roundsNumDiv).concat([totalDiv]);
}

const renderPontuationPlayer2Div = (pontuation) => {
    const labelDiv = createElementAndAddClass(['col-5', 'labelDiv']);
    const totalDiv = createElementAndAddClass(['col-2', 'totalDiv']);

    const roundsNumDiv = [
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv']),
        createElementAndAddClass(['col', 'roundsNumDiv'])
    ];
    labelDiv.appendChild(document.createTextNode('Player 2'));
    roundsNumDiv.forEach((round, i) => {
        round.appendChild(document.createTextNode(pontuation[1][i]));
    });
    totalDiv.appendChild(document.createTextNode(pontuation[1].reduce((prev, cur) => prev + cur, 0)));

    return [labelDiv].concat(roundsNumDiv).concat([totalDiv]);
}

const renderPontuation = (pontuation) => {
    const screen = document.querySelector('.gameMatchDiv');
    screen.innerHTML = '';

    let titleDiv = createElementAndAddClass(['row', 'titleDiv']);
    let player1Div = createElementAndAddClass(['row', 'player1Div']);
    let player2Div = createElementAndAddClass(['row', 'player2Div']);
    appendElement([titleDiv, player1Div, player2Div], screen);

    let title = renderPontuationTitleDiv(pontuation);
    appendElement(title, titleDiv);

    let player1 = renderPontuationPlayer1Div(pontuation);
    appendElement(player1, player1Div);

    let player2 = renderPontuationPlayer2Div(pontuation);
    appendElement(player2, player2Div);
}

const startMatch = ev => {
    socket.emit('startMatch');
}

const renderButtons = obj => {
    const buttonsDiv = createElementAndAddClass(['buttonsDiv']);
    for(let i = 0; i < obj.titles.length; i++){
        const titleDiv = createElementAndAddClass(['row', 'titleDiv', obj.titles[i]]);
        const titleParagraphDiv = createElementAndAddClass(['col-12', 'titleDiv', obj.titles[i]]);
        const titleParagraph = createElementAndAddClass(['titleDivParagraph'], 'p');
        const titleParagraphText = document.createTextNode(obj.titles[i]);
        titleParagraph.appendChild(titleParagraphText);
        titleParagraphDiv.appendChild(titleParagraph);
        titleDiv.appendChild(titleParagraphDiv);
        for(let j = 0; j < obj[obj.titles[i]].length; j++){
            const actionButtonDiv = createElementAndAddClass(['col', 'actionButtonDiv']);
            const actionButton = createElementAndAddClass(['btn', `${obj[obj.titles[i]][j].btnColor || 'btn-primary'}`, 'actionButton', `${obj[obj.titles[i]][j].actionType}Type`], 'button');
            const actionButtonText = document.createTextNode(obj[obj.titles[i]][j].actionId);
            if(!obj[obj.titles[i]][j].enabled) actionButton.disabled = true;
            actionButton.appendChild(actionButtonText);
            actionButtonDiv.appendChild(actionButton);
            titleDiv.appendChild(actionButtonDiv);
        }
        buttonsDiv.appendChild(titleDiv);
    }
    return buttonsDiv;
}

const renderStatusInfo = obj => {
    const statusInfoDiv = createElementAndAddClass(['row', 'statusInfoDiv']);
    const matchInfo = createElementAndAddClass(['col-12', 'matchInfo']);
    statusInfoDiv.appendChild(matchInfo);

    const round = createElementAndAddClass([], 'p');
    const roundText = document.createTextNode(`Round: ${obj.round}`);
    round.appendChild(roundText);
    const player1points = createElementAndAddClass(['player1points'], 'p');
    const player1pointsText = document.createTextNode(`Player 1 points: ${obj.pontuation[0].reduce((prev, cur, ) => prev + cur, 0)}`);
    player1points.appendChild(player1pointsText);
    const player2points = createElementAndAddClass(['player2points'], 'p');
    const player2pointsText = document.createTextNode(`Player 2 points: ${obj.pontuation[1].reduce((prev, cur, ) => prev + cur, 0)}`);
    player2points.appendChild(player2pointsText);

    appendElement([round, player1points, player2points], matchInfo);
    return statusInfoDiv;
}

const renderStatusHistory = obj => {
    const statusHistoryDiv = createElementAndAddClass(['row', 'statusHistoryDiv']);
    const historyLogs = createElementAndAddClass(['col-12', 'historyLogs']);
    statusHistoryDiv.appendChild(historyLogs);
    const statusHistoryDivText = document.createTextNode('History:');
    const statusHistoryLogDiv = createElementAndAddClass(['col-12', 'statusHistoryDiv']);
    appendElement([statusHistoryDivText, statusHistoryLogDiv], historyLogs);

    for(let i = obj.history.length - 1; i >= 0; i--){
        const historyLog = createElementAndAddClass(['historyLog'], 'p');
        const historyLogText = document.createTextNode(`Player ${obj.history[i].player}: ${obj.history[i].move.actionType} ${obj.history[i].move.actionId}`);
        historyLog.appendChild(historyLogText);
        statusHistoryLogDiv.appendChild(historyLog);
    }
    return statusHistoryDiv;
}

const renderStatus = obj => {
    const statusDiv = createElementAndAddClass(['statusDiv']);
    const statusInfoDiv = renderStatusInfo(obj);
    const statusHistoryDiv = renderStatusHistory(obj);

    appendElement([statusInfoDiv, statusHistoryDiv], statusDiv);
    return statusDiv;
}

const firstSectionCardFunction = (name, type) => {
    const firstSectionRow = createElementAndAddClass(['row', 'firstSectionRow']);
    const nameDiv = createElementAndAddClass(['col-12', 'nameDiv']);
    const nameParagraph = createElementAndAddClass(['nameParagraph'], 'p');
    nameText = document.createTextNode(name);
    nameDiv.appendChild(nameParagraph);
    nameParagraph.appendChild(nameText);
    const typeDiv = createElementAndAddClass(['col-12', 'typeDiv']);
    const typeParagraph = createElementAndAddClass(['typeParagraph'], 'p');
    typeText = document.createTextNode(type);
    typeDiv.appendChild(typeParagraph);
    typeParagraph.appendChild(typeText);

    appendElement([nameDiv, typeDiv], firstSectionRow);
    return firstSectionRow;
}

const secondSectionCardFunction = (imageUrl) => {
    const secondSectionRow = createElementAndAddClass(['row', 'secondSectionRow']);
    const imageDiv = createElementAndAddClass(['col-12', 'imageDiv']);
    const div = document.createElement('div');
    const image = createElementAndAddClass([], 'img');
    image.src = imageUrl;
    div.appendChild(image);
    imageDiv.appendChild(div);
    secondSectionRow.appendChild(imageDiv);

    return secondSectionRow;
}

const thirdSectionCardFunction = (card) => {
    const thirdSectionRow = createElementAndAddClass(['row', 'thirdSectionRow']);
    const thirdSectionDiv = createElementAndAddClass(['col-12', 'thirdSectionDiv']);
    thirdSectionRow.appendChild(thirdSectionDiv);
    
    const titleDivRow = createElementAndAddClass(['row', 'titleDivRow']);
    thirdSectionDiv.appendChild(titleDivRow);
    const emptyDiv = createElementAndAddClass(['col-2', 'emptyDiv']);
    const physicalDiv = createElementAndAddClass(['col-5', 'physicalDiv']);
    const physicalDivParagraph = createElementAndAddClass(['physicalDivParagraph'], 'p');
    const physicalDivText = document.createTextNode('Physical');
    physicalDivParagraph.appendChild(physicalDivText);
    physicalDiv.appendChild(physicalDivParagraph);
    const magicDiv = createElementAndAddClass(['col-5', 'magicDiv']);
    const magicDivParagraph = createElementAndAddClass(['magicDivParagraph'], 'p');
    const magicDivText = document.createTextNode('Magic');
    magicDivParagraph.appendChild(magicDivText);
    magicDiv.appendChild(magicDivParagraph);
    appendElement([emptyDiv, physicalDiv, magicDiv], titleDivRow);
    
    const damageDivRow = createElementAndAddClass(['row', 'damageDivRow']);
    thirdSectionDiv.appendChild(damageDivRow);
    const iconDivDamage = createElementAndAddClass(['col-2', 'iconDivDamage']);
    const iconDivDamageTag = createElementAndAddClass(['bi', 'bi-heart-arrow'], 'i');
    iconDivDamage.appendChild(iconDivDamageTag);
    const physicalDivDamage = createElementAndAddClass(['col-5', 'physicalDivDamage']);
    const physicalDivDamageParagraph = createElementAndAddClass(['physicalDivDamageParagraph'], 'p');
    const physicalDivDamageText = document.createTextNode(card.physicalDamage);
    physicalDivDamageParagraph.appendChild(physicalDivDamageText);
    physicalDivDamage.appendChild(physicalDivDamageParagraph);
    const magicDivDamage = createElementAndAddClass(['col-5', 'magicDivDamage']);
    const magicDivDamageParagraph = createElementAndAddClass(['magicDivDamageParagraph'], 'p');
    const magicDivDamageText = document.createTextNode(card.magicDamage);
    magicDivDamageParagraph.appendChild(magicDivDamageText);
    magicDivDamage.appendChild(magicDivDamageParagraph);
    appendElement([iconDivDamage, physicalDivDamage, magicDivDamage], damageDivRow);
    
    const resistanceDivRow = createElementAndAddClass(['row', 'resistanceDivRow']);
    thirdSectionDiv.appendChild(resistanceDivRow);
    const iconDivResistance = createElementAndAddClass(['col-2', 'iconDivResistance']);
    const iconDivResistanceTag = createElementAndAddClass(['bi', 'bi-shield-fill'], 'i');
    iconDivResistance.appendChild(iconDivResistanceTag);
    const physicalDivResistance = createElementAndAddClass(['col-5', 'physicalDivResistance']);
    const physicalDivResistanceParagraph = createElementAndAddClass(['physicalDivResistanceParagraph'], 'p');
    const physicalDivResistanceText = document.createTextNode(card.physicalResistance);
    physicalDivResistanceParagraph.appendChild(physicalDivResistanceText);
    physicalDivResistance.appendChild(physicalDivResistanceParagraph);
    const magicDivResistance = createElementAndAddClass(['col-5', 'magicDivResistance']);
    const magicDivResistanceParagraph = createElementAndAddClass(['magicDivResistanceParagraph'], 'p');
    const magicDivResistanceText = document.createTextNode(card.magicResistance);
    magicDivResistanceParagraph.appendChild(magicDivResistanceText);
    magicDivResistance.appendChild(magicDivResistanceParagraph);
    appendElement([iconDivResistance, physicalDivResistance, magicDivResistance], resistanceDivRow);

    return thirdSectionRow;
}

const renderSideCard = card => {
    const cardRow = createElementAndAddClass(['row', 'cardRow']);
    const firstSection = createElementAndAddClass(['col-12']);  // NAME AND TYPE
    const secondSection = createElementAndAddClass(['col-12']); // IMAGE
    const thirdSection = createElementAndAddClass(['col-12']);  // CARD ATTRIBUTES

    firstSection.appendChild(firstSectionCardFunction(card.hero.name, card.hero.type));
    secondSection.appendChild(secondSectionCardFunction(card.hero.thumb));
    thirdSection.appendChild(thirdSectionCardFunction(card));

    appendElement([firstSection, secondSection, thirdSection], cardRow);
    return cardRow;
}

const renderSideInfo = (health, energy) => {
    const infoRow = createElementAndAddClass(['row', 'infoRow']);

    const healthDiv = createElementAndAddClass(['col-12', 'healthDiv']);
    const healthParagraph = createElementAndAddClass(['healthParagraph'], 'p');
    const healthMaxDiv = createElementAndAddClass(['col-12', 'healthMaxDiv']);
    const healthPercent = createElementAndAddClass(['col-12', 'healthPercent']);
    healthMaxDiv.appendChild(healthPercent);
    healthPercent.style.width = `${Math.floor((health.cur / health.max) * 100)}%`;
    healthPercent.style.height = "20px";
    healthText = document.createTextNode(`Health ${health.cur} / ${health.max}`);
    healthParagraph.appendChild(healthText);
    appendElement([healthParagraph, healthMaxDiv], healthDiv);

    const energyDiv = createElementAndAddClass(['col-12', 'energyDiv']);
    const energyParagraph = createElementAndAddClass(['energyParagraph'], 'p');
    const energyMaxDiv = createElementAndAddClass(['col-12', 'energyMaxDiv']);
    const energyPercent = createElementAndAddClass(['col-12', 'energyPercent']);
    energyMaxDiv.appendChild(energyPercent);
    energyPercent.style.width = `${Math.floor((energy.cur / energy.max) * 100)}%`;
    energyPercent.style.height = "20px";
    energyText = document.createTextNode(`Energy ${energy.cur} / ${energy.max}`);
    energyParagraph.appendChild(energyText);
    appendElement([energyParagraph, energyMaxDiv], energyDiv);

    appendElement([healthDiv, energyDiv], infoRow);
    return infoRow;
}

const renderSide = (card, side) => {
    const cardDiv = createElementAndAddClass(['col-12', 'cardDiv']);
    cardDiv.appendChild(renderSideCard(card));
    const infoDiv = createElementAndAddClass(['col-12', 'infoDiv']);
    infoDiv.appendChild(renderSideInfo({ max: card.maxHealth, cur: card.health }, { max: card.maxEnergy, cur: card.energy }));

    const sideDiv = createElementAndAddClass(['sideDiv', `side-${side}`]);
    appendElement([cardDiv, infoDiv], sideDiv);
    return sideDiv;
}

const renderSides = (cardA, cardB) => {
    const matchA = createElementAndAddClass(['matchA', 'col-6']);
    const matchB = createElementAndAddClass(['matchB', 'col-6']);

    matchA.appendChild(renderSide(cardA, 'A'));
    matchB.appendChild(renderSide(cardB, 'B'));
    
    return [matchA, matchB]
}

const renderMatch = obj => {
    const matchDiv = createElementAndAddClass(['matchDiv']);
    const matchRow = createElementAndAddClass(['row', 'matchRow']);
    matchDiv.appendChild(matchRow);

    
    appendElement(renderSides(obj.playerCard, obj.player2[obj.round > 0 ? obj.round - 1 : 0]), matchRow)
    return matchDiv;
}

const updateGlobalStatus = (obj) => {
    let { playerActions, playerAllActions, playerCard } = obj;
    GlobalStatus.player1 = { playerActions, playerAllActions, playerCard };
}

const renderGame = (obj) => {
    const screen = document.getElementById('screenMain');
    screen.innerHTML = '';
    let buttonsDiv = createElementAndAddClass(['col-3', 'gameButtonsDiv']);
    let matchDiv = createElementAndAddClass(['col-6', 'gameMatchDiv']);
    let statusDiv = createElementAndAddClass(['col-3', 'gameStatusDiv']);
    appendElement([buttonsDiv, matchDiv, statusDiv], screen);

    let buttons = renderButtons(obj.playerAllActions);
    appendElement([buttons], buttonsDiv);
    control();

    let match = renderMatch(obj);
    appendElement([match], matchDiv);

    let status = renderStatus(obj);
    appendElement([status], statusDiv);

    updateGlobalStatus(obj);
}

const GlobalStatus = {};