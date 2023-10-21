// configuração inicia
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// form de ler json
app.use(
  express.urlencoded({
    extended: true
  }) 
)
app.use(express.json())

// rotas da api
const persoinRouter = require('./router/personRoutes')
app.use('/person',persoinRouter)

// rota inicial / endpoint
app.get('/', (req,res) => {
  // mostra req
  res.json({message:'oi express'})

})


// iniciar um porta
const usuario = process.env.usuario
const senha = encodeURIComponent(process.env.senha)
mongoose
  .connect(`mongodb+srv://${usuario}:${senha}@node2.xx8rzuj.mongodb.net/`)
  .then(() => {
    console.log("Conectamos ao MongoDB");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
