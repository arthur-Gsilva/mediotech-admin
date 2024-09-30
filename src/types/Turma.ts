import { Curso } from "./Curso";
import { Estudante } from "./Estudante";

export type Turma = {
    // id: string,
    // estudantes: number,
    // ano: string,
    // periodo: number,
    // turno: 'Manhã' | 'Tarde',
    // curso: 'Desenvolvimento de sistemas' | 'Logística'
    // representante?: string
    idturma: number,
    curso: Curso,
    disciplinas: any,
    usersistema: null,
    periodo: null,
    anno: string,
    turno: string,
    nomeTurma: string,
    detalhesTurma: string,
    representante: Estudante | null;
}