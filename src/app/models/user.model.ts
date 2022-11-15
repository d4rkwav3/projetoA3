export interface User {
    login: string;
    senha: string;
    id?: number | undefined;
    email?: string | undefined;
    dataNascimento?: string | undefined;
    nome?: string | undefined;
    sobrenome?: string | undefined;
    telefone?: string | undefined;
    endereço?: string | undefined;
    cidade?: string | undefined;
    cep?: string | undefined;
    tipo?: string | undefined;
}