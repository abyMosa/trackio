// const express = require('express');
const { Buffer } = require('buffer');
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
    // console.log('connection', connection);
    console.log('new client --- | ' + connection.remoteAddress + '|:|' + connection.remotePort);


    connection.on('data', data => {
        console.log('=====================');
        console.log('IMEI: ', `${data} \r\n`);
        const buf = Buffer.from(data);
        const json = JSON.stringify(buf);
        console.log('json', json);

        // if (data === '354018112743194') {
        //     console.log('IMEI: ', `${data} \r\n`);

        //     const x = new Uint8Array([0x01]);
        //     connection.write(x, 'utf8', (y) => {
        //         console.log(' write cb with y: ', y)
        //     });

        // } else {
        //     const buf = Buffer.from(data);
        //     const json = JSON.stringify(buf);
        //     console.log(json);
        // }


    });

    connection.on('error', data => {
        console.log('error data', `${data} \r\n`);
    });

    connection.on('end', () => {
        console.log('client left \r\n\r\n');
    });
})

server.listen(port, () => {
    console.log('lisening on port 5000');
});