import express from 'express'
import cors from 'cors'
import axios from 'axios'
import Database from '../models/database.mjs'
import { config } from '../../config.mjs'

const servico = express()
servico.use(express.json())
servico.use(cors())
const porta = config.portas.sessao
const db = new Database(
    config.database.host, 
    config.database.user, 
    config.database.password, 
    config.database.database)
const msg = `Serviços de sessões rodando na porta ${porta}`
const eventUrl = "http://localhost:9900/eventos"

servico.get('/sessao', async (req, res) => {
    let resultado = await db.selectAll('Sessao')
    axios.post(eventUrl, {
        tipo: "Busca sessões",
        resultado
    })
    console.log(msg)
    res.status(200).send(resultado)
})

servico.post('/sessao', async (req, res) => {
    let tabela = 'Sessao'
    let colunas = '(observacoes, notas, agendamento_id, paciente_id, psicologo_id)'
    let valores = [req.query.observacoes, req.query.notas, req.query.agendamento_id, req.query.paciente_id, req.query.psicologo_id]
    let insert = await db.insert(tabela, colunas, valores)
    axios.post(eventUrl, {
        tipo: "Sessão realizada",
        insert
    })
    console.log(insert)
    console.log(msg)

    res.status(201).send(insert)
})

servico.listen(porta, () => {
    console.log(msg)
})