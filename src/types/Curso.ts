import { Disciplina } from "./Disciplina";

export type Curso = {
    idcursos: number;
    nomecurso: 'ADS' | 'Logistica' | '';
    datalhescurso: string;
    disciplinas: Disciplina[];
}