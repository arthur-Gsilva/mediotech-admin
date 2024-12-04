'use client'

import { Actions } from "@/components/estudantes/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User } from "@/types/Estudante"
import { excludeUser, getAlunos } from "@/utils/api/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { DialogBase } from "@/components/DialogBase";
import { EstudanteModal } from "@/components/modals/EstudanteModal";
import { TableSkeleton } from "@/components/Skeletons/TableSkeleton"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const Page = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedAluno, setSelectedAluno] = useState<User | null>(null)
    const [filtro, setFiltro] = useState<string>("")
    const [curso, setCurso] = useState<string>("")
    const [turno, setTurno] = useState<string>("")

    const router = useRouter();
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authToken = window.localStorage.getItem('authToken');
            setToken(authToken);
        }
    }, []); 

    useEffect(() => {
        if (token === null) return;

        if (!token) {
            router.push('/login');
        }
    }, [token, router]);


    const { data: alunos, isLoading } = useQuery<User[]>({
        queryKey: ['alunos', token],
        queryFn: getAlunos,
        enabled: !!token
    })


    const alunosFiltrados = alunos?.filter(aluno => {
        const nomeMatch = (aluno.nomeCompletoUser || "").toLowerCase().includes(filtro.toLowerCase())
        const cursoMatch = curso === 'all' || !curso || aluno.turma.curso.nomeCurso.toLowerCase() === curso.toLowerCase();
        const turnoMatch = turno === 'all' || !turno || aluno.turma.turno.toLowerCase() === turno.toLowerCase();

        return nomeMatch && cursoMatch && turnoMatch
    });

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: excludeUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['alunos', token]
            })
        }
    })

    const deleteAlunos = async (id: number) => {
        await deleteMutation.mutateAsync(id)
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
                                            <TableCell onClick={() => openDetailsModal(estudante)}>{estudante.turma?.curso?.nomeCurso || "Sem curso"}</TableCell>
                                            <TableCell onClick={() => openDetailsModal(estudante)}>{estudante.turma?.nomeTurma}</TableCell>
                                            <TableCell onClick={() => openDetailsModal(estudante)}>{estudante.turma?.turno}</TableCell>
                                            <TableCell onClick={() => openDetailsModal(estudante)}>{estudante.numerourgencia}</TableCell>
                                            <TableCell className="flex text-white gap-2">
                                                <div className="bg-yellow-300 p-2 rounded-md cursor-pointer" onClick={() => openEditModal(estudante)}><FaEdit /></div>
                                                        
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <div 
                                                            className="bg-red-600 p-2 rounded-md cursor-pointer"
                                                        >
                                                                <IoTrash />
                                                        </div>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogTitle>Deseja excluir estudante?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Importante ressaltar que essa ação é irreversível, ao clicar em excluir o estudante será
                                                            excluída permanentemente.
                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => deleteAlunos(estudante.codigo)}>Excluir</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
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
