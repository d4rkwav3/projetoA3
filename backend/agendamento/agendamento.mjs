import express from 'express'
import Database from '../models/database.mjs'
import { config } from '../../config.mjs'

const servico = express()
servico.use(express.json())
const porta = config.portas.agendamento
const db = new Database(
    config.database.host, 
    config.database.user, 
    config.database.password, 
    config.database.database)
const msg = `Serviços de agendamentos rodando na porta ${porta}`

servico.get("/agendamentos", async (req, res) => {
    let resultado = await db.selectAll('Agendamento')
    console.log(msg)
    res.send(resultado)
})

servico.post("/agendamentos", async (req, res) => {
    let tabela = 'Agendamento'
    let colunas = '(ag_data, hora, sala, paciente_id)'
    let valores = [req.query.ag_data, req.query.hora, req.query.sala, req.query.paciente_id]
    let insert = await db.insert(tabela, colunas, valores)

    console.log(msg)
    res.status(201).send(insert)
})

servico.listen(porta, () => {
    console.log(msg)
})