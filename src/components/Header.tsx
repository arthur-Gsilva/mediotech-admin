'use client'

import { usePathname } from "next/navigation"

export const Header = () => {

    const pathname = usePathname()

    return(
        <div className="bg-gray-300 w-full h-14 flex justify-center items-center text-xl font-bold capitalize mb-6">
            {pathname.substring(1)} MédioTec Senac 2024
        </div>
    )
}