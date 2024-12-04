import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useState } from "react"
import { DisciplinaModal } from "../modals/DisciplinaModal"
import { Disciplina } from "@/types/Disciplina"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { MdModeEdit } from "react-icons/md";
import { ActionForm } from "./ActionForm";

type Props = {
    data: Disciplina
}

export const DisciBox = ({ data }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editHidden, setEditHidden] = useState(true)

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
                    {data.nomeDaDisciplina}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>id: {data.idDisciplina}</div>
                <div>Professor: {data.nomeProfessor}</div>
                <div>carga Horária: {data.cargaHoraria}</div>
            </CardContent>

            <DisciplinaModal isOpen={isModalOpen} onClose={handleModalToggle} data={data} />

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
                            <DialogTitle className="text-xl">Editar Disciplina</DialogTitle>
                            <div className="h-1 w-full bg-primary"></div>
                        </DialogHeader>

                        <ActionForm setClose={setIsOpen} edit={true} data={data}/>
                    </DialogContent>
                </Dialog>
            </div>
        </Card>
    )
}