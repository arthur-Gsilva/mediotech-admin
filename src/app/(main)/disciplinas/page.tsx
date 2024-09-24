'use client'

import { DisciBox } from "@/components/disciplinas/DisciBox"
import { Actions } from "@/components/disciplinas/Actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Disciplinas } from "@/data/Disciplinas"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const Page = () => {

    const router = useRouter();

    useEffect(() => {
    const token = localStorage.getItem('authToken');

        if (!token) {
            router.push('/login');
        }
  }, [router]);

    const [value, setValue] = useState('')

    return(
        <main className="px-5 w-full">
            <Card className="">
                <CardHeader>
                    <CardTitle>Lista de Disciplinas</CardTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </CardHeader>
                <CardContent>
                    <Actions value={value} setValue={setValue}/>

                    <div className="mt-2">Total de Disciplinas: {Disciplinas.length}</div>

                    <div className="grid grid-cols-1 mt-5 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {Disciplinas
                        .map((item) => (
                            <DisciBox key={item.id} data={item} />
                        ))
                    }
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

export default Page
