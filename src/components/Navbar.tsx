'use client'

import { VscGraph } from "react-icons/vsc";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { PiShirtFoldedFill } from "react-icons/pi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BsGear } from "react-icons/bs";
import { RxExit } from "react-icons/rx";

import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { MenuContext } from "@/contexts/MenuContext";

export const Navbar = () => {

    const pathname = usePathname()
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem('authToken');
    
        router.push('/login');
    }

    const menuCtx = useContext(MenuContext)

    const redirect = (path: string) => {
        router.push(`/${path}`)
        menuCtx?.setMenu(false)
    }

    return(
        <div className="bg-primary w-auto min-h-screen delay-300 text-white p-5 absolute top-0 bottom-0 left-[-500px] z-10 md:static"
        style={{left: menuCtx?.menu === true ? '0' : ''}}
        
        >
            <div className="mb-10 text-2xl pl-2 flex items-center justify-between">
                Senac <span className="text-red-500 cursor-pointer md:hidden" onClick={() => menuCtx?.setMenu(false)}>X</span>
            </div>


            <nav className="[&>div]:flex [&>div]:gap-4 [&>div]:items-center [&>div]:text-xl [&>div]:cursor-pointer [&>div:hover]:bg-secondary [&>div]:p-2 [&>div]:rounded-lg flex flex-col gap-6">

                <div style={{backgroundColor: pathname === '/dashboards' ? '#F6A10A' : ''}} onClick={() => redirect('dashboards')}>
                    <VscGraph />
                    Dashboards
                </div>
                <div style={{backgroundColor: pathname === '/turmas' ? '#F6A10A' : ''}} onClick={() => redirect('turmas')}>
                    <HiOutlineUserGroup />
                    Turmas
                </div>
                <div style={{backgroundColor: pathname === '/disciplinas' ? '#F6A10A' : ''}} onClick={() => redirect('disciplinas')}>
                    <LiaChalkboardTeacherSolid />
                    Disciplinas
                </div>
                <div style={{backgroundColor: pathname === '/estudantes' ? '#F6A10A' : ''}} onClick={() => redirect('estudantes')}>
                    <PiStudent />
                    Estudantes
                </div>
                <div style={{backgroundColor: pathname === '/professores' ? '#F6A10A' : ''}} onClick={() => redirect('professores')}>
                    <PiShirtFoldedFill />
                    Professores
                </div>
                <div style={{backgroundColor: pathname === '/comunicados' ? '#F6A10A' : ''}} onClick={() => redirect('comunicados')}>
                    <HiOutlineSpeakerphone />
                    Comunicados
                </div>
            </nav>

            <div className="mt-16">
                <div className="h-1 w-full bg-secondary mb-4"></div>
                <div className="flex gap-4 items-center text-xl cursor-pointer p-2 rounded-lg hover:bg-secondary">
                    <BsGear />
                    Configurações
                </div>
                <div className="flex gap-4 items-center text-xl cursor-pointer p-2 rounded-lg hover:bg-secondary" onClick={() => logout()}>
                    <RxExit />
                    Sair
                </div>
            </div>
        </div>
    )
}