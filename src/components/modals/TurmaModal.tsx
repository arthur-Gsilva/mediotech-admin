import { Turma } from "@/types/Turma"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"

type Props = {
    isOpen: boolean,
    onClose: (a: boolean) => void
    data: Turma
}

export const TurmaModal = ({ isOpen, onClose, data }: Props) => {

    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[80vw] max-w-none">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">{data.anno} ({data.periodo})</DialogTitle>
                    <div className="h-[2px] w-full bg-primary"></div>
                </DialogHeader>
                <div className='flex flex-col gap-2'>
                    <p>Representante: {data.representante && data.representante.codigo || 'Á definir'}</p>
                    <p>Curso Técnologo: {data.curso && data.curso.nomecurso || 'Á definir' }</p>
                    <p>Disciplinas: (botão ou PNG)</p>
                    <p>Turno: {data.turno}</p>
                    <p>Horário: (botão ou PNG)</p>

                </div>

                <div className="mt-10">
                    <div className="flex items-center justify-between">
                        <div className="font-bold text-md">Alunos Alocados: 3</div>
                        <Button>Adicionar Aluno</Button>
                    </div>
                    
                    <div className="h-[2px] w-full bg-primary my-2"></div>
                    <div className="flex flex-wrap gap-4">
                        
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}