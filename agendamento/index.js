import express from 'express'
import Agendamento from '../models/agendamento.mjs'
const servico = express()
servico.use(express.json())
const porta = 9000

const agendamentos = {}
let contador = 0

servico.get("/agendamentos", (req, res) => {
    res.send(agendamentos)
})

servico.post("/agendamentos", (req, res) => {
    let agendamento = new Agendamento(
        req.body.nome,
        req.body.data,
        req.body.hora,
        req.body.local
        );
    agendamentos[++contador] = { agendamento }
    res.status(201).send(agendamentos[contador])
})

servico.listen(porta, () => {
    console.log(`Serviços de agendamentos rodando na porta ${porta}`)
})