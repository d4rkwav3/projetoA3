import Usuario from './usuario.mjs'

export class Psicologo extends Usuario {
    constructor (
        id,
        login,
        email,
        dataNascimento,
        nome,
        sobrenome,
        telefone,
        endereco,
        cidade,
        cep,
        crp,
        cnpj,
        titulacao, 
        especialidade
    ){
        super(id, login, email, dataNascimento, nome, sobrenome, telefone, endereco, cidade, cep)
        this.crp = crp,
        this.cnpj = cnpj
        this.titulacao = titulacao
        this.especialidade = especialidade
    }
}