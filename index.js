const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello world, Dani");
})

app.get("/oi", (req, res) => {
    res.send("Olá mundo");
})

app.listen(3000);