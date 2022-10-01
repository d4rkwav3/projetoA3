class Agendamento {
    nome
    data
    hora
    local

    constructor(nome, data, hora, local) {
        this.nome = nome
        this.data = data
        this.hora = hora
        this.local = local
    }
}

module.exports = {
    Agendamento: Agendamento
}