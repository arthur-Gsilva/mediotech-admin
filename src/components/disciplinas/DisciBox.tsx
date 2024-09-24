import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useState } from "react"
import { DisciplinaModal } from "../modals/DisciplinaModal"
import { Disciplina } from "@/types/Disciplina"

type Props = {
    data: Disciplina
}

export const DisciBox = ({ data }: Props) => {

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
                    {data.name}
                </CardTitle>
                <input type="checkbox" name="" id="" />
            </CardHeader>
            <CardContent>
                <div>id: {data.id}</div>
                <div>Professor: {data.professor}</div>
                <div>carga Horária: {data.cargaHoraria}H</div>
            </CardContent>

            <DisciplinaModal isOpen={isModalOpen} onClose={handleModalToggle} data={data} />
        </Card>
    )
}