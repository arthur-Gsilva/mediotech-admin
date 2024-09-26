"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Actions } from "@/components/estudantes/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Comunicados } from "@/data/Comunicados";
import { ComuniModal } from "@/components/modals/ComuniModal";
import { Comunicado } from "@/types/Comunicado";


const Page = () => {

    const router = useRouter();

    useEffect(() => {
    const token = localStorage.getItem('authToken');

        if (!token) {
            router.push('/login');
        }
  }, [router]);

    const [value, setValue] = useState('')
    const [selectedComunicado, setSelectedComunicado] = useState<null | Comunicado>(null);


    const handleModalToggle = (comunicado: Comunicado) => {
        setSelectedComunicado(comunicado); 
    };

    const handleModalClose = () => {
        setSelectedComunicado(null); 
    };


    return(
        <main className="px-5 w-full pb-5 h-[80vh] overflow-y-scroll">
            <Card className="">
                <CardHeader>
                    <CardTitle>Comunicados</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent >
                    <Actions value={value} setValue={setValue}/>

                    <div className="my-2 font-semibold text-xl">Total de Comunicados: {Comunicados.length}</div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Título</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody >
                            {Comunicados.map((comunicado) => (
                            <>
                                <TableRow key={comunicado.id} className="cursor-pointer" onClick={() => handleModalToggle(comunicado)}>
                                    <TableCell className="font-medium">#{comunicado.id}</TableCell>
                                    <TableCell>{comunicado.tipo}</TableCell>
                                    <TableCell>{comunicado.titulo}</TableCell>
                                </TableRow>
                            </>
                            


                            ))}
                        </TableBody>
                    </Table>
                </CardContent>

                <ComuniModal isOpen={!!selectedComunicado} onClose={handleModalClose} data={selectedComunicado} />
            </Card>
        </main>
    )
}

export default Page