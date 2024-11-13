import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { getAvaliacoes } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

import { Avaliacao } from "@/types/Avaliacao"
import { User } from "@/types/Estudante"
import { useEffect, useState } from "react"

type Props = {
    data: User | null
}

export const Conceitos = ({ data }: Props) => {

    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if(typeof window !== "undefined"){
            setToken(window.localStorage.getItem('authToken'))
        }
    }, [])

    const { data: avaliacoes } = useQuery<Avaliacao[]>({
        queryKey: ['avaliacoes', token],
        queryFn: () => getAvaliacoes(data?.codigo as number),
        enabled: !!token
    })

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
                    {avaliacoes?.map((avaliacao, index) => {
                    const conceito1 = avaliacao.conceito.notaConceito; 
                    const conceito2 = Number(avaliacao.ordemlancameneto);
                    
                    
                    const mediaFinal = ((conceito1 + conceito2) / 2).toFixed(2); // Média com duas casas decimais

                    return (
                        <TableRow key={index}>
                            <TableCell>{avaliacao.disciplina.nomeDaDisciplina}</TableCell>
                            <TableCell>{conceito1}</TableCell>
                            <TableCell>{conceito2}</TableCell>
                            <TableCell>{mediaFinal}</TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </div>
    )
}