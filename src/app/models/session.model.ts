import { Appointment } from "./appointment.model";

export interface Session {
    id: number;
    observacoes: string;
    notas: string;
    agendamento: Appointment;
}