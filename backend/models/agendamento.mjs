export default class Agendamento {
    constructor(data, hora, local, paciente) {
        this.id = undefined
        this.data = data
        this.hora = hora
        this.local = local
        this.paciente = paciente,
        this.sessao = undefined
    }

    getData(){
        return this.data
    }

    getHora(){
        return this.hora
    }

    getLocal(){
        return this.local
    }

    getPaciente(){
        return this.paciente
    }
}