import express from 'express'
import mysql from 'mysql2/promise'
import Agendamento from '../models/agendamento.mjs'
import { Database } from '../models/database.mjs'

const servico = express()
servico.use(express.json())
const porta = 9000
const db = new Database('localhost', 'projetoA3', 'projetoA3', 'projetoA3')


servico.get("/agendamentos", async (req, res) => {
    const conn = await mysql.createConnection(credentials)
    let [resultado] = await conn.query("SELECT * FROM Agendamento", [], (err, results, fields) => {})
    console.table(resultado)
    //res.send(resultado)
    //let resultado = await db.selectAll('Agendamento')
    res.send(resultado)
})

servico.post("/agendamentos", async (req, res) => {
    const conn = await mysql.createConnection(credentials)
    let [insert] = await conn.execute(
        "INSERT INTO Agendamento (nome, dia, hora, lugar) VALUES (?, ?, ?, ?)", 
        [req.body.nome, req.body.data, req.body.hora, req.body.local], 
        (err, results, fields) => {})
    console.log(insert)
    res.status(201).send(insert)
    //values = [req.body.nome, req.body.data, req.body.hora, req.body.local]
    //let insert = await db.insert('Agendamento', '(nome, dia, hora, lugar)', values)
    //res.status(201).send(insert)
})

servico.listen(porta, () => {
    console.log(`Serviços de agendamentos rodando na porta ${porta}`)
})