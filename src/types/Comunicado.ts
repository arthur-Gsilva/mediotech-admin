import { User } from "./Estudante"

export type Comunicado = {
    idComunicado: number,
    tituloComunicado: string,
    conteudoComunicado: string,
    dataPublicacao: string,
    tipodocomunicado: 'INFORMATIVO' | 'EVENTO',
    user: User
}