import { createContext } from "react";

type MenuContextType = {
    menu: boolean,
    setMenu: (a: boolean) => void
}

export const MenuContext = createContext<MenuContextType | null>(null)