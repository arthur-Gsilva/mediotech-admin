'use client'

import { AiOutlineMenu } from "react-icons/ai";

import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "@/contexts/MenuContext";
import { AiOutlineBell } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";

export const Header = () => {

    const pathname = usePathname()
    const menuCtx = useContext(MenuContext)
    const [nomeUser, setNomeUser] = useState<string | null>()
    const [tipoUser, setTipoUser] = useState<string | null>()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const username = window.localStorage.getItem('username');
            const tipoUser = window.localStorage.getItem('tipoUser');
            setNomeUser(username);
            setTipoUser(tipoUser)
        }
    }, []); 

    return(
        <div className="bg-slate-300 w-full h-14 flex justify-center items-center  mb-6 relative">
            <div className="absolute top-[18px] left-3 text-xl cursor-pointer md:hidden">
                <AiOutlineMenu onClick={() => menuCtx?.setMenu(true)}/>
            </div>
                
            <div className="flex text-black items-center w-full justify-end">
                
                <div className="bg-white p-2 rounded-full text-xl cursor-pointer mr-3">
                    <AiOutlineBell />
                </div>
                <div className="bg-white p-2 rounded-full text-xl cursor-pointer mr-5">
                    <MdOutlineMessage />
                </div>
                
                <div className="text-center mr-3 bg-slate-400 p-1">
                    <div>{nomeUser}</div>
                    <div className="bg-white h-[2px] w-full"></div>
                    <div>{tipoUser}</div>
                </div>
                <div className="mr-3">
                    <SlOptionsVertical />
                </div>
                
            </div>
            
        </div>
    )
}