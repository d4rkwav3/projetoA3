import mysql from 'mysql2/promise'

export class Database {

    constructor(host, user, passwd, database){
        this.credentials = {
            host: host,
            user: user,
            password: passwd,
            database: database
        }
    }

    async selectAll(table){
        let statement = 'SELECT * FROM ' + table
        let conexao = await mysql.createConnection(this.credentials)
        let [resultado] = await conexao.execute(statement, [], (err, results) => {})
        console.table(resultado)
        return resultado
    }

    async insert(table, columns, values){
        let statement = 'INSERT INTO ' + table + ' ' + columns + ' VALUES (?, ?, ?, ?)'
        let conexao = await mysql.createConnection(this.credentials)
        let [resultado] = await conexao.execute(statement, values, (err, results) => {})
        //console.table(resultado)
        return resultado
    }
}