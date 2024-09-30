'use client'

import { Actions } from "@/components/turmas/Actions"
import { TurmaBox } from "@/components/turmas/TurmaBox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/services/api"
import { Turma } from "@/types/Turma"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {

    const router = useRouter();
    const [turmas, setTurmas] = useState<Turma[]>([])
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchTurmas = async () => {
          try {
            const response = await axios.get('https://agendasenacapi-production.up.railway.app/turmas', {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            });
    
            setTurmas(response.data);
          } catch (err: any) {
            console.log(err)
          }
        };

        fetchTurmas();
    }, [token]);

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
  }, [router]);

    const [value, setValue] = useState('')

    // const filteredTurmas = value !== '' 
    // ? Turmas.filter((item) => item.ano === value) 
    // : Turmas;

    return(
        <main className="px-5 w-full">
            <Card className="">
                <CardHeader>
                    <CardTitle>Lista de Turmas</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent>
                    <Actions value={value} setValue={setValue}/>

                    <div className="mt-2">Total de turmas: {turmas.length}</div>

                    <div className="grid grid-cols-1 mt-5 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {turmas.map((turma) => (
                        <TurmaBox key={turma.idturma} data={turma}  />
                    ))}
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

export default Page
