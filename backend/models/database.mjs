import mysql from 'mysql2/promise'
import { Usuario } from '../models/usuario.mjs'
import { Paciente } from '../models/paciente.mjs'

export default class Database {

    constructor(host, user, passwd, database){
        this.credentials = {
            host: host,
            user: user,
            password: passwd,
            database: database
        }
    }

    async selectAll(table){
        console.log('Buscandos toda a tabela ' + table)
        let statement = 'SELECT * FROM ' + table
        let conexao = await mysql.createConnection(this.credentials)
        let [resultado] = await conexao.execute(statement, [], (err, results) => {})
        console.table(resultado)
        console.log('Fim dos resultados')
        conexao.end()
        return resultado
    }

    async insert(table, columns, values){
        console.log("Inserindo os valores " + columns + "\n=> " + values + "\nna tabela " + table)
        let nValues
        for (let i = 1; i <= values.length; i++) {
            if (i === 1) {
                nValues = '?'
            }
            else if (i > 0 && i <= values.length) {
                nValues += ', ?'
            }
        }
        let statement = 'INSERT INTO ' + table + ' ' + columns + ' VALUES (' + nValues + ')'
        let conexao = await mysql.createConnection(this.credentials)
        let [resultado] = await conexao.execute(statement, values, (err, results) => {})
        conexao.end()
        return resultado
    }

    async login(user, passwd) {
        let statement = "SELECT * FROM Usuario WHERE login = ? and senha = ?"
        let conexao = await mysql.createConnection(this.credentials)
        let [resultado] = await conexao.execute(statement, [user, passwd], (err, results) => {})
        conexao.end()

        if (resultado.length === 1) {
            let user = new Usuario(
                resultado[0].login,
                resultado[0].senha, 
                resultado[0].id, 
                resultado[0].tipo,
                resultado[0].email,
                resultado[0].dataNascimento,
                resultado[0].nome,
                resultado[0].sobrenome,
                resultado[0].telefone,
                resultado[0].endereco,
                resultado[0].cidade,
                resultado[0].cep)
            return user
        } else {
            return null
        }
    }

    async getAdditionalUserData(table, user_id) {
        let statement = "SELECT * FROM " + table + " WHERE usuario_id = ?"
        let conexao = await mysql.createConnection(this.credentials)
        let [resultado] = await conexao.execute(statement, [user_id], (err, results) => {})
        conexao.end()

        if (resultado.length === 1) {
            let paciente = new Paciente(
                resultado[0].cpf,
                resultado[0].usuario_id,
                resultado[0].psicologo_crp,
                resultado[0].valorConsulta,
                resultado[0].responsavel
            )
            return paciente
        } else {
            return null
        }
    }

    async getNextAppointments(paciente_id, date_now) {
        let statement = "SELECT * FROM Agendamento WHERE paciente_id = ? AND data_hora > ? ORDER BY data_hora ASC LIMIT 6"
        let conexao = await mysql.createConnection(this.credentials)
        let [resultado] = await conexao.execute(statement, [paciente_id, date_now], (err, results) => {})
        conexao.end()
        return resultado
    }
}