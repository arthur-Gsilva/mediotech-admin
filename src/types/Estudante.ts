import { Turma } from "./Turma";

export type Estudante = {
    codigo: number;
    cpfUser: string | null;
    imailUser: string;
    tipoUser: "ALUNO" | string; 
    contatopessoal: string;
    nomecontatoumergencia: string;
    numerourgencia: string;
    turma: Turma;
}