import { Turma } from "@/types/Turma"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useState } from "react"
import { TurmaModal } from "../modals/TurmaModal"
import { Button } from "../ui/button"
import { MdModeEdit } from "react-icons/md";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ActionForm } from "./ActionForm"

type Props = {
    data: Turma
}

export const TurmaBox = ({ data }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editHidden, setEditHidden] = useState(true)
    const [isOpen, setIsOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen((prev) => !prev);
    };

    return(
        <Card className="pb-5 relative overflow-hidden" onMouseLeave={() => setEditHidden(true)} onMouseOver={() => setEditHidden(false)}>
            <CardHeader className="flex flex-row items-center justify-between gap-10">
                <CardTitle 
                    className="border-b-2 border-transparent hover:border-black cursor-pointer"
                    onClick={handleModalToggle}
                >
                    {data.nomeTurma} ({data.anno})
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>id: {data.idturma}</div>
                <div>Curso: {data.curso && data.curso.nomecurso || 'Á definir' }</div>
                <div>Turno: {data.turno}</div>
            </CardContent>

            <TurmaModal isOpen={isModalOpen} onClose={handleModalToggle} data={data} />

            <div 
                className=" absolute right-3 transition-all" 
                style={{bottom: editHidden ? '-200px' : '20px'}} 
            >
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-yellow-400 text-xl" size='icon'> <MdModeEdit /></Button>   
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-xl">Editar Turma</DialogTitle>
                            <div className="h-1 w-full bg-primary"></div>
                        </DialogHeader>

                        <ActionForm setClose={setIsOpen} edit={true} data={data}/>
                    </DialogContent>
                </Dialog>
            </div>
        </Card>
    )
}