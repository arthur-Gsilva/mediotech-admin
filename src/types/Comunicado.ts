import { User } from "./Estudante"

export type Comunicado = {
    idComunicado: number,
    tituloComunicado: string,
    conteudoComunicado: string,
    dataPulicacao: string,
    tipodocomunicado: 'INFORMATIVO' | 'EVENTO',
    usersistema: User
}