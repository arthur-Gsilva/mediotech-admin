import { IoMdInformationCircleOutline } from "react-icons/io"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Tooltip } from "../ui/tooltip"

type Props = {
    title: string,
    number: number
}

export const Alunobox = ({ title, number }: Props) => {
    return(
        <Card className="relative hover:z-10">
            <CardHeader className="">
                <div className="text-center">{title}</div>
            </CardHeader>
            <CardContent className="text-center md:text-xl font-bold text-brown">{number}</CardContent>

            <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild className="z-50">
                            <span className="absolute top-2 right-3">
                                <IoMdInformationCircleOutline />
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="bg-gray-900 rounded-md p-3 text-white max-w-[200px]">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit eaque debitis molestias harum id natus, reiciendis, totam dignissimos modi vero velit culpa repellendus sed suscipit magnam illum! Vero, ipsa reprehenderit.
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
        </Card>
    )
}