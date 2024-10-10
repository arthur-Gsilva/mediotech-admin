import { IoIosSearch } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ActionForm } from "./ActionForm";

type Props = {
    onFiltroChange: (a: string) => void
}

export const Actions = ({ onFiltroChange }: Props) => {

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
                
            </div>
            <div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button> <AiOutlinePlus /> Adicionar Disciplina </Button>   
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-xl">Criar Disciplina</DialogTitle>
                            <div className="h-1 w-full bg-primary"></div>
                        </DialogHeader>

                        <ActionForm setClose={setIsOpen} edit={false}/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
    
}