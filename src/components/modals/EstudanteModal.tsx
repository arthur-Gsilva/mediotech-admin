import { User } from "@/types/Estudante"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { getAvaliacoes } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Avaliacao } from "@/types/Avaliacao"

type Props = {
    isOpen: boolean,
    onClose: (a: boolean) => void,
    data: User | null
}


export const EstudanteModal = ({ isOpen, onClose, data }: Props) => {

    const token = localStorage.getItem('authToken')

    const { data: avaliacoes } = useQuery<Avaliacao[]>({
        queryKey: ['avaliacoes', token],
        queryFn: () => getAvaliacoes(data?.codigo as number),
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
                    <p>Matrícula: {data?.codigo}</p>
                    <p>Cpf: {data?.cpfUser}</p>
                    <p>Responsável: {data?.numerourgencia}</p>
                    <p>Turma: {data?.turma.nomeTurma}</p>
                    <p>Turno: {data?.turma.turno}</p>
                    <p>Curso: {data?.turma.curso.nomecurso}</p>
                    <p>Data de Nascimento: {data?.dataNascimentoUser}</p>
                    <p>Gênero: {data?.generoUser}</p>
                </div>

                <div className="mt-10">
                    <div className="">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Disciplina</TableHead>
                                    <TableHead>Conceito 1</TableHead>
                                    <TableHead>Conceito 2</TableHead>
                                    <TableHead>Média Final</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                            {avaliacoes?.map((avaliacao) => {
                            const conceito1 = avaliacao.conceito.notaConceito; 
                            const conceito2 = Number(avaliacao.ordemlancameneto);
                            
                            
                            const mediaFinal = ((conceito1 + conceito2) / 2).toFixed(2); // Média com duas casas decimais

                            return (
                                <TableRow key={avaliacao.disciplina.idDisciplina}>
                                    <TableCell>{avaliacao.disciplina.nomeDaDisciplina}</TableCell>
                                    <TableCell>{conceito1}</TableCell>
                                    <TableCell>{conceito2}</TableCell>
                                    <TableCell>{mediaFinal}</TableCell>
                                </TableRow>
                            );
                        })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}