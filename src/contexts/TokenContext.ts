import { createContext } from "react";

type TokenContextType = {
    token: string,
    setToken: (a: string) => void
}

export const TokenContext = createContext<TokenContextType | null>(null)