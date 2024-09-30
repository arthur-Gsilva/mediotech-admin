import { Turma } from "@/types/Turma"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useState } from "react"
import { TurmaModal } from "../modals/TurmaModal"
import { Button } from "../ui/button"
import { MdModeEdit } from "react-icons/md";

type Props = {
    data: Turma
}

export const TurmaBox = ({ data }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
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
                    {data.nomeTurma} ({data.anno})
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>id: {data.idturma}</div>
                <div>Curso: {data.curso && data.curso.nomecurso || 'Á definir' }</div>
                <div>Turno: {data.turno}</div>

                
            </CardContent>

            <TurmaModal isOpen={isModalOpen} onClose={handleModalToggle} data={data} />

            <Button 
                className="bg-yellow-400 text-xl absolute right-3 transition-all" 
                style={{top: editHidden ? '-200px' : '20px'}} 
                size='icon'
            >
                <MdModeEdit />
            </Button>
        </Card>
    )
}