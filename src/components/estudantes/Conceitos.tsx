import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { getDisciplinaByProfessor } from "@/utils/api/disciplina"
import { getAvaliacoes } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

import { Avaliacao } from "@/types/Avaliacao"
import { User } from "@/types/Estudante"
import { useEffect, useState } from "react"
import { Disciplina } from "@/types/Disciplina"
import { formatteConceito } from "@/utils/formatters"

type Props = {
    data: User | null
}

export const Conceitos = ({ data }: Props) => {

    const disciplinasAluno = data?.turma.curso.disciplinas

    const [token, setToken] = useState<string | null>(null)
    const [userTipo, setUserTipo] = useState<string | null>('')
    const [userId, setUserId] = useState<string | null>('') 

    useEffect(() => {
        if(typeof window !== "undefined"){
            setToken(window.localStorage.getItem('authToken'))
            setUserTipo(window.localStorage.getItem('tipoUser'))
            setUserId(window.localStorage.getItem('idUser'))
        }
    }, [])

    const { data: disciplinasProfessor } = useQuery<Disciplina[]>({
        queryKey: ['disciplinas', token],
        queryFn:  () => getDisciplinaByProfessor(parseInt(userId as string)),
        enabled: !!token
    })

    const disciplinas = userTipo !== 'PROFESSOR' ? disciplinasAluno : disciplinasAluno?.filter((disciplinaAluno) =>
        disciplinasProfessor?.some(
            (disciplinaProfessor) =>
                disciplinaAluno.idDisciplina === disciplinaProfessor.idDisciplina
        )
    );
    
    useEffect(() => {
        console.log(disciplinas)
    }, [])

    const { data: avaliacoes } = useQuery<Avaliacao[]>({
        queryKey: ['avaliacoes', token],
        queryFn: () => getAvaliacoes(data?.codigo as number),
        enabled: !!token
    })

    const getAvaliationUnit = (disciplinaNome: string, unidade: string) => {
        const conceitoDisciplina = avaliacoes?.filter((item) => item.disciplina.nomeDaDisciplina === disciplinaNome)
        const conceitoUnidade = conceitoDisciplina?.filter((item) => item.unidade === unidade)
        console.log(conceitoUnidade)
        if(conceitoUnidade && conceitoUnidade[0] && conceitoUnidade[0].conceito){
            return conceitoUnidade[0].conceito.notaConceito
        } else{
            return "--"
        }
        
    }

    return(
        <div className="mt-4">
            <Table>
                <TableHeader>
                    <TableRow className="bg-primary [&>*]:text-white hover:bg-primary">
                        <TableHead>Disciplina</TableHead>
                        <TableHead>Conceito 1</TableHead>
                        <TableHead>Conceito 2</TableHead>
                        <TableHead>Média Final</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {disciplinas?.map((item) => {
                        const nota1 = getAvaliationUnit(item.nomeDaDisciplina, "1");
                        const nota2 = getAvaliationUnit(item.nomeDaDisciplina, "2");
                        let media: string | number = '--'
                        if(nota1 !== '--' && nota2 !== '--'){
                            media = (nota1 + nota2) / 2
                        }

                        return (
                            <TableRow key={item.idDisciplina}>
                                <TableCell className="font-bold">{item.nomeDaDisciplina}</TableCell>
                                <TableCell className="font-bold">{formatteConceito(nota1 as number)}</TableCell>
                                <TableCell className="font-bold">{formatteConceito(nota2 as number)}</TableCell>
                                <TableCell className="font-bold">{formatteConceito(media as number)}</TableCell>
                            </TableRow>
                        );
                        
                    })}
                </TableBody>
            </Table>
        </div>
    )
}