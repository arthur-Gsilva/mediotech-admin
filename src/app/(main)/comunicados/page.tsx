"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Actions } from "@/components/comunicados/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ComuniModal } from "@/components/modals/ComuniModal";
import { Comunicado } from "@/types/Comunicado";
import { IoTrash } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getComunicados } from "@/utils/api";
import { DialogBase } from "@/components/DialogBase";
import { TableSkeleton } from "@/components/Skeletons/TableSkeleton";


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
    const [filtro, setFiltro] = useState<string>("")
    const [isOpen, setIsOpen] = useState(false);
    const [selectedComuni, setSelectedComuni] = useState<Comunicado | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [tipo, setTipo] = useState('')

    const comunicadosFiltrados = comunicados?.filter(comunicado => {
        const nomeMatch = (comunicado.tituloComunicado || "").toLowerCase().includes(filtro.toLowerCase())
        const tipoMatch = tipo === 'all' || !tipo || comunicado.tipodocomunicado.toLowerCase() === tipo.toLowerCase();

        return nomeMatch && tipoMatch 
    });

    const openEditModal = (comunicado: Comunicado) => {
        setSelectedComuni(comunicado)
        setIsOpen(true)
    }

    const openDetailsModal = (comunicado: Comunicado) => {
        setSelectedComuni(comunicado)
        setIsDetailOpen(true)
    }

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
                    <Actions onTipoChange={setTipo} onFiltroChange={setFiltro}/>

                    <div className="my-2 font-semibold text-xl">Total de Comunicados: {comunicadosFiltrados?.length}</div>

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

                        {isLoading &&
                            <TableSkeleton />
                        }

                        {!isLoading &&
                            <TableBody >
                                {comunicadosFiltrados?.map((comunicado) => (
                                    <TableRow key={comunicado.idComunicado} className="cursor-pointer">
                                        <TableCell className="font-medium" onClick={() => openDetailsModal(comunicado)}>#{comunicado.idComunicado}</TableCell>
                                            <TableCell onClick={() => openDetailsModal(comunicado)}>{comunicado.tipodocomunicado}</TableCell>
                                            <TableCell onClick={() => openDetailsModal(comunicado)}>{comunicado.tituloComunicado}</TableCell>
                                            <TableCell onClick={() => openDetailsModal(comunicado)}>xxx</TableCell>
                                            <TableCell 
                                                    className="flex text-white gap-2"
                                                >
                                                <div className="bg-yellow-300 p-2 rounded-md cursor-pointer" onClick={() => openEditModal(comunicado)}><FaEdit /></div>
                                                <div 
                                                    className="bg-red-600 p-2 rounded-md cursor-pointer"
                                                    onClick={() => deleteComunicados(comunicado.idComunicado)}
                                                >
                                                        <IoTrash />
                                                </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        }
                        
                    </Table>
                </CardContent>
            </Card>

            <DialogBase 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                comuniData={selectedComuni}
                title={'Editar Comunicado'}
                tipo={'COMUNICADO'}
            />

            <ComuniModal 
                data={selectedComuni}
                isOpen={isDetailOpen}
                onClose={setIsDetailOpen}
            />
        </main>
    )
}

export default Page