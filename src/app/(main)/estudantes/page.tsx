'use client'

import { Actions } from "@/components/estudantes/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User } from "@/types/Estudante"
import { getAlunos } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";

const Page = () => {

    const router = useRouter();
    // const [alunos, setAlunos] = useState<User[]>([])

    useEffect(() => {
    const token = localStorage.getItem('authToken');

        if (!token) {
            router.push('/login');
        }
  }, [router]);

  const token = localStorage.getItem('authToken');

      const { data: alunos, error, isLoading } = useQuery<User[]>({
        queryKey: [],
        queryFn: getAlunos,
        enabled: !!token
      })

    const [value, setValue] = useState('')

    const deleteAlunos = async (id: number) => {
        const response = await fetch(`https://agendasenacapi-production.up.railway.app/user/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json'
            }
          });
    }


    return(
        <main className="px-5 w-full pb-5 h-[80vh] overflow-y-scroll">
            <Card className="">
                <CardHeader>
                    <CardTitle>Lista de Alunos</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent >
                    <Actions value={value} setValue={setValue}/>

                    <div className="my-2 font-semibold text-xl">Total de Alunos: {alunos?.length}</div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Matrícula</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Curso</TableHead>
                            <TableHead>Turma</TableHead>
                            <TableHead>Turno</TableHead>
                            <TableHead>Responsável</TableHead>
                            <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody >
                            {alunos?.map((estudante) => (
                            <TableRow key={estudante.codigo}>
                                <TableCell className="font-medium">{estudante.codigo}</TableCell>
                                <TableCell>{estudante.nomeCompletoUser}</TableCell>
                                <TableCell>{estudante.turma?.curso?.nomecurso || "Sem curso"}</TableCell>
                                <TableCell>{estudante.turma?.nomeTurma}</TableCell>
                                <TableCell>{estudante.turma?.turno}</TableCell>
                                <TableCell>{estudante.numerourgencia}</TableCell>
                                <TableCell className="flex text-white gap-2">
                                    <div className="bg-yellow-300 p-2 rounded-md cursor-pointer"><FaEdit /></div>
                                    <div 
                                        className="bg-red-600 p-2 rounded-md cursor-pointer"
                                        onClick={() => deleteAlunos(estudante.codigo)}
                                    >
                                            <IoTrash />
                                    </div>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    )
}

export default Page
