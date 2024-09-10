'use client'

import { VscGraph } from "react-icons/vsc";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { PiShirtFoldedFill } from "react-icons/pi";
import { HiOutlineSpeakerphone } from "react-icons/hi";

import { usePathname, useRouter } from "next/navigation";

export const Navbar = () => {

    const pathname = usePathname()
    const router = useRouter()

    return(
        <div className="bg-primary w-auto min-h-screen text-white p-5">
            <div className="mb-10 text-2xl pl-2">
                Senac
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