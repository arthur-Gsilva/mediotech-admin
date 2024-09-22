export type Disciplina = {
    name: string,
    id: string,
    professor: string,
    cargaHoraria: number,
    turma: string,
    turno: 'manhã' | 'tarde',
    QtdAlunos: number,
    curso: 'Desenvolvimento de sistemas' | 'Logística'
}