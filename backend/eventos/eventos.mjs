import express from "express";
import cors from "cors";
import axios from "axios";
import moment from "moment";
import { config } from "../../config.mjs";

const servico = express();
servico.use(express.json());
servico.use(cors());
const porta = config.portas.eventos;
const eventos = ["Login efetuado", "Busca agendamentos", "Novo agendamento", "Busca sessões", "Sessão realizada"];
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
            "Nova busca pela tabela de agendamento efetuada às",
            datetime
        );
        console.table(evento.resultado);
    } else if (evento.tipo === eventos[4]) {
        console.log(
            "Nova sessão registrada às",
            datetime
        );
        console.table(evento.insert);
    } else {
        console.log("Deu ruim!");
    }
});

servico.listen(porta, () => {
    console.log(msg);
});
