import { IoIosSearch } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ActionForm } from "./ActionForm";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
    onTurnoChange: (a: string) => void,
    onCursoChange: (a: string) => void,
    onFiltroChange: (a: string) => void
}

export const Actions = ({ onTurnoChange, onCursoChange, onFiltroChange }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onFiltroChange(e.target.value);
    };

    return(
        <div className="flex flex-col gap-4 items-center justify-between md:flex-row">
            <div className="flex flex-col items-center gap-4 md:flex-row">
                <div className="border-2 border-gray-700 flex items-center rounded-md px-1">
                    <input type="text" onChange={handleInputChange} className="outline-none p-1 bg-transparent flex-1 text-gray-950"/>
                    <IoIosSearch />
                </div>
                <Select onValueChange={onCursoChange}>
                    <SelectTrigger className="max-w-[130px]">
                        <SelectValue placeholder="Curso" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Analise e Desenvolvimento de Sistemas">ADS</SelectItem>
                        <SelectItem value="logistica">Logistica</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select onValueChange={onTurnoChange}>
                    <SelectTrigger className="max-w-[130px]">
                        <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="manhã">Manhã</SelectItem>
                        <SelectItem value="tarde">Tarde</SelectItem>
                        <SelectItem value="noite">Noite</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button> <AiOutlinePlus /> Adicionar Aluno </Button>   
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Criar Aluno</DialogTitle>
                            <div className="h-1 w-full bg-primary"></div>
                        </DialogHeader>

                        <ActionForm setClose={setIsOpen} edit={false}/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
    
}