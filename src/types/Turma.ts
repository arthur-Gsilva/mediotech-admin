import { Curso } from "./Curso";
import { Disciplina } from "./Disciplina";
import { User } from "./Estudante";

export type Turma = {
    idturma: number,
    curso: Curso,
    disciplinas: Disciplina,
    usersistema: null,
    periodo: string,
    anno: string,
    turno: 'MANHÃ' | 'TARDE' | 'Noite',
    nomeTurma: string,
    detalhesTurma: string,
    representante: User | null;
}