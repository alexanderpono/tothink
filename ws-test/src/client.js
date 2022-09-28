console.log('client.js');

const url = 'ws://localhost:8080';
let connection = new WebSocket(url);

connection.onopen = () => {
    console.log('connection.onopen!!!');
    console.log('connection=', connection);
    connection.send('hey');
}

connection.onerror = error => {
    console.log(`WebSocket error: ${error}`);
}

connection.onmessage = e => {
    console.log('onmessage e.data=', e.data)
}

connection.onclose = code => {
    console.log(`WebSocket close code=`, code);

    delayedReconnect();
}

function reconnect() {
    console.log('reconnect(): waiting 5 sec');
    try {
        connection = new WebSocket(url);
    }
    catch (e) {
        console.log('connection create error=', e);
        connection = null;
    }

    if (connection === null) {
        delayedReconnect();
    };
}

function delayedReconnect() {
    console.log('delayedReconnect(): waiting 5 sec');
    setTimeout(reconnect, 5000);
}

function sendHI() {
    console.log('sendHI()!');
    connection.send('HI');
}

window.sendHI = sendHI;