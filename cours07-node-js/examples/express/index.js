const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Salut tout le monde!')
})

app.listen(port, () => {
    console.log(`Exemple d'application écoutant sur le port ${port}`)
})