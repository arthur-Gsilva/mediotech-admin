'use client'

import { Actions } from "@/components/estudantes/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User } from "@/types/Estudante"
import { getAlunos, req } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { DialogBase } from "@/components/DialogBase";
import { EstudanteModal } from "@/components/modals/EstudanteModal";
import { TableSkeleton } from "@/components/Skeletons/TableSkeleton"

const Page = () => {
    const [token, setToken] = useState<string | null>(null)
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedAluno, setSelectedAluno] = useState<User | null>(null)
    const [filtro, setFiltro] = useState<string>("")
    const [curso, setCurso] = useState<string>("")
    const [turno, setTurno] = useState<string>("")

    useEffect(() => {
        const authToken = localStorage.getItem('authToken')
        setToken(authToken)
        if (!token) {
            router.push('/login');
        }
    }, [router]);


    const { data: alunos, isLoading } = useQuery<User[]>({
        queryKey: ['alunos', token],
        queryFn: getAlunos,
        enabled: !!token
    })


    const alunosFiltrados = alunos?.filter(aluno => {
        const nomeMatch = (aluno.nomeCompletoUser || "").toLowerCase().includes(filtro.toLowerCase())
        const cursoMatch = curso === 'all' || !curso || aluno.turma.curso.nomecurso.toLowerCase() === curso.toLowerCase();
        const turnoMatch = turno === 'all' || !turno || aluno.turma.turno.toLowerCase() === turno.toLowerCase();

        return nomeMatch && cursoMatch && turnoMatch
    });

    const deleteAlunos = async (id: number) => {
        console.log(id)
        const response = await fetch(`${req}/user/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json'
            }
          });

          response.ok ? console.log('ok') : ''
    }

    const openEditModal = (aluno: User) => {
        setSelectedAluno(aluno)
        setIsOpen(true)
    }

    const openDetailsModal = (aluno: User) => {
        setSelectedAluno(aluno)
        setIsDetailOpen(true)
    }


    return(
        <main className="px-5 w-full pb-5 h-[80vh] overflow-y-scroll">
            <Card className="">
                <CardHeader>
                    <CardTitle>Lista de Alunos</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent >
                    <Actions onCursoChange={setCurso} onTurnoChange={setTurno} onFiltroChange={setFiltro}/>

                    <div className="my-2 font-semibold text-xl">Total de Alunos: {alunosFiltrados?.length}</div>

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


                        {isLoading &&
                            <TableSkeleton />
                        }

                        {!isLoading &&
                            <TableBody >
                                {alunosFiltrados?.map((estudante, index) => (
                                    <TableRow key={index} className="cursor-pointer">
                                            <TableCell className="font-medium" onClick={() => openDetailsModal(estudante)}>{estudante.codigo}</TableCell>
                                            <TableCell onClick={() => openDetailsModal(estudante)}>{estudante.nomeCompletoUser}</TableCell>
                                            <TableCell onClick={() => openDetailsModal(estudante)}>{estudante.turma?.curso?.nomecurso || "Sem curso"}</TableCell>
                                            <TableCell onClick={() => openDetailsModal(estudante)}>{estudante.turma?.nomeTurma}</TableCell>
                                            <TableCell onClick={() => openDetailsModal(estudante)}>{estudante.turma?.turno}</TableCell>
                                            <TableCell onClick={() => openDetailsModal(estudante)}>{estudante.numerourgencia}</TableCell>
                                            <TableCell className="flex text-white gap-2">
                                                <div className="bg-yellow-300 p-2 rounded-md cursor-pointer" onClick={() => openEditModal(estudante)}><FaEdit /></div>
                                                        
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
                        }
                    </Table>
                </CardContent>
            </Card>

            <DialogBase 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                data={selectedAluno}
                title={'Editar Aluno'}
                tipo={'ALUNO'}
            />

            <EstudanteModal 
                isOpen={isDetailOpen}
                onClose={setIsDetailOpen}
                data={selectedAluno}
            />
        </main>
    )
}

export default Page
