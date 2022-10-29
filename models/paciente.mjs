import Usuario from './usuario.mjs'

export class Paciente extends Usuario {
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
        cpf,
        valorConsulta,
        responsavel
    ){
        super(id, login, email, dataNascimento, nome, sobrenome, telefone, endereco, cidade, cep)
        this.cpf = cpf,
        this.valorConsulta = valorConsulta,
        this.responsavel = responsavel
    }
}