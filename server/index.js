const express = require('express');

const port = 5000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({ message: 'test2' })
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});