export type Turma = {
    id: string,
    estudantes: number,
    ano: string,
    periodo: number,
    turno: string,
    curso: 'Desenvolvimento de sistemas' | 'Logística'
    representante?: string
}