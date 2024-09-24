export type Comunicado = {
    id: number,
    titulo: string,
    tipo: 'Evento' | 'Informativo',
    conteudo: string
}