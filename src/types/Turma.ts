import { Curso } from "./Curso";
import { User } from "./Estudante";

export type Turma = {
    idturma: number,
    curso: Curso,
    usersistema: null,
    periodo: string,
    anno: string,
    turno: 'MANHÃ' | 'TARDE' | 'Noite',
    nomeTurma: string,
    detalhesTurma: string,
    representante: User | null;
}