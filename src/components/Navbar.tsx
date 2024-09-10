'use client'

import { VscGraph } from "react-icons/vsc";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { PiShirtFoldedFill } from "react-icons/pi";
import { HiOutlineSpeakerphone } from "react-icons/hi";

import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { MenuContext } from "@/contexts/MenuContext";

export const Navbar = () => {

    const pathname = usePathname()
    const router = useRouter()

    const menuCtx = useContext(MenuContext)

    return(
        <div className="bg-primary w-auto min-h-screen delay-300 text-white p-5 absolute top-0 bottom-0 left-[-500px] z-10 md:static"
        style={{left: menuCtx?.menu === true ? '0' : ''}}
        
        >
            <div className="mb-10 text-2xl pl-2 flex items-center justify-between">
                Senac <span className="text-red-500 cursor-pointer md:hidden" onClick={() => menuCtx?.setMenu(false)}>X</span>
            </div>


            <nav className="[&>div]:flex [&>div]:gap-4 [&>div]:items-center [&>div]:text-xl [&>div]:cursor-pointer [&>div:hover]:bg-secondary [&>div]:p-2 [&>div]:rounded-full flex flex-col gap-6">

                <div style={{backgroundColor: pathname === '/dashboards' ? '#F6A10A' : ''}} onClick={() => router.push('/dashboards')}>
                    <VscGraph />
                    Dashboards
                </div>
                <div style={{backgroundColor: pathname === '/turmas' ? '#F6A10A' : ''}} onClick={() => router.push('/turmas')}>
                    <HiOutlineUserGroup />
                    Turmas
                </div>
                <div style={{backgroundColor: pathname === '/disciplinas' ? '#F6A10A' : ''}} onClick={() => router.push('/disciplinas')}>
                    <LiaChalkboardTeacherSolid />
                    Disciplinas
                </div>
                <div style={{backgroundColor: pathname === '/estudantes' ? '#F6A10A' : ''}} onClick={() => router.push('/estudantes')}>
                    <PiStudent />
                    Estudantes
                </div>
                <div style={{backgroundColor: pathname === '/professores' ? '#F6A10A' : ''}} onClick={() => router.push('/professores')}>
                    <PiShirtFoldedFill />
                    Professores
                </div>
                <div style={{backgroundColor: pathname === '/comunicados' ? '#F6A10A' : ''}} onClick={() => router.push('/comunicados')}>
                    <HiOutlineSpeakerphone />
                    Comunicados
                </div>
            </nav>
        </div>
    )
}