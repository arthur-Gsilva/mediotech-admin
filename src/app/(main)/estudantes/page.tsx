'use client'

import { Actions } from "@/components/turmas/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Estudantes } from "@/data/Estudantes"
import { useState } from "react"

const Page = () => {

    const [value, setValue] = useState('')


    return(
        <main className="px-5 w-full">
            <Card className="">
                <CardHeader>
                    <CardTitle>Lista de Alunos</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent>
                    <Actions value={value} setValue={setValue}/>

                    <div className="mt-2">Total de Alunos: {Estudantes.length}</div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Matrícula</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Turma</TableHead>
                            <TableHead>Turno</TableHead>
                            <TableHead>Responsável</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {Estudantes.map((estudante) => (
                            <TableRow key={estudante.matricula}>
                                <TableCell className="font-medium">{estudante.matricula}</TableCell>
                                <TableCell>{estudante.nome}</TableCell>
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
