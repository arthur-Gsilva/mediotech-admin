import { Disciplina } from "./Disciplina";

export type Curso = {
    idcursos: number;
    nomecurso: string;
    datalhescurso: string;
    disciplinas: Disciplina[];
}