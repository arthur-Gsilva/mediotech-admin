import { User } from "@/types/Estudante";
import axios from "axios";

const token = localStorage.getItem('authToken')

const req = axios.create({
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
    return data.filter((usuario: User) => usuario.tipoUser === 'PROFESSOR' || usuario.tipoUser === 'COORDENADOR');
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