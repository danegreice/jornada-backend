const express = require("express");
const app = express();

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
app.listen(3000);