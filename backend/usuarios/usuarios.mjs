import express from 'express'
import cors from 'cors'
import axios from 'axios'
import Database from '../models/database.mjs'
import { config } from '../../config.mjs'

const servico = express()
servico.use(express.json())
servico.use(cors())
const porta = config.portas.usuarios
const db = new Database(
    config.database.host, 
    config.database.user, 
    config.database.password, 
    config.database.database)
const msg = `Serviços de usuários rodando na porta ${porta}`
const eventUrl = "http://localhost:9900/eventos"

servico.get('/login', async (req, res) => {
    console.log("query params", req.query)

    let user = await db.login(req.query.login, req.query.senha)

    if (user !== null)  {
        console.log("Usuário localizado:", user)
        axios.post(eventUrl, { tipo: "Login efetuado", user })
        console.log(msg)
        return res.status(200).send(user)
    }
    else {
        console.log("Nenhum usuário localizado")
        axios.post(eventUrl, { tipo: "Login" })
        console.log(msg)
        return res.status(400)
    }
})

servico.get('/user', async (req, res) => {
    console.log("query params", req.query)

    if (req.query.tipo === "paciente") {
        let paciente = await db.getAdditionalUserData("Paciente", req.query.usuario_id)
        console.log(paciente)
        axios.post(eventUrl, { tipo: "Busca paciente", paciente })
        console.log(msg)
        return res.status(200).send(paciente)
    } else if (req.query.tipo === "psicologo") {
        let psicologo = await db.getAdditionalUserData("Psicologo", req.query.usuario_id)
        console.log(psicologo)
        axios.post(eventUrl, { tipo: "Busca psicologo", psicologo })
        console.log(msg)
        return res.status(200).send(psicologo)
    } else {
        res.status(400)
    }
})

servico.listen(porta, () => {
    console.log(msg)
})