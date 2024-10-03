import { Turma } from "@/types/Turma"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Estudantes } from "@/data/Estudantes"
import { Button } from "../ui/button"

type Props = {
    isOpen: boolean,
    onClose: (a: boolean) => void
    data: Turma
}

export const TurmaModal = ({ isOpen, onClose, data }: Props) => {

    const token = localStorage.getItem('authToken')
    // const filteredAlunos = Estudantes.filter(item => item.turma === data.idturma)

    const deleteTurma = async () => {
        const response = await fetch(`https://agendasenacapi-production.up.railway.app/turma/${data.idturma}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json'
            }
          });

          onClose(false)
    }


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

                    <Button variant='destructive' className="max-w-24" onClick={deleteTurma}>Excluir Turma</Button>
                </div>

                <div className="mt-10">
                    <div className="font-bold text-md">Alunos Alocados: 3</div>
                    <div className="h-[2px] w-full bg-primary my-2"></div>
                    <div className="flex flex-wrap gap-4">
                        {/* {filteredAlunos.map((item) => (
                            <div
                                key={item.matricula}
                                className="text-white bg-primary p-2 rounded-md cursor-pointer w-[150px] text-center overflow-hidden text-ellipsis whitespace-nowrap hover:opacity-70"
                            >
                                {item.nome}
                            </div>
                        ))} */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}