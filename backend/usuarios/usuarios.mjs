import express from 'express'
import Database from '../models/database.mjs'
import { config } from '../../config.mjs'

const servico = express()
servico.use(express.json())
const porta = config.portas.usuarios
const db = new Database(
    config.database.host, 
    config.database.user, 
    config.database.password, 
    config.database.database)
const msg = `Serviços de usuários rodando na porta ${porta}`

servico.get('/login', async (req, res) => {
    let user = await db.login(req.body.login, req.body.senha)

    if (user !== null)  {
        console.log("login efetuado com sucesso")
        console.log(msg)
        return res.status(200).send(user)
    }
    else {
        console.log("Erro! Verifique os dados e tente novamente")
        console.log(msg)
        return res.status(200).send("Erro! Verifique os dados e tente novamente")
    }
})

servico.listen(porta, () => {
    console.log(msg)
})