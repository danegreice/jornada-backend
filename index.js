const express = require("express");
const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello world, Dani");
})

app.get("/oi", (req, res) => {
    res.send("Olá mundo");
})

const itens = ["Elena Gilbert", "Stefan Salvatore", "Damon Salvatore"];

app.get("/item", (req, res) => {
    res.status(200).json(itens);
})

app.get("/item/:id", (req, res) => {
    const id = req.params.id;

    const item = itens[id-1];
    res.status(200).json(item);
})

app.post("/item", (req, res) => {
    const body = req.body;
    const novoItem = body.nome;

    itens.push(novoItem);
    
    res.status(200).json();
})

app.listen(3000);