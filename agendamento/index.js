import express from 'express'
import mysql from 'mysql2/promise'
import Agendamento from '../models/agendamento.mjs'

const servico = express()
servico.use(express.json())
const porta = 9000
const credentials = {
    host: 'localhost',
    user: 'projetoA3',
    password: 'projetoA3',
    database: 'projetoA3'
}

let base
const agendamentos = {}
let contador = 0

servico.get("/agendamentos", async (req, res) => {
    const conn = await mysql.createConnection(credentials)
    let [rows] = await conn.query("SELECT * FROM Agendamento", [], (err, results, fields) => {})
    console.log(rows)
    res.send(base = rows)
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