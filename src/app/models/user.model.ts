import { Paciente } from "./paciente.model";
import { Psicologo } from "./psicologo.model";

export interface User {
    login: string;
    senha: string;
    id: number;
    email: string;
    dataNascimento: string;
    nome: string;
    sobrenome: string;
    telefone: string;
    endereço: string;
    cidade: string
    cep: string;
    tipo: string;
    data?: Paciente | Psicologo;
}