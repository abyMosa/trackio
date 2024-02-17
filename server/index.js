const express = require('express');

const port = 5000;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('method', req.method);
    console.log('url', req.url);
    console.log('params', req.params);
    console.log('query', req.query);
    console.log('body', req.body);
    console.log('================');
    next();
});

app.get('/', (req, res) => {
    res.status(200).send({ message: 'test2' })
});


app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});