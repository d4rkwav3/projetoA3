export default class Agendamento {
    _nome
    _data
    _hora
    _local

    constructor(nome, data, hora, local) {
        this._nome = nome
        this._data = data
        this._hora = hora
        this._local = local
    }
}