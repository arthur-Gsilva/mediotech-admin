import { createContext, ReactNode, useState } from "react";

type ContextType = {
    name: string,
    tipoUser: string,
    token: string,
    setName: (a: string) => void,
    setTipoUser: (a: string) => void,
    setToken: (a: string) => void,
}

export const LoggedUserContext = createContext<ContextType | null>(null)

export const LoggedUserProvider = ({ children }: {children: ReactNode}) => {

    const [name, setName] = useState('')
    const [tipoUser, setTipoUser] = useState('')
    const [token, setToken] = useState('')

    return(
        <LoggedUserContext.Provider value={{name, setName, tipoUser, setTipoUser, token, setToken }}>
            {children}
        </LoggedUserContext.Provider>
    )
}