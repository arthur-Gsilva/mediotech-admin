import { Turma } from "@/types/Turma"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useState } from "react"
import { TurmaModal } from "../TurmaModal"

type Props = {
    data: Turma
}

export const TurmaBox = ({ data }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen((prev) => !prev);
    };

    return(
        <Card className="pb-5">
            <CardHeader className="flex flex-row items-center justify-between gap-10">
                <CardTitle 
                    className="border-b-2 border-transparent hover:border-black cursor-pointer"
                    onClick={handleModalToggle}
                >
                    {data.ano} ({data.periodo})
                </CardTitle>
                <input type="checkbox" name="" id="" />
            </CardHeader>
            <CardContent>
                <div>id: {data.id}</div>
                <div>Estudantes: {data.estudantes}</div>
                <div>Turno: {data.turno}</div>
            </CardContent>

            <TurmaModal isOpen={isModalOpen} onClose={handleModalToggle} data={data} />
        </Card>
    )
}