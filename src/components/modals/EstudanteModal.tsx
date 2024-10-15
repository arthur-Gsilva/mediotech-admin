import { User } from "@/types/Estudante"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Conceitos } from "../estudantes/Conceitos"
import { Faltas } from "../estudantes/Faltas"

type Props = {
    isOpen: boolean,
    onClose: (a: boolean) => void,
    data: User | null
}


export const EstudanteModal = ({ isOpen, onClose, data }: Props) => {

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
                    <Tabs defaultValue="conceitos">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="conceitos" >
                                Conceitos
                            </TabsTrigger>
                            <TabsTrigger value="faltas" >
                                Faltas
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="conceitos">
                            <Conceitos data={data}/>
                        </TabsContent>
                        <TabsContent value="faltas">
                            <Faltas />
                        </TabsContent>
                    </Tabs>
                    
                </div>
            </DialogContent>
        </Dialog>
    )
}