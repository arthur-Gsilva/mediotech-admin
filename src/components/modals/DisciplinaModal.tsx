
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Disciplina } from "@/types/Disciplina"

type Props = {
    isOpen: boolean,
    onClose: (a: boolean) => void
    data: Disciplina
}

export const DisciplinaModal = ({ isOpen, onClose, data }: Props) => {
    return(
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className="w-[80vw] max-w-none">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">{data.name}</DialogTitle>
                    <div className="h-[2px] w-full bg-primary"></div>
                </DialogHeader>
                <div className='flex flex-col gap-2'>
                    <p>Curso Técnologo: {data.curso}</p>
                    <p>Carga Horária: {data.cargaHoraria} Horas</p>
                    <p>Professor: {data.professor}</p>
                    <p>Turma: {data.turma}</p>
                    <p>Quantidade de Alunos: {data.QtdAlunos}</p>
                    <p>Turno: {data.turno}</p>
                    <p>Horário: Segunda e Quarta, 08h - 12h</p>
                    <p>Ementa: pe.senac.br/mediotec/ementa</p>
                </div>

                <div className="mt-10">
                    <div className="h-[2px] w-full bg-primary mb-2"></div>

                    <div className="font-bold text-md mb-4">Descrição Completa:</div>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi odit labore necessitatibus, pariatur aut illo repellendus corporis eius consequatur neque quo esse illum voluptas enim animi provident harum eum magni. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit ratione maiores iste libero deleniti mollitia reprehenderit aspernatur sit minima. Fugiat voluptatum velit, consequuntur impedit ad voluptatibus tempore eligendi voluptas sint?</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}