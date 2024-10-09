'use client'

import { Actions } from "@/components/turmas/Actions"
import { TurmaBox } from "@/components/turmas/TurmaBox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Turma } from "@/types/Turma"
import { getTurmas } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {

    const router = useRouter();
    const token = localStorage.getItem('authToken');
    const [filtro, setFiltro] = useState<string>("")
    const [periodo, setPeriodo] = useState('');
    const [ano, setAno] = useState(''); 

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
  }, [router]);

    const { data: turmas, error, isLoading } = useQuery<Turma[]>({
        queryKey: ['turmas', token],
        queryFn: getTurmas,
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
                    {turmasFiltradas?.map((turma) => (
                        <TurmaBox key={turma.idturma} data={turma}  />
                    ))}
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

export default Page
