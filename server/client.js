const net = require('net');

const client = net.createConnection({ port: 5000 }, () => {
    client.write('hello');
});

client.on('data', data => {
    console.log(data.toString());
    client.end();
});