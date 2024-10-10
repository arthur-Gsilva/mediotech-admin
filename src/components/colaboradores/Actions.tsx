import { IoIosSearch } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

import { ActionForm } from "./ActionForm";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
    onTurnoChange: (a: string) => void,
    onCargoChange: (a: string) => void,
    onFiltroChange: (a: string) => void
}

export const Actions = ({ onTurnoChange, onCargoChange, onFiltroChange }: Props) => {

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
                <Select onValueChange={onCargoChange}>
                    <SelectTrigger className="max-w-[130px]">
                        <SelectValue placeholder="Cargo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="professor">Professor</SelectItem>
                        <SelectItem value="cordenador">Coordenador</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select onValueChange={onTurnoChange}>
                    <SelectTrigger className="max-w-[130px]">
                        <SelectValue placeholder="Turno" />
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
                        <Button> <AiOutlinePlus /> Adicionar Colaborador </Button>   
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Criar Colaborador</DialogTitle>
                            <div className="h-1 w-full bg-primary"></div>
                        </DialogHeader>

                        <ActionForm setClose={setIsOpen} edit={false}/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
    
}