import express from "express";
import cors from "cors";
import moment from "moment";
import { config } from "../../config.mjs";

const servico = express();
servico.use(express.json());
servico.use(cors());
const porta = config.portas.eventos;
const eventos = ["Login efetuado", "Busca agendamentos", "Novo agendamento", "Busca sessões", "Sessão realizada", "Busca paciente", "Busca psicologo", "Agendamento removido"];
const msg = `Serviços de eventos rodando na porta ${porta}`;

servico.post("/eventos", (req, res) => {
    const evento = req.body;
    const datetime = moment().format("HH:mm:ss DD-MM-YYYY");

    if (evento.tipo === eventos[0]) {
        console.log(
            "Login efetuado por",
            evento.user.nome,
            evento.user.sobrenome,
            "às",
            datetime
        );
    } else if (evento.tipo === eventos[1]) {
        console.log(
            "Nova busca pela tabela de agendamento efetuada às",
            datetime
        );
        console.table(evento.resultado);
    } else if (evento.tipo === eventos[2]) {
        console.log(
            "Novo agendamento efetuado às",
            datetime
        );
        console.table(evento.insert);
    } else if (evento.tipo === eventos[3]) {
        console.log(
            "Nova busca pela tabela de sessões efetuada às",
            datetime
        );
        console.table(evento.sessao);
    } else if (evento.tipo === eventos[4]) {
        console.log(
            "Nova sessão registrada às",
            datetime
        );
        console.table(evento.insert);
    } else if (evento.tipo === eventos[5]) {
        console.log(
            "Nova busca pela tabela de paciente efetuada às",
            datetime
        );
        console.table(evento.paciente);
    } else if (evento.tipo === eventos[6]) {
        console.log(
            "Nova busca pela tabela de psicologo efetuada às",
            datetime
        );
        console.table(evento.psicologo);
    } else if (evento.tipo === eventos[7]) {
        console.log(
            `Agendamento ${evento.id} removido às`,
            datetime
        );
    } else {
        console.log("Deu ruim!");
    }
    res.status(200).send()
});

servico.listen(porta, () => {
    console.log(msg);
});
