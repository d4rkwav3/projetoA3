import express from 'express'
import { Database } from '../models/database.mjs'
import { config as cfg } from '../config.mjs'

const servico = express()
servico.use(express.json())
const porta = cfg.portas.consulta
const db = new Database(cfg.db.host, cfg.db.user, cfg.db.passwd, cfg.db.base)
const msg = `Serviços de consultas rodando na porta ${porta}`

servico.get('/consultas', async (req, res) => {
    let resultado = await db.selectAll('Consulta')

    console.log(msg)

    res.status(200).send(resultado)
})

servico.post('/consultas', async (req, res) => {
    let tabela = 'Consulta'
    let colunas = '(observacoes, orientacoes, agendamentoId)'
    let valores = [req.body.observacoes, req.body.orientacoes, req.body.agendamentoId]
    let insert = await db.insert(tabela, colunas, valores)

    console.log(msg)

    res.status(201).send(insert)
})

servico.listen(porta, () => {
    console.log(msg)
})