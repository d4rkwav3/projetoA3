const express = require('express')
const bodyParser = require('body-parser')
const servico = express()
servico.use(bodyParser.json())
const porta = 9000

agendamentos = {}
contador = 0

servico.get("/agendamentos", (req, res) => {
    res.send(agendamentos)
})

servico.put("/agendamentos", (req, res) => {
    contador++
    const { json } = req.body
    agendamentos[contador] = { contador, json }
    res.status(201).send(agendamentos[contador])
})

servico.listen(porta, () => {
    console.log(`Serviços de agendamentos rodando na porta ${porta}`)
})