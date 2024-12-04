'use client'

import { DisciBox } from "@/components/disciplinas/DisciBox"
import { Actions } from "@/components/disciplinas/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Disciplina } from "@/types/Disciplina"
import { getDisciplinaByProfessor, getDisciplinas } from "@/utils/api/disciplina"
import { BoxSkeleton } from "@/components/Skeletons/BoxSkeleton"

const Page = () => {

    const [filtro, setFiltro] = useState('')
    const [userTipo, setUserTipo] = useState<string | null>('')
    const [userId, setUserId] = useState<string | null>('') 


    const router = useRouter();
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authToken = window.localStorage.getItem('authToken');
            const tipoUser = window.localStorage.getItem('tipoUser')
            const idUser = window.localStorage.getItem('idUser')
            setUserTipo(tipoUser)
            setToken(authToken);
            setUserId(idUser)
        }
    }, []); 

    useEffect(() => {
        if (token === null) return;

        if (!token) {
            router.push('/login');
        }
    }, [token, router]);

    const { data: disciplinas, isLoading } = useQuery<Disciplina[]>({
        queryKey: ['disciplinas', token],
        queryFn: userTipo === 'PROFESSOR' ? () => getDisciplinaByProfessor(parseInt(userId as string)) : getDisciplinas,
        enabled: !!token
    })

    const disciplinasFiltradas = disciplinas?.filter((disciplina) => {
        const data = (disciplina.nomeDaDisciplina || "").toLowerCase().includes(filtro.toLowerCase())
        return data
    })

    return(
        <main className="px-5 w-full">
            <Card className="">
                <CardHeader>
                    <CardTitle>Lista de Disciplinas</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent>
                    <Actions onFiltroChange={setFiltro}/>

                    <div className="mt-2">Total de Disciplinas: {disciplinasFiltradas?.length}</div>

                    <div className="grid grid-cols-1 mt-5 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {isLoading &&
                            <BoxSkeleton />
                        }

                        {!isLoading &&
                            <>
                                {disciplinasFiltradas?.map((item, index) => (
                                <DisciBox key={index} data={item} />
                                ))
                                }
                            </>
                        }
                        
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

export default Page
