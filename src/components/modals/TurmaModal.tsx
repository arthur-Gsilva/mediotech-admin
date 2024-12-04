import { Turma } from "@/types/Turma"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { AiOutlinePlus } from "react-icons/ai"
import { useEffect, useState } from "react"
import { ActionForm } from "../estudantes/ActionForm"
import { useQuery } from "@tanstack/react-query"
import { User } from "@/types/Estudante"
import { getAlunos } from "@/utils/api"

type Props = {
    isOpen: boolean,
    onClose: (a: boolean) => void
    data: Turma
}

export const TurmaModal = ({ isOpen, onClose, data }: Props) => {

    const [isAlunoOpen, setIsAlunoOpen] = useState(false)

    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authToken = window.localStorage.getItem('authToken');
            setToken(authToken);
        }
    }, []); 

    const { data: alunos} = useQuery<User[]>({
        queryKey: ['alunos', token],
        queryFn: getAlunos,
        enabled: !!token
    })

    const alunosByTurma = alunos?.filter((aluno) => aluno.turma.idturma === data.idturma)

    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[80vw] max-w-none">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">{data.anno} ({data.periodo})</DialogTitle>
                    <div className="h-[2px] w-full bg-primary"></div>
                </DialogHeader>
                <div className='flex flex-col gap-2'>
                    <p>Representante: {data.representante && data.representante.codigo || 'Á definir'}</p>
                    <p>Curso Técnologo: {data.curso && data.curso.nomeCurso || 'Á definir' }</p>
                    <p>Disciplinas: (botão ou PNG)</p>
                    <p>Turno: {data.turno}</p>
                    <p>Horário: (botão ou PNG)</p>

                </div>

                <div className="mt-10">
                    <div className="flex items-center justify-between">
                        <div className="font-bold text-md">Alunos Alocados: {alunosByTurma?.length}</div>
                        <Dialog open={isAlunoOpen} onOpenChange={setIsAlunoOpen}>
                            <DialogTrigger asChild>
                                <Button> <AiOutlinePlus /> Adicionar Aluno </Button>   
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Criar Aluno</DialogTitle>
                                    <div className="h-1 w-full bg-primary"></div>
                                </DialogHeader>

                                <ActionForm setClose={setIsAlunoOpen} edit={false}/>
                            </DialogContent>
                        </Dialog>
                    </div>
                    
                    <div className="h-[2px] w-full bg-primary my-2"></div>
                    <div className="flex flex-wrap gap-4">
                        {alunosByTurma?.map((aluno) => (
                            <p key={aluno.codigo} className="w-[180px] overflow-hidden text-ellipsis whitespace-nowrap bg-primary text-white text-center rounded-md p-2 cursor-pointer">{aluno.nomeCompletoUser}</p>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}