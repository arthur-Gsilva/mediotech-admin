'use client'

import { Actions } from "@/components/turmas/Actions"
import { TurmaBox } from "@/components/turmas/TurmaBox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Turmas } from "@/data/Turmas"
import { useState } from "react"

const Page = () => {

    const [value, setValue] = useState('')

    const filteredTurmas = value !== '' 
    ? Turmas.filter((item) => item.ano === value) 
    : Turmas;

    return(
        <main className="px-5">
            <Card className="max-w-[300px] sm:max-w-[initial]">
                <CardHeader>
                    <CardTitle>Lista de Turmas</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent>
                    <Actions value={value} setValue={setValue}/>

                    <div className="mt-2">Total de turmas: {filteredTurmas.length}</div>

                    <div className="grid grid-cols-1 mt-5 gap-6 sm:grid-cols-2">
                    {filteredTurmas
                        .map((item) => (
                        <TurmaBox key={item.id} data={item} anoFiltro={value} />
                        ))
                    }
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

export default Page