"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdChecklist } from "react-icons/md";
import { MdOutlineFilterAlt } from "react-icons/md";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { Alunobox } from "@/components/dashboards/Alunobox";


const Page = () => {


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
        { ano: '1º', alunos: 277},
        { ano: '2º', alunos: 135},
        { ano: '3º', alunos: 169},
    ]

    const anoConfig = {
        idade: {
          label: "ano",
          color: "#2563eb",
        }
        
      } satisfies ChartConfig

    return(
        <div className="px-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-5">
                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            <div>Turno</div>
                            <div className="flex gap-2 text-secondary">
                                <MdChecklist />
                                <MdOutlineFilterAlt />
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <div className="bg-gray-300 p-1 rounded-lg">Manhã</div>
                            <div className="bg-gray-300 p-1 rounded-lg">Tarde</div>
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
                        <CardContent className="flex flex-col gap-2">
                            <div className="bg-gray-300 p-1 rounded-lg">1º ano</div>
                            <div className="bg-gray-300 p-1 rounded-lg">2º ano</div>
                            <div className="bg-gray-300 p-1 rounded-lg">3º ano</div>
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
                            <div className="border-2 border-secondary flex items-center rounded-md px-1">
                                <input type="text" className="outline-none bg-transparent flex-1 text-gray-950"/>
                                <IoIosSearch />
                            </div>
                            <div className="text-xl bg-gray-300 p-2 rounded-sm cursor-pointer hover:bg-secondary">
                                <FaPlus />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col gap-10 items-center">
                    <div className="flex gap-3 flex-wrap">
                        <Alunobox />
                        <Alunobox />
                        <Alunobox />
                    </div>
                    <div className="bg-primary h-full w-full min-h-[150px] rounded-xl">
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Qtde de Alunos por ano</CardTitle>
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
                                <Bar dataKey="alunos" fill="#F6A10A" radius={4} />
                            </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Qtde de Alunos por faixa etária</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={anoConfig} className="min-h-[200px] w-full">
                            <BarChart accessibilityLayer  data={anoData}>
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey='idade'
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="alunos" fill="#F6A10A" radius={4} />
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