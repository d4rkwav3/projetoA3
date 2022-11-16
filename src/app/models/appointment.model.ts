export interface Appointment {
    id: number;
    data_hora: string;
    sala: string;
    paciente_id: string;
    sessao_id: number | null;
}