import express from 'express';

const app = express()

app.get('/saludo', (req,res) => {
    res.send('Hola mundo AAAA')
})

app.listen(8080,() => {
    console.log("Servidor en puerto 8080!")
})