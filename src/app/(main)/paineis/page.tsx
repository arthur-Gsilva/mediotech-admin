"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdChecklist } from "react-icons/md";
import { MdOutlineFilterAlt } from "react-icons/md";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { Alunobox } from "@/components/dashboards/Alunobox";
import { MiddleArea } from "@/components/dashboards/MiddleArea";
import { useRouter } from 'next/navigation';
import {  useEffect, useState } from "react";


const Page = () => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null)
    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authToken = window.localStorage.getItem('authToken');
            setToken(authToken);
        }
    }, []); 

    useEffect(() => {
        if (token === null) return;

        if (!token) {
            router.push('/login');
        }
    }, [token, router]);


    const etariaData = [
        { idade: 14, alunos: 89},
        { idade: 15, alunos: 67},
        { idade: 16, alunos: 132},
        { idade: 17, alunos: 98}
    ]

    const etariaConfig = {
        idade: {
          label: "idade",
          color: "#2563eb",
        }
        
      } satisfies ChartConfig


    const anoData = [
        { ano: '1º ano', alunos: 277},
        { ano: '2º ano', alunos: 135},
        { ano: '3º ano', alunos: 169},
    ]

    const anoConfig = {
        idade: {
          label: "ano",
          color: "#2563eb",
        }
        
      } satisfies ChartConfig

    return(
        <div className="w-full grid justify-center">
            <div className="grid gap-5 px-5 max-w-350px sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-5 mx-auto md:mx-0">
                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            <div>Turno</div>
                            <div className="flex gap-2 text-secondary">
                                <MdChecklist />
                                <MdOutlineFilterAlt />
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2 text-white">
                            <div className="bg-secondary p-2 rounded-lg">Manhã</div>
                            <div className="bg-secondary p-2 rounded-lg">Tarde</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            <div>Ano</div>
                            <div className="flex gap-2 text-secondary">
                                <MdChecklist />
                                <MdOutlineFilterAlt />
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3 text-white">
                            <div className="bg-secondary p-2 rounded-lg">1º ano</div>
                            <div className="bg-secondary p-2 rounded-lg">2º ano</div>
                            <div className="bg-secondary p-2 rounded-lg">3º ano</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            <div>Disciplinas</div>
                            <div className="flex gap-2 text-secondary">
                                <MdChecklist />
                                <MdOutlineFilterAlt />
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4 items-center">
                            <div className="border-2 secondary flex items-center rounded-md px-1">
                                <input type="text" className="outline-none bg-transparent flex-1 text-gray-950"/>
                                <IoIosSearch />
                            </div>
                            <div className="text-xl bg-secondary text-white p-2 rounded-sm cursor-pointer hover:bg-secondary">
                                <FaPlus />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-10 items-center mx-auto md:mx-0">
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                        <Alunobox title="Alunos" number={18}/>
                        <Alunobox title="Professores" number={12}/>
                        <Alunobox title="disciplinas" number={9}/>
                    </div>
                    <MiddleArea />
                </div>

                <div className="flex flex-col gap-4 items-center sm:col-span-2 lg:col-span-1">
                    <Card className="w-[60%] sm:w-full">
                        <CardHeader>
                            <CardTitle className="text-base">Qtde de Alunos por faixa etária</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={etariaConfig} className="min-h-[200px] w-full">
                            <BarChart accessibilityLayer  data={etariaData}>
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey='idade'
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.toString().slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="alunos" fill="#054C82" radius={4} />
                            </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card className="w-[60%] sm:w-full">
                        <CardHeader>
                            <CardTitle className="text-base">Qtde de Alunos por ano</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={anoConfig} className="min-h-[200px] w-full">
                            <BarChart accessibilityLayer  data={anoData}>
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey='ano'
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="alunos" fill="#054C82" radius={4} />
                            </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}


export default Page
