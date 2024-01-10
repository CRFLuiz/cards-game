const screenBasicControl = document.getElementById('screenBasicControl');
const screenPlayerA = document.getElementById('screenPlayerA');
const screenMain = document.getElementById('screenMain');
const screenPlayerB = document.getElementById('screenPlayerB');

const btnScreenBasicControl = document.getElementById('startMatch');

const main = async () => {
    websocket.io();
    btnScreenBasicControl.addEventListener('click', startMatch);
}

main();