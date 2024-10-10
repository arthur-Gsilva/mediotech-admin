import { Disciplina } from "./Disciplina";

export type Avaliacao = {
    idavalicacion: number;
    unidade: string;
    dataavalicion: string;
    conceito: {
        idConceito: number;
        nomeDoConceito: string;
        notaConceito: number;
    };
    disciplina: Disciplina,
    ordemlancameneto: string
  };