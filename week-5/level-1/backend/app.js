const express = require('express');
const app = express();
const PORT = 3000;
app.get('/', (req, res) => {
    res.send('Hello Human!');
})

app.listen(PORT, () => {
    console.log(`The Server is up and listening on the port: ${PORT}`);
})