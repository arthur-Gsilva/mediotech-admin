import { IoIosSearch } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ActionForm } from "./ActionForm";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
    onAnoChange: (a: string) => void,
    onPeriodoChange: (a: string) => void,
    onFiltroChange: (a: string) => void
}

export const Actions = ({ onAnoChange, onPeriodoChange, onFiltroChange }: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onFiltroChange(e.target.value);
    };
    
    return(
        <div className="flex flex-col gap-4 items-center justify-between md:flex-row">
            <div className="flex flex-col items-center gap-4 md:flex-row">
                <div className="border-2 border-gray-700 flex items-center rounded-md px-1">
                    <input type="text" onChange={handleInputChange} className="outline-none bg-transparent flex-1 text-gray-950 p-1"/>
                    <IoIosSearch />
                </div>
                <Select onValueChange={onAnoChange}>
                    <SelectTrigger className="max-w-[130px]">
                        <SelectValue placeholder="Ano" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select onValueChange={onPeriodoChange}>
                    <SelectTrigger className="max-w-[130px]">
                        <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="1">1º ano</SelectItem>
                        <SelectItem value="2">2º ano</SelectItem>
                        <SelectItem value="3">3º ano</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button> <AiOutlinePlus /> Adicionar Turma </Button>   
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-xl">Criar Turma</DialogTitle>
                            <div className="h-1 w-full bg-primary"></div>
                        </DialogHeader>

                        <ActionForm setClose={setIsOpen} edit={false}/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
    
}