'use client'

import { BoxSkeleton } from "@/components/Skeletons/BoxSkeleton"
import { Actions } from "@/components/turmas/Actions"
import { TurmaBox } from "@/components/turmas/TurmaBox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Turma } from "@/types/Turma"
import { getTurmas, getTurmasByProfessor } from "@/utils/api/turma"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {

    const [filtro, setFiltro] = useState<string>("")
    const [periodo, setPeriodo] = useState('');
    const [ano, setAno] = useState(''); 
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

    const { data: turmas, isLoading } = useQuery<Turma[]>({
        queryKey: ['turmas', token],
        queryFn:  userTipo === 'PROFESSOR' ? () =>  getTurmasByProfessor(Number(userId as string)) : getTurmas,
        enabled: !!token
    })


    const turmasFiltradas = turmas?.filter((turma) => {
        const nomeMatch = (turma.nomeTurma || "").toLowerCase().includes(filtro.toLowerCase())
        const periodoMatch = periodo === 'all' || !periodo || turma.periodo?.toString() === periodo;
        const anoMatch = ano === 'all' || !ano || turma.anno === ano;
    
        return nomeMatch && periodoMatch && anoMatch;
    });

    return(
        <main className="px-5 w-full">
            <Card className="">
                <CardHeader>
                    <CardTitle>Lista de Turmas</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent>
                    <Actions onAnoChange={setAno} onPeriodoChange={setPeriodo} onFiltroChange={setFiltro}/>

                    <div className="mt-2">Total de turmas: {turmasFiltradas?.length}</div>

                    <div className="grid grid-cols-1 mt-5 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {isLoading &&
                            <BoxSkeleton />
                        }

                        {!isLoading &&
                        <>
                            {turmasFiltradas?.map((turma) => (
                                <TurmaBox key={turma.idturma} data={turma}  />
                            ))}
                        </>
                            
                        }
                        
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

export default Page
