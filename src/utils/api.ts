import { ColaFormValues } from "@/components/colaboradores/ActionForm";
import { ComunicadoFormValues } from "@/components/comunicados/ActionForm";
import { DisciFormValues } from "@/components/disciplinas/ActionForm";
import { UserFormValues } from "@/components/estudantes/ActionForm";
import { TurmaFormValues } from "@/components/turmas/ActionForm";
import { User } from "@/types/Estudante";
import axios from "axios";

const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : ''

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


// POST

export const createTurma = async (values: TurmaFormValues) => {
    const response = await req.post(`/turmas`, {
        curso: { idcursos: values.curso === 'Logistica' ? 1 : 2 },
        periodo: values.periodo,
        anno: Number(values.ano),
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
export const createComunicado = async (values: ComunicadoFormValues) => {
    const response = await req.post(`/comunicados`, {
        tituloComunicado: values.titulo,
        tipodocomunicado: values.tipo,
        conteudoComunicado: values.conteudo,
        usersistema: {
        codigo: "1"
        }
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = response.data;
    return data
}


// PUT

type EditTurma = {
    id: number,
    values: TurmaFormValues
}
type EditDisciplina = {
    id: number,
    values: DisciFormValues
}
type EditUser = {
    id: number,
    values: UserFormValues
}
type EditCola = {
    id: number,
    values: ColaFormValues
}
type EditComunicado = {
    id: number,
    values: ComunicadoFormValues
}
export const editTurma = async ({ id, values }: EditTurma) => {
    const response = await req.put(`/turma/${id}`, {
        curso: { idcursos: values.curso === 'Logistica' ? 1 : 2 },
        periodo: values.periodo,
        anno: Number(values.ano),
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
export const editComunicado = async ({ id, values }: EditComunicado) => {
    const response = await req.patch(`/comunicados/${id}`, {
        tituloComunicado: values.titulo,
        ConteudoComunicado: values.conteudo,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = response.data;
    return data
}


// DELETE

export const excludeTurma = async (id: number) => {
    const response = await req.delete(`/turma/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
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
export const excludeUser = async (id: number) => {
    const response = await req.delete(`/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = response.data;
    return data
}
export const excludeComunicado = async (id: number) => {
    const response = await req.delete(`/comunicados/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = response.data;
    return data
}