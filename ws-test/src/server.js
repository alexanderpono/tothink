const webSocket = require('ws')
const wss = new webSocket.Server({ port: 8080 })
wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
    })
    ws.send('ho!')
})