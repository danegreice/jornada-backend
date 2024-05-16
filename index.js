require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const PORT = process.env.PORT ?? 3333;


const dbUrl = process.env.DATABASE_URL
const dbName = process.env.DATABASE_NAME

//const dbUrl = "mongodb+srv://admin:JHy9QG6y9kLJItWK@cluster0.jg2n1i9.mongodb.net"
//const dbName = "ocean-jornada-backend-maio-2024"

const client = new MongoClient(dbUrl);
const main = async () => {
    console.log("Conectando com o banco de dados...");
    await client.connect();
    console.log("Banco de dados conectado com suceso");

    const app = express();

    app.use(express.json())

    app.get("/", (req, res) => {
        res.send("Hello world, Dani");
    })

    app.get("/oi", (req, res) => {
        res.send("Olá mundo");
    })

    const itens = ["Elena Gilbert", "Stefan Salvatore", "Damon Salvatore"];

    const db = client.db(dbName);
    const collection = db.collection("item");

    app.get("/item", async (req, res) => {
        const documentos = await collection.find().toArray();
        res.status(200).json(documentos);
    })

    app.get("/item/:id", async (req, res) => {
        const id = req.params.id;

        const item = await collection.findOne({_id: new ObjectId(id)});
        res.status(200).json(item);
    })

    app.post("/item", (req, res) => {
        const body = req.body;
        const novoItem = body.nome;

        collection.insertOne({nome: novoItem})
        //itens.push(novoItem);

        res.status(200).json();
    })

    app.put("/item/:id", async (req, res) => {
        const id = req.params.id;

        const body = req.body;
        const itemAtualizado = body.nome;

        await collection.updateOne({_id: new ObjectId(id)}, {$set: {nome: itemAtualizado}})

        res.status(200).json();
    })

    app.delete("/item/:id", async (req, res) => {
        const id = req.params.id;

        await collection.deleteOne({_id: new ObjectId(id)})

        res.status(200).json();
    })

    app.listen(PORT);
}

main();