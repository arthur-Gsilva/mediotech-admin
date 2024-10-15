import { User } from "@/types/Estudante"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useQuery } from "@tanstack/react-query"
import { Disciplina } from "@/types/Disciplina"
import { getTurmasByProfessor } from "@/utils/api"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useEffect, useState } from "react"

type Props = {
    isOpen: boolean,
    onClose: (a: boolean) => void,
    data: User | null
}

export const ColaboradorModal = ({ isOpen, onClose, data }: Props) => {

    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if(typeof window !== "undefined"){
            setToken(window.localStorage.getItem('authToken'))
        }
    }, [])

    const { data: turmas} = useQuery<Disciplina[]>({
        queryKey: ['turmas', token],
        queryFn: () => getTurmasByProfessor(data?.codigo as number),
        enabled: !!token
    })

    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[80vw] max-w-none">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">{data?.nomeCompletoUser}</DialogTitle>
                    <div className="h-[2px] w-full bg-primary"></div>
                </DialogHeader>
                <div className='flex flex-col gap-2'>
                    <p>Código: {data?.codigo}</p>
                    <p>Cpf: {data?.cpfUser}</p>
                    <p>Data de Nascimento: {data?.dataNascimentoUser}</p>
                    <p>Gênero: {data?.generoUser}</p>
                </div>

                <div className="mt-10">
                    <div className="grid grid-cols-4 items-center gap-4">
                        {turmas?.map((turma) => (
                            <Card key={turma.idturma}>
                                <CardHeader>
                                    <CardTitle>{turma.nomeTurma}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div>ano: {turma.ano}</div>
                                    <div>Disciplina: {turma.nomeDaDisciplina}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}