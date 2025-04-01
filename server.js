const express = require('express')
var cors = require("cors")
require("dotenv").config()

let key = process.env.RIOT_API_KEY

const app = express()
app.use(cors())
app.use(express.json()) // importante pra receber o fetch


const { getPuuid, getHist, getGameData, handleGameData, teste } = require("./app.js")

app.post('/', async (req, res) => {
  if (req.body != `{}`)
  {
    teste(req.body["nome"], req.body["tag"]).then((retorno)=>
      {
        if (retorno == "erro")
        {
          console.log(retorno)
          res.send({"erro": "erro"})
        }
        else
        {
          res.send(retorno)
        }
      }) 
  }
})

app.get("/puuid", async (req, res) => {
  getPuuid("T1 Cazeus", "lna")
})

app.listen(3000, () => {
  console.log(`Servidor rodando!`)
})