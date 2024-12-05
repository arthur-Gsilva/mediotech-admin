import axios from "axios";

const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : ''

export const req = axios.create({
    baseURL: 'https://agendasenacapi-production.up.railway.app',
    headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
    }
})

export const getDisciplinas = async () => {

    const response = await req.get('/disciplinas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data
};

export const getAvaliacoes = async (idAluno: number) => {
    const response = await req.get(`/avaliacions/todas/${idAluno}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const data = response.data;
    return data.data
}