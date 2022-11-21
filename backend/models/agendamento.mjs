export class Agendamento {
    constructor(id, nome, sobrenome, data, sala, paciente, sessao, psico) {
        this.id = id
        this.nome = nome,
        this.sobrenome = sobrenome,
        this.data_hora = data
        this.sala = sala
        this.paciente_id = paciente,
        this.sessao_id = sessao,
        this.psicologo_crp = psico
    }
}