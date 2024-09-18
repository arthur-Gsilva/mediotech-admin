import { IoIosSearch, IoMdCheckmark } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Anos } from "@/data/commoboxData/Anos";
import { cn } from "@/lib/utils";

type Props = {
    value: string,
    setValue: (a: string) => void
}

export const Actions = ({ value, setValue }: Props) => {

    const  [open, setOpen] = useState(false)
    

    return(
        <div className="flex flex-col gap-4 items-center justify-between">
            <div className="flex flex-col items-center gap-4">
                <div className="border-2 border-brown flex items-center rounded-md px-1">
                    <input type="text" className="outline-none bg-transparent flex-1 text-gray-950"/>
                    <IoIosSearch />
                </div>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
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
                                    setOpen(false)
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
            </div>
            <div>
                <Button>
                    <AiOutlinePlus /> Adicionar Turma
                </Button>
            </div>
        </div>
    )
    
}