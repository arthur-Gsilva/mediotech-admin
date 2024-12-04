import { Disciplina } from "./Disciplina";

export type Curso = {
    idcursos: number;
    nomeCurso: 'Analise e Desenvolvimento de Sistema' | 'Logistica' | '';
    datalhescurso: string;
    disciplinas: Disciplina[]
}