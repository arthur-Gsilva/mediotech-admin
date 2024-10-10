'use client'

import { Actions } from "@/components/colaboradores/Actions"
import { DialogBase } from "@/components/DialogBase"
import { ColaboradorModal } from "@/components/modals/ColaboradorModal"
import { TableSkeleton } from "@/components/Skeletons/TableSkeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User } from "@/types/Estudante"
import { getColaboradores } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { IoTrash } from "react-icons/io5"


const Page = () => {

    const [token, setToken] = useState<string | null>(null)
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedCola, setSelectedCola] = useState<User | null>(null)
    const [filtro, setFiltro] = useState<string>("")
    const [cargo, setCargo] = useState('')
    const [turno, setTurno] = useState('')
    
    useEffect(() => {
        const authToken = localStorage.getItem('authToken')
        setToken(authToken)

        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const { data: colaboradores, isLoading } = useQuery<User[]>({
        queryKey: ['colaboradores', token],
        queryFn: getColaboradores,
        enabled: !!token
    })

    const colaboradoresFiltrados = colaboradores?.filter(colaborador => {
        const nomeMatch = (colaborador.nomeCompletoUser || "").toLowerCase().includes(filtro.toLowerCase())
        const cursoMatch = cargo === 'all' || !cargo || colaborador.tipoUser.toLowerCase() === cargo.toLowerCase();
        const turnoMatch = turno === 'all' || !turno || colaborador.turma.turno.toLowerCase() === turno.toLowerCase();

        return nomeMatch && cursoMatch && turnoMatch
    });

    const openEditModal = (cola: User) => {
        setSelectedCola(cola)
        setIsOpen(true)
    }

    const openDetailsModal = (Colaborador: User) => {
        setSelectedCola(Colaborador)
        setIsDetailOpen(true)
    }

    const deleteColaborador = async (id: number) => {
        const response = await fetch(`https://agendasenacapi-production.up.railway.app/user/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json'
            }
          });

          response.ok ? console.log('ok') : ''
    }

    return(
        <main className="px-5 w-full pb-5 h-[80vh] overflow-y-scroll">
            <Card className="">
                <CardHeader>
                    <CardTitle>Lista de Colaboradores</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent >
                    <Actions onCargoChange={setCargo} onTurnoChange={setTurno} onFiltroChange={setFiltro}/>

                    <div className="my-2 font-semibold text-xl">Total de Colaboradores: {colaboradoresFiltrados?.length}</div>

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

                        {isLoading &&
                            <TableSkeleton />
                        }

                        {!isLoading &&
                            <TableBody >
                                {colaboradoresFiltrados?.map((colaborador) => (
                                <TableRow key={colaborador.codigo} className="cursor-pointer">
                                    <TableCell onClick={() => openDetailsModal(colaborador)} className="font-medium">{colaborador.codigo}</TableCell>
                                    <TableCell onClick={() => openDetailsModal(colaborador)}>{colaborador.nomeCompletoUser}</TableCell>
                                    <TableCell onClick={() => openDetailsModal(colaborador)}>{colaborador.tipoUser}</TableCell>
                                    <TableCell onClick={() => openDetailsModal(colaborador)}>{colaborador.turma?.turno || "Sem turno"}</TableCell>
                                    <TableCell onClick={() => openDetailsModal(colaborador)}>{colaborador.contatopessoal}</TableCell>
                                    <TableCell onClick={() => openDetailsModal(colaborador)}>{colaborador.imailUser}</TableCell>
                                    <TableCell className="flex text-white gap-2">
                                        <div className="bg-yellow-300 p-2 rounded-md cursor-pointer" onClick={() => openEditModal(colaborador)}><FaEdit /></div>
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
                        }
                    </Table>
                </CardContent>
            </Card>

            <DialogBase 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                data={selectedCola} 
                title={'Editar Colaborador'}
                tipo={'COLABORADOR'}
            />

            <ColaboradorModal
                isOpen={isDetailOpen}
                onClose={setIsDetailOpen}
                data={selectedCola}
            />
        </main>
    )
}

export default Page