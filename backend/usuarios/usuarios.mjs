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
/*
servico.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
  });
*/
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
        return res.status(200).send(false)
    }
})

servico.listen(porta, () => {
    console.log(msg)
})