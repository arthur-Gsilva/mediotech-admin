import { Curso } from "./Curso";
import { User } from "./Estudante";

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
    periodo: any,
    anno: string,
    turno: 'MANHÃ' | 'TARDE' | 'Noite',
    nomeTurma: string,
    detalhesTurma: string,
    representante: User | null;
}