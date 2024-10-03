"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Actions } from "@/components/comunicados/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ComuniModal } from "@/components/modals/ComuniModal";
import { Comunicado } from "@/types/Comunicado";
import axios from "axios";
import { IoTrash } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getComunicados } from "@/utils/api";


const Page = () => {

    const router = useRouter();
    const token = localStorage.getItem('authToken')

    useEffect(() => {

        if (!token) {
            router.push('/login');
        }
  }, [router]);

    const { data: comunicados, error, isLoading } = useQuery<Comunicado[]>({
        queryKey: [],
        queryFn: getComunicados,
        enabled: !!token
    })

    const [value, setValue] = useState('')
    const [selectedComunicado, setSelectedComunicado] = useState<null | Comunicado>(null);


    const handleModalToggle = (comunicado: Comunicado) => {
        setSelectedComunicado(comunicado); 
    };

    const handleModalClose = () => {
        setSelectedComunicado(null); 
    };

    const deleteComunicados = async (id: number) => {
        const response = await fetch(`https://agendasenacapi-production.up.railway.app/comunicados/${id}`, {
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
                    <CardTitle>Comunicados</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent >
                    <Actions value={value} setValue={setValue}/>

                    <div className="my-2 font-semibold text-xl">Total de Comunicados: {comunicados?.length}</div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>data</TableHead>
                            <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody >
                            {comunicados?.map((comunicado) => (
                            <>
                                <TableRow key={comunicado.idComunicado} className="cursor-pointer" onClick={() => handleModalToggle(comunicado)}>
                                    <TableCell className="font-medium">#{comunicado.idComunicado}</TableCell>
                                    <TableCell>{comunicado.tipodocomunicado}</TableCell>
                                    <TableCell>{comunicado.tituloComunicado}</TableCell>
                                    <TableCell>xxx</TableCell>
                                    <TableCell className="flex text-white gap-2">
                                    <div className="bg-yellow-300 p-2 rounded-md cursor-pointer"><FaEdit /></div>
                                    <div 
                                        className="bg-red-600 p-2 rounded-md cursor-pointer"
                                        onClick={() => deleteComunicados(comunicado.idComunicado)}
                                    >
                                            <IoTrash />
                                    </div>
                                    </TableCell>
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