import { Turma } from "./Turma";

export type User = {
    codigo: number;
    cpfUser: string | null;
    imailUser: string;
    tipoUser: "ALUNO" | 'PROFESSOR' | 'ADMIN' | 'CORDENADOR'; 
    contatopessoal: string;
    nomecontatoumergencia: string;
    numerourgencia: string;
    turma: Turma;
    nomeCompletoUser: string,
    dataNascimentoUser: string,
    generoUser: 'Masculino' | 'Feminino'
}