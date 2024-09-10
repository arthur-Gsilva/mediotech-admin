import { IoMdInformationCircleOutline } from "react-icons/io"
import { Card, CardContent, CardHeader } from "../ui/card"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Tooltip } from "../ui/tooltip"
import { Button } from "../ui/button"

export const Alunobox = () => {
    return(
        <Card>
            <CardHeader className="flex flex-row gap-6">
                <div>Alunos</div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div>
                                <IoMdInformationCircleOutline />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="bg-gray-900 rounded-md p-3 text-white max-w-[200px]">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit eaque debitis molestias harum id natus, reiciendis, totam dignissimos modi vero velit culpa repellendus sed suscipit magnam illum! Vero, ipsa reprehenderit.
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardHeader>
            <CardContent className="text-center text-xl font-bold">18</CardContent>
        </Card>
    )
}