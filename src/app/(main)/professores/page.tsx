'use client'

import { Actions } from "@/components/colaboradores/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Colaboladores } from "@/data/Colaboradores"
import { useState } from "react"

const Page = () => {

    const [value, setValue] = useState('')


    return(
        <main className="px-5 w-full pb-5 h-[80vh] overflow-y-scroll">
            <Card className="">
                <CardHeader>
                    <CardTitle>Lista de Colaboradores</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent >
                    <Actions value={value} setValue={setValue}/>

                    <div className="my-2 font-semibold text-xl">Total de Colaboradores: {Colaboladores.length}</div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Turno</TableHead>
                            <TableHead>telefone</TableHead>
                            <TableHead>email</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody >
                            {Colaboladores.map((colaborador) => (
                            <TableRow key={colaborador.id}>
                                <TableCell className="font-medium">{colaborador.id}</TableCell>
                                <TableCell>{colaborador.nome}</TableCell>
                                <TableCell>{colaborador.cargo}</TableCell>
                                <TableCell>{colaborador.turno}</TableCell>
                                <TableCell>{colaborador.telefone}</TableCell>
                                <TableCell>{colaborador.email}</TableCell>
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