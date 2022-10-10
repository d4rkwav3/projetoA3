import express from 'express'
//import mysql from 'mysql2/promise'
//import Agendamento from '../models/agendamento.mjs'
import { Database } from '../models/database.mjs'

const servico = express()
servico.use(express.json())
const porta = 9000
const db = new Database('localhost', 'projetoA3', 'projetoA3', 'projetoA3')

servico.get("/agendamentos", async (req, res) => {
    let resultado = await db.selectAll('Agendamento')
    res.send(resultado)
})

servico.post("/agendamentos", async (req, res) => {
    let tabela = 'Agendamento'
    let colunas = '(nome, dia, hora, endereco)'
    let valores = [req.body.nome, req.body.data, req.body.hora, req.body.local]
    let insert = await db.insert(tabela, colunas, valores)
    res.status(201).send(insert)
})

servico.listen(porta, () => {
    console.log(`Serviços de agendamentos rodando na porta ${porta}`)
})