const express = require('express')
// const bodyParser = require('body-parser')
const servico = express()
servico.use(express.json())
const porta = 9000

const agendamentos = {}
contador = 0

servico.get("/agendamentos", (req, res) => {
    res.send(agendamentos)
})

servico.post("/agendamentos", (req, res) => {
    const { nome } = req.body
    const { data } = req.body
    const { hora } = req.body
    const { local } = req.body
    agendamentos[++contador] = { contador, nome, data, hora, local }
    res.status(201).send(agendamentos[contador])
})

servico.listen(porta, () => {
    console.log(`Serviços de agendamentos rodando na porta ${porta}`)
})