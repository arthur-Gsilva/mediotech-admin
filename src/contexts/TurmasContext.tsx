// TurmasContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { fetchTurmas } from '@/data/Turmas'
import { Turma } from '@/types/Turma';


interface TurmasContextData {
    turmas: Turma[];
    fetchTurmas: () => Promise<void>;
}


const TurmasContext = createContext<TurmasContextData | undefined>(undefined);


export const useTurmas = () => {
    const context = useContext(TurmasContext);
    if (!context) {
        throw new Error('useTurmas deve ser usado dentro de um TurmasProvider');
    }
    return context;
};

type Props = {
    children: ReactNode,
    token: string
}

export const TurmasProvider = ({ children, token }: Props) => {
    const [turmas, setTurmas] = useState<Turma[]>([]);

    const loadTurmas = async () => {
        try {
        const turmasData = await fetchTurmas(token);
        setTurmas(turmasData);
        } catch (err) {
        console.error('Erro ao carregar turmas', err);
        }
    };

    useEffect(() => {
        if (token) {
            loadTurmas();
        }
    }, [turmas]);

    return (
        <TurmasContext.Provider value={{ turmas, fetchTurmas: loadTurmas }}>
            {children}
        </TurmasContext.Provider>
    );
};
