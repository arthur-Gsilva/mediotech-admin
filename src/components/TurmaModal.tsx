import { Turma } from "@/types/Turma"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

type Props = {
    isOpen: boolean,
    onClose: (a: boolean) => void
    data: Turma
}

export const TurmaModal = ({ isOpen, onClose, data }: Props) => {
    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{data.ano} ({data.periodo})</DialogTitle>
                    <div className="h-[2px] w-full bg-primary"></div>
                </DialogHeader>
                <div className='flex flex-col gap-2'>
                    <p>Represetante: {data.representante && data.representante || 'Á definir'}</p>
                    <p>Curso Técnologo: {data.curso}</p>
                    <p>Disciplinas: (botão ou PNG)</p>
                    <p>Turno: {data.turno}</p>
                    <p>Horário: (botão ou PNG)</p>
                </div>

                <div className="mt-10">
                    <div>Alunos Alocados: 20</div>
                    <div className="h-[2px] w-full bg-primary my-2"></div>
                    <div className="flex flex-wrap gap-4">
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Sator D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                        <div className="text-white bg-primary p-2 rounded-md cursor-pointer">Paulo D.</div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}