"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {  useRouter } from "next/navigation";
import { useEffect, useState } from "react"


type User = {
    Token: string,
    TipoUser: string,
    NomeUsuario: string,
    IdUser: string
  }

const formSchema = z.object({
    userEmail: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(6, 'A senha tem no minimo 8 digitos')
})

const Page = () => {

    const router = useRouter()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          userEmail: "",
          password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setError('');
        setLoading(true)
        try {
            const response = await fetch('https://agendasenacapi-production.up.railway.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: values.userEmail.toLowerCase(),
                    userSenha: values.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro no login');
            }

            const result = await response.json();

            setUserData(result);
            
           
        } catch (err) {
            setError('Email ou senha incorretos. Tente novamente.');
        }

        setLoading(false)
    };

    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        if (userData) {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('username', userData.NomeUsuario);
                window.localStorage.setItem('tipoUser', userData.TipoUser);
                window.localStorage.setItem('authToken', userData.Token);
                window.localStorage.setItem('idUser', userData.IdUser);

                if (userData.TipoUser === 'PROFESSOR') {
                    router.push('/turmas');
                } else {
                    router.push('/paineis');
                }
                
            }
        }
    }, [userData, router]);

    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="flex bg-slate-100 justify-center items-center h-[450px] w-[60%] rounded-lg shadow-xl">
                <div className="bg-primary justify-center items-center flex-1 h-full rounded-l-lg py-5 px-10 hidden md:flex">
                    <img src="/logo.png" alt="logo do senac" className="h-auto w-48"/>
                </div>

                <div className="flex flex-1 flex-col  py-10 px-10">
                    <div className="self-start mb-5">
                        <h2 className="text-2xl font-bold">Entrar</h2>
                        <p className="text-sm">Acesse sua conta por aqui</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                            <FormField
                                control={form.control}
                                name="userEmail"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Usuário</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Usuário" {...field} className="rounded-full bg-gray-300"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Senha</FormLabel>
                                    <FormControl>
                                        <div>
                                            <Input placeholder="senha" type="password" {...field} className="rounded-full bg-gray-300"/>
                                            <Button className="text-right" variant="link">Esqueceu a senha</Button>
                                        </div>
                                        
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            

                            {error && <p className="text-center text-red-600">{error}</p>}
                            <div className="text-center">
                                <Button type="submit" disabled={loading} className="font-bold text-center">
                                    {loading && 
                                        <>
                                            carregando...
                                        </>
                                    }
                                    {!loading && 
                                        <>
                                            Entrar
                                        </>
                                    }
                                </Button>
                            </div>

                            
                            
                        </form>
                    </Form>

                    
                </div>
            </div>

        </div>
    )
}

export default Page