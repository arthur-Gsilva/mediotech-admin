import { IoIosSearch, IoMdCheckmark } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa6";
import { ChangeEvent, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ActionForm } from "./ActionForm";

type Props = {
    onTipoChange: (a: string) => void,
    onFiltroChange: (a: string) => void,
}

export const Actions = ({ onTipoChange, onFiltroChange }: Props) => {

    const  [openAno, setOpenAno] = useState(false)
    const  [openPeriodo, setOpenPeriodo] = useState(false)
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
                <Select onValueChange={onTipoChange}>
                    <SelectTrigger className="max-w-[130px]">
                        <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="informativo">Informativo</SelectItem>
                        <SelectItem value="evento">Evento</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button> <AiOutlinePlus /> Adicionar Comunicado </Button>   
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Criar Comunicado</DialogTitle>
                            <div className="h-1 w-full bg-primary"></div>
                        </DialogHeader>

                        <ActionForm setClose={setIsOpen} edit={false}/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
    
}