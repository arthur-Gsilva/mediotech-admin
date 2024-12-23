import { TurmaFormValues } from "@/components/turmas/ActionForm";
import { req } from "../api";
import { Turma } from "@/types/Turma";

const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : ''

export const getTurmas = async () => {
    const response = await req.get('/turmas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data
};

export const getTurmasByProfessor = async (idProfessor: number) => {
    const response = await req.get(`/turmas`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data: Turma[] = response.data;

    const turmaProf = data.filter((item) => 
        item.curso && 
        Array.isArray(item.curso.disciplinas) && 
        item.curso.disciplinas.some((disciplina) => disciplina.professorId === idProfessor)
    );

    return turmaProf;
}

export const createTurma = async (values: TurmaFormValues) => {
    const response = await req.post(`/turmas`, {
        curso: { idCurso: values.curso === 'Logistica' ? 2 : 1 },
        periodo: values.periodo,
        anno: values.ano,
        turno: values.turno.toUpperCase(),
        nomeTurma: values.nome,
        datalhesTurma: values.detalhes,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = response.data;
    return data
}

type EditTurma = {
    id: number,
    values: TurmaFormValues
}

export const editTurma = async ({ id, values }: EditTurma) => {
    const response = await req.put(`/turma/${id}`, {
        curso: { idCurso: values.curso === 'Logistica' ? 2 : 1 },
        periodo: values.periodo,
        anno: values.ano,
        turno: values.turno.toUpperCase(),
        nomeTurma: values.nome,
        datalhesTurma: values.detalhes,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = response.data;
    return data
}

export const excludeTurma = async (id: number) => {
    const response = await req.delete(`/turma/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = response.data;
    return data
}