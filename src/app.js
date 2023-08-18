/* APP.JS */

import express from 'express';
const app = express()

app.use(express.json)

import { ProductManager } from "./ProductManager";
const productManager = new ProductManager();

/* const prods = [
    { id: 1, nombre: "Papas fritas", categoria: 'Snacks', code: 'S1' },
    { id: 2, nombre: "Lentejas", categoria: 'Legumbres', code: 'L1' },
    { id: 3, nombre: "Nachos", categoria: 'Snacks', code: 'S2' }
]  */

app.use(express.urlencoded({extended:true}))

app.get('/products', (req,res) => {
    const limit = parseInt(req.query.limit)
    if (isNaN(limit)) {
        res.json(productManager);
    } else {
        res.json(productManager.slice(0, limit));
    }

})

app.get('/products/:id', (req, res) => {

    const prodById = productManager.find(prod => prod.id === parseInt(req.params.id))
    
    if (prodById) {
        res.json(prodById)
    } else {
        res.status(404).json({ error: 'Producto no encontrado' })
    }
    
})

app.listen(8080,() => {
    console.log("Servidor en puerto 8080!")
})