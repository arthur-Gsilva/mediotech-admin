import { Turma } from '@/types/Turma';
import axios from 'axios';


export const fetchTurmas = async (token: string): Promise<Turma[]> => {
  try {
    const response = await axios.get('https://agendasenacapi-production.up.railway.app/turmas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    console.error('Erro ao buscar turmas', err);
    throw err; 
  }
};
