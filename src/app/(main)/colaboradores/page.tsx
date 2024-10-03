'use client'

import { Actions } from "@/components/colaboradores/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User } from "@/types/Estudante"
import { getColaboradores } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { IoTrash } from "react-icons/io5"

const Page = () => {

    const token = localStorage.getItem('authToken')
    const router = useRouter();
    const [value, setValue] = useState('')
    
        useEffect(() => {
        const token = localStorage.getItem('authToken');

            if (!token) {
                router.push('/login');
            }
    }, [router]);

    const { data: colaboradores, error, isLoading } = useQuery<User[]>({
        queryKey: [],
        queryFn: getColaboradores,
        enabled: !!token
    })

    const deleteColaborador = async (id: number) => {
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
                    <CardTitle>Lista de Colaboradores</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent >
                    <Actions value={value} setValue={setValue}/>

                    <div className="my-2 font-semibold text-xl">Total de Colaboradores: {colaboradores?.length}</div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Turno</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Aões</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody >
                            {colaboradores?.map((colaborador) => (
                            <TableRow key={colaborador.codigo}>
                                <TableCell className="font-medium">{colaborador.codigo}</TableCell>
                                <TableCell>{colaborador.nomeCompletoUser}</TableCell>
                                <TableCell>{colaborador.tipoUser}</TableCell>
                                <TableCell>{colaborador.turma?.turno || "Sem turno"}</TableCell>
                                <TableCell>{colaborador.contatopessoal}</TableCell>
                                <TableCell>{colaborador.imailUser}</TableCell>
                                <TableCell className="flex text-white gap-2">
                                    <div className="bg-yellow-300 p-2 rounded-md cursor-pointer"><FaEdit /></div>
                                    <div 
                                        className="bg-red-600 p-2 rounded-md cursor-pointer"
                                        onClick={() => deleteColaborador(colaborador.codigo)}
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