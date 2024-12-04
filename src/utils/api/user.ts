import { User } from "@/types/Estudante";
import { req } from "../api";
import { UserFormValues } from "@/components/estudantes/ActionForm";
import { ColaFormValues } from "@/components/colaboradores/ActionForm";


const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : ''

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

export const createEstudante = async (values: UserFormValues) => {
    const response = await req.post(`/register`, {
        tipoUser: 'ALUNO',
        nomeCompletoUser: values.nome,
        imailUser: values.email,
        contatopessoal: Number(values.contato),
        senhaAcessoUser: values.senha,
        dataNascimentoUser: values.dataNascimento,
        nomecontatoumergencia: 'SEM',
        numerourgencia: 'SEM',
        generoUser: values.genero,
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
export const createColaborador = async (values: ColaFormValues) => {
    const response = await req.post(`/register`, {
        tipoUser: values.tipoUser.toUpperCase(),
        nomeCompletoUser: values.nome,
        imailUser: values.email,
        contatopessoal: values.contato,
        senhaAcessoUser: values.senha,
        dataNascimentoUser: values.dataNascimento,
        nomecontatoumergencia: 'SEM',
        numerourgencia: 'SEM',
        generoUser: values.genero,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = response.data;
    return data
}

type EditUser = {
    id: number,
    values: UserFormValues
}
type EditCola = {
    id: number,
    values: ColaFormValues
}

export const editEstudante = async ({ id, values }: EditUser) => {
    const response = await req.patch(`/user/${id}`, {
        nomeCompletoUser: values.nome,
        imailUser: values.email,
        contatopessoal: Number(values.contato),
        senhaAcessoUser: values.senha,
        dataNascimentoUser: values.dataNascimento,
        generoUser: values.genero,
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
export const editColaborador = async ({ id, values }: EditCola) => {
    const response = await req.patch(`/user/${id}`, {
        nomeCompletoUser: values.nome,
        imailUser: values.email,
        contatopessoal: Number(values.contato),
        senhaAcessoUser: values.senha,
        dataNascimentoUser: values.dataNascimento,
        generoUser: values.genero,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = response.data;
    return data
}

export const excludeUser = async (id: number) => {
    const response = await req.delete(`/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = response.data;
    return data
}