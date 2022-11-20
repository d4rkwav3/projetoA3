export class Agendamento {
    constructor(id, data, sala, paciente, sessao, psico) {
        this.id = id
        this.data_hora = data
        this.sala = sala
        this.paciente_id = paciente,
        this.sessao_id = sessao,
        this.psicologo_crp = psico
    }
}