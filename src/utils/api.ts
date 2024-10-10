import { User } from "@/types/Estudante";
import axios from "axios";

const token = localStorage.getItem('authToken')

export const req = axios.create({
    baseURL: 'https://agendasenacapi-production.up.railway.app'
})

export const getAlunos = async () => {
    const response = await req.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data.filter((usuario: User) => usuario.tipoUser === 'ALUNO');
};

export const getColaboradores = async () => {
    const response = await req.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data.filter((usuario: User) => usuario.tipoUser === 'PROFESSOR' || usuario.tipoUser === 'CORDENADOR');
};

export const getTurmas = async () => {
    const response = await req.get('/turmas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data
};
export const getComunicados = async () => {
    const response = await req.get('/comunicados', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data
};
export const getDisciplinas = async () => {

    const response = await req.get('/disciplinas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data
};

export const getTurmasByProfessor = async (idProfessor: number) => {
    const response = await req.get(`/disciplinas/professor/${idProfessor}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = response.data;
    return data
}

export const getAvaliacoes = async (idAluno: number) => {
    const response = await req.get(`/avaliacions/todas/${idAluno}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = response.data;
    return data
}


export const getDisciplinaByProfessor = async (idProfessor: number) => {
    const response = await req.get(`disciplinas/professor/${idProfessor}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = response.data;
    return data
}