import express from 'express'
import { Database } from '../models/database.mjs'
import { config as cfg } from '../config.mjs'

const servico = express()
servico.use(express.json())
const porta = cfg.portas.agendamento
const db = new Database(cfg.db.host, cfg.db.user, cfg.db.passwd, cfg.db.base)
const msg = `Serviços de agendamentos rodando na porta ${porta}`

servico.get("/agendamentos", async (req, res) => {
    let resultado = await db.selectAll('Agendamento')

    console.log(msg)

    res.send(resultado)
})

servico.post("/agendamentos", async (req, res) => {
    let tabela = 'Agendamento'
    let colunas = '(nome, dia, hora, endereco)'
    let valores = [req.body.nome, req.body.data, req.body.hora, req.body.endereco]
    let insert = await db.insert(tabela, colunas, valores)

    console.log(msg)

    res.status(201).send(insert)
})

servico.listen(porta, () => {
    console.log(msg)
})