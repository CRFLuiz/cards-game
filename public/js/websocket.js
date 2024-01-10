const websocket = {};
let socket = null;
let war = null;

websocket.io = async () => {
    socket = io();
    ioFunctions();
}

websocket.war = async () => {
    war = io('/war');
    warFunctions();
}