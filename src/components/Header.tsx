'use client'

import { AiOutlineMenu } from "react-icons/ai";

import { usePathname } from "next/navigation"
import { useContext } from "react";
import { MenuContext } from "@/contexts/MenuContext";

export const Header = () => {

    const pathname = usePathname()
    const menuCtx = useContext(MenuContext)

    return(
        <div className="bg-gray-300 w-full h-14 flex justify-center items-center md:text-xl font-bold capitalize mb-6 relative">
            <div className="absolute top-[18px] left-3 text-xl cursor-pointer md:hidden">
                <AiOutlineMenu onClick={() => menuCtx?.setMenu(true)}/>
            </div>
                {pathname.substring(1)} MédioTec Senac 2024
            
        </div>
    )
}