// const express = require('express');
const net = require('net');

const port = 5000;
// const app = express();

// app.use(express.json());

// app.use((req, res, next) => {
//     console.log('method', req.method);
//     console.log('url', req.url);
//     console.log('params', req.params);
//     console.log('query', req.query);
//     console.log('body', req.body);
//     console.log('================');
//     next();
// });

// app.get('/', (req, res) => {
//     res.status(200).send({ message: 'test2' })
// });


// app.listen(port, () => {
//     console.log(`app is running on port ${port}`)
// });



const server = net.createServer(connection => {
    console.log('connection', connection);
    console.log('new client --- | ' + connection.remoteAddress + ':' + connection.remotePort);


    connection.on('data', data => {
        console.log('data', `${data} \r\n`);
        connection.write(`${data} \r\n`);
    });

    connection.on('error', data => {
        console.log('data', `${data} \r\n`);
    });

    connection.on('end', () => {
        console.log('client left \r\n\r\n');
    });
})

server.listen(port, () => {
    console.log('lisening on port 5000');
});