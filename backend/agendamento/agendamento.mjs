import express from 'express'
import cors from 'cors'
import axios from 'axios'
import moment from 'moment';
import Database from '../models/database.mjs'
import { config } from '../../config.mjs'

const servico = express()
servico.use(express.json())
servico.use(cors())
const porta = config.portas.agendamento
const db = new Database(
    config.database.host, 
    config.database.user, 
    config.database.password, 
    config.database.database)
const msg = `Serviços de agendamentos rodando na porta ${porta}`
const eventUrl = "http://localhost:9900/eventos"

servico.get("/agendamentos", async (req, res) => {
    console.log(req.query)
    if (req.query.cpf) {
        let now = moment().format("YYYY-MM-DD")
        let resultado = await db.getNextAppointments(req.query.cpf, now)
        axios.post(eventUrl, {
            tipo: "Busca agendamentos",
            resultado
        })
        res.status(200).send(resultado)
    } else if (req.query.psicologo_crp) {
        let now = moment().format("YYYY-MM-DD")
        let resultado = await db.getNextSessions(req.query.psicologo_crp, now)
        axios.post(eventUrl, {
            tipo: "Busca agendamentos",
            resultado
        })
        res.status(200).send(resultado)
    }
    console.log(msg)
})

servico.post("/agendamentos", async (req, res) => {
    // console.log("Testando", req.query)
    let tabela = 'Agendamento'
    let colunas = '(nome, sobrenome, data_hora, sala, paciente_id, psicologo_crp)'
    let valores = [req.query.nome, req.query.sobrenome, req.query.data_hora, req.query.sala, req.query.paciente_id, req.query.psicologo_crp]
    let insert = await db.insert(tabela, colunas, valores)
    axios.post(eventUrl, {
        tipo: "Novo agendamento",
        insert
    })
    console.log(msg)
    res.status(201).send(insert)
})

servico.delete("/agendamentos", async (req, res) => {
    let id = req.query.id
    let remover = await db.removeAppointment(req.query.id)
    console.log(remover)
    axios.post(eventUrl, {
        tipo: "Agendamento removido",
        id
    })
    res.status(200).send(remover)
})

servico.listen(porta, () => {
    console.log(msg)
})