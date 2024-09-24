export type Turma = {
    id: string,
    estudantes: number,
    ano: string,
    periodo: number,
    turno: 'Manhã' | 'Tarde',
    curso: 'Desenvolvimento de sistemas' | 'Logística'
    representante?: string
}