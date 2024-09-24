'use client'

import { Actions } from "@/components/estudantes/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Estudantes } from "@/data/Estudantes"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {

    const router = useRouter();

    useEffect(() => {
    const token = localStorage.getItem('authToken');

        if (!token) {
            router.push('/login');
        }
  }, [router]);

    const [value, setValue] = useState('')


    return(
        <main className="px-5 w-full pb-5 h-[80vh] overflow-y-scroll">
            <Card className="">
                <CardHeader>
                    <CardTitle>Lista de Alunos</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent >
                    <Actions value={value} setValue={setValue}/>

                    <div className="my-2 font-semibold text-xl">Total de Alunos: {Estudantes.length}</div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Matrícula</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Curso</TableHead>
                            <TableHead>Turma</TableHead>
                            <TableHead>Turno</TableHead>
                            <TableHead>Responsável</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody >
                            {Estudantes.map((estudante) => (
                            <TableRow key={estudante.matricula}>
                                <TableCell className="font-medium">{estudante.matricula}</TableCell>
                                <TableCell>{estudante.nome}</TableCell>
                                <TableCell>{estudante.curso}</TableCell>
                                <TableCell>{estudante.turma}</TableCell>
                                <TableCell>{estudante.turno}</TableCell>
                                <TableCell>{estudante.responsavel}</TableCell>
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
