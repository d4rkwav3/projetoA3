import express from 'express'
import Database from '../models/database.mjs'
import { config } from '../../config.mjs'

const servico = express()
servico.use(express.json())
const porta = config.portas.sessao
const db = new Database(
    config.database.host, 
    config.database.user, 
    config.database.password, 
    config.database.database)
const msg = `Serviços de sessões rodando na porta ${porta}`

servico.get('/sessao', async (req, res) => {
    let resultado = await db.selectAll('Sessao')
    console.log(msg)
    res.status(200).send(resultado)
})

servico.post('/sessao', async (req, res) => {
    let tabela = 'Sessao'
    let colunas = '(observacoes, notas, agendamento_id, paciente_id, psicologo_id)'
    let valores = [req.query.observacoes, req.query.notas, req.query.agendamento_id, req.query.paciente_id, req.query.psicologo_id]
    let insert = await db.insert(tabela, colunas, valores)

    console.log(insert)
    console.log(msg)

    res.status(201).send(insert)
})

servico.listen(porta, () => {
    console.log(msg)
})