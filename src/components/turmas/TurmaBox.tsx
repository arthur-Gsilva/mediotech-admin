import { Turma } from "@/types/Turma"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type Props = {
    data: Turma,
    anoFiltro: string
}

export const TurmaBox = ({ data, anoFiltro }: Props) => {
    return(
        <Card className="pb-5">
            <CardHeader className="flex flex-row items-center justify-between gap-10">
                <CardTitle>{data.ano} ({data.periodo})</CardTitle>
                <input type="checkbox" name="" id="" />
            </CardHeader>
            <CardContent>
                <div>id: {data.id}</div>
                <div>Estudantes: {data.estudantes}</div>
                <div>Turno: {data.turno}</div>
            </CardContent>
        </Card>
    )
}