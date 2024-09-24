export type Estudante = {
    matricula: number,
    nome: string,
    cpf: string,
    turma: string,
    turno: 'Manhã' | 'Tarde',
    responsavel: string,
    curso: 'Desenvolvimento de sistemas' | 'Logística'
}