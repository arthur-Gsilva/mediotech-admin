import { ComunicadoFormValues } from "@/components/comunicados/ActionForm";
import { req } from "../api";

const idUser = typeof window !== 'undefined' ? localStorage.getItem('idUser') : ''
const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : ''

export const getComunicados = async () => {
    const response = await req.get('/comunicados', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data
};

export const createComunicado = async (values: ComunicadoFormValues) => {
    const response = await req.post(`/comunicados`, {
        tituloComunicado: values.titulo,
        tipodocomunicado: values.tipo,
        conteudoComunicado: values.conteudo,
        usersistema: {
        codigo: idUser
        }
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = response.data;
    return data
}

type EditComunicado = {
    id: number,
    values: ComunicadoFormValues
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

export const excludeComunicado = async (id: number) => {
    const response = await req.delete(`/comunicados/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = response.data;
    return data
}