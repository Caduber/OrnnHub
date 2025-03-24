const express = require('express')
var cors = require("cors")
require("dotenv").config()

let key = process.env.RIOT_API_KEY

const app = express()
app.use(cors())
app.use(express.json()) // importante pra receber o fetch


const { getPuuid, getHist, getGameData, handleGameData, teste } = require("./app.js")

app.post('/', async (req, res) => {
    teste(req.body["nome"], req.body["tag"]).then((retorno)=>
    {
        console.log(retorno)
        res.send(retorno)
    })
})

app.listen(3000, () => {
  console.log(`Servidor rodando!`)
})