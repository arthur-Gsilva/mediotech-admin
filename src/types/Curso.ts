import { Disciplina } from "./Disciplina";

export type Curso = {
    idcursos: number;
    nomecurso: 'Desenvolvimento de sistemas' | 'Logistica' | '';
    datalhescurso: string;
    disciplinas: Disciplina[];
}