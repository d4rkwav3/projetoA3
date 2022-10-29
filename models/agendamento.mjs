export default class Agendamento {
    constructor(id, data, hora, local, paciente, sessao=undefined) {
        this.id = id
        this.data = data
        this.hora = hora
        this.local = local
        this.paciente = paciente,
        this.sessao = sessao
    }
}