import mysql from 'mysql2/promise'

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
}