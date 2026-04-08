const { Client, LocalAuth } = require('whatsapp-web.js');
const commandHandler = require('./modules/commandHandler');
const eventHandler = require('./modules/eventHandler');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Bot is ready!');
    eventHandler(client);
});

client.initialize();