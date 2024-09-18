'use client'

import { useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data01 = [
    { name: 'manhã', value: 500 },
    { name: 'tarde', value: 300 },
];
const data02 = [
    { name: 'menino', value: 243 },
    { name: 'menina', value: 197 },
];

const COLORS01 = ['#0077b6', '#92bfe8']
const COLORS02 = ['#054C82', '#F6A10A']

export const MiddleArea = () => {

    const [turno, setTurno] = useState<number | null>(null);
    const [genero, setGenero] = useState<number | null>(null);

    const onTurnoEnter = (data: any, index: number) => {
        setTurno(data.value)
    };

    const onTurnoLeave = () => {
        setTurno(null)
    };

    const onGeneroEnter = (data: any, index: number) => {
        setGenero(data.value)
    };

    const onGeneroLeave = () => {
        setGenero(null)
    };

    return(
        <div className='w-full h-full flex flex-col lg:flex-row relative'>
            
            <div className='relative w-full h-full flex flex-col items-center'>
                <div className='flex items-center gap-2'>
                    <div className='h-3 w-8 rounded-xl bg-[#0077b6]'></div> Manhã
                    <div className='h-3 w-8 rounded-xl bg-[#92bfe8]'></div> Tarde
                </div>


                <div className='w-full h-1/2 relative'>
                    <ResponsiveContainer className='w-full h-full'>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data01}
                                cx="50%"
                                cy="50%"
                                outerRadius={70}
                                innerRadius={50}
                                onMouseLeave={onTurnoLeave}
                            >
                                {data01.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS01[index % COLORS01.length]}
                                        onMouseEnter={() => onTurnoEnter(entry, index)}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    <div className='absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2 font-bold'>
                        {turno !== null ? `${turno}` : "Selecione"}
                    </div>
                </div>

                
            </div>

            <div className='relative w-full h-full flex flex-col-reverse justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <h5 className='text-xl font-bold'>Gêneros</h5>
                    <div className='flex items-center gap-2'><div className='w-4 h-4 bg-primary'></div> Meninos</div>
                    <div className='flex items-center gap-2'><div className='w-4 h-4 bg-secondary'></div> Meninas</div>
                </div>
                
                <div className='w-full h-1/2 relative'>
                    <ResponsiveContainer className='w-full h-full'>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data02}
                                cx="50%"
                                cy="50%"
                                outerRadius={70}
                                innerRadius={50}
                                onMouseLeave={onGeneroLeave}
                            >
                                {data02.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS02[index % COLORS02.length]}
                                        onMouseEnter={() => onGeneroEnter(entry, index)}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    
                    
                    <div className='absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2 font-bold'>
                        {genero !== null ? `${genero}` : "Selecione"}
                    </div>
                </div>
            </div>
        </div>
    )
}