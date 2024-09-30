import { IoIosSearch, IoMdCheckmark } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Anos } from "@/data/commoboxData/Anos";
import { cn } from "@/lib/utils";
import { Periodo } from "@/data/commoboxData/Periodo";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ActionForm } from "./ActionForm";

type Props = {
    value: string,
    setValue: (a: string) => void
}

export const Actions = ({ value, setValue }: Props) => {

    const  [openAno, setOpenAno] = useState(false)
    const  [openPeriodo, setOpenPeriodo] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    

    return(
        <div className="flex flex-col gap-4 items-center justify-between md:flex-row">
            <div className="flex flex-col items-center gap-4 md:flex-row">
                <div className="border-2 border-gray-700 flex items-center rounded-md px-1">
                    <input type="text" className="outline-none bg-transparent flex-1 text-gray-950"/>
                    <IoIosSearch />
                </div>
                <Popover open={openAno} onOpenChange={setOpenAno}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openAno}
                        className="w-[100px] justify-between"
                        >
                        {value
                            ? Anos.find((ano) => ano.value === value)?.label
                            : "Ano"}
                        <FaChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[100px] p-0">
                        <Command>
                        
                        <CommandList>
                            <CommandGroup>
                            {Anos.map((ano) => (
                                <CommandItem
                                key={ano.value}
                                value={ano.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpenAno(false)
                                }}
                                >
                                <IoMdCheckmark
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    value === ano.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {ano.label}
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <Popover open={openPeriodo} onOpenChange={setOpenPeriodo}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openPeriodo}
                        className="w-[100px] justify-between"
                        >
                        {value
                            ? Periodo.find((per) => per.value === value)?.label
                            : "Período"}
                        <FaChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[100px] p-0">
                        <Command>
                        
                        <CommandList>
                            <CommandGroup>
                            {Periodo.map((per) => (
                                <CommandItem
                                key={per.value}
                                value={per.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpenPeriodo(false)
                                }}
                                >
                                <IoMdCheckmark
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    value === per.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {per.label}
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger>
                        <Button> <AiOutlinePlus /> Adicionar Turma </Button>   
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-xl">Criar Turma</DialogTitle>
                            <div className="h-1 w-full bg-primary"></div>
                        </DialogHeader>

                        <ActionForm setClose={setIsOpen}/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
    
}