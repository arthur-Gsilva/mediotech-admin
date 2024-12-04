import { DisciFormValues } from "@/components/disciplinas/ActionForm";
import { req } from "../api";

const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : ''

export const getDisciplinas = async () => {

    const response = await req.get('/disciplinas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data
};


export const getDisciplinaByProfessor = async (idProfessor: number) => {
    const response = await req.get(`disciplinas/professor/${idProfessor}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = response.data;
    return data
}

export const getDisciplinaByAluno = async (idAluno: number) => {
    const response = await req.get(`user/${idAluno}`)
    const data = response.data
    return data.turma.curso.disciplinas
}


export const createDisciplina = async (values: DisciFormValues) => {
    const response = await req.post(`/disciplinas`, {
        nomeDaDisciplina: values.nome,
        detalhesAdicionais: values.detalhes,
        cargaHoraria: values.cargaHoraria,
        professor: {
            codigo: Number(values.professor)
        },
        turma: {
            idturma: Number(values.turma)
        }
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = response.data;
    return data
}

type EditDisciplina = {
    id: number,
    values: DisciFormValues
}

export const editDisciplina= async ({ id, values }: EditDisciplina) => {
    const response = await req.patch(`/disciplinas/${id}`, {
        nomeDaDisciplina: values.nome,
        detalhesAdicionais: values.detalhes,
        cargaHoraria: values.cargaHoraria,
        professor: {
            codigo: Number(values.professor)
        },
        turma: {
            idturma: Number(values.turma)
        }
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = response.data;
    return data
}


export const excludeDisciplina = async (id: number) => {
    const response = await req.delete(`/disciplinas/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = response.data;
    return data
}