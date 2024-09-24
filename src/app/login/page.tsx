"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {  useRouter } from "next/navigation";
import { useState } from "react"

const formSchema = z.object({
    userEmail: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(6, 'A senha tem no minimo 8 digitos')
})

const Page = () => {

    const router = useRouter()
    const [error, setError] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          userEmail: "",
          password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setError('');  // Reseta erros anteriores

        try {
            const response = await fetch('https://agendasenacapi-production.up.railway.app/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                userEmail: values.userEmail,
                userSenha: values.password,
                }),
        });

        if (!response.ok) {
            throw new Error('Erro no login');
        }

        const result = await response.json();
        
        // Salva o token de autenticação no localStorage
        localStorage.setItem('authToken', result.token);

        // Redireciona para o Dashboard ou página protegida
        router.push('/dashboards');
        } catch (err) {
            setError('Email ou senha incorretos. Tente novamente.');
        }
    }

    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="flex bg-slate-100 justify-center items-center h-[450px] w-[60%] rounded-lg shadow-xl">
                <div className="bg-primary flex justify-center items-center flex-1 h-full rounded-l-lg py-5 px-10">
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
                                        <Input placeholder="senha" type="password" {...field} className="rounded-full bg-gray-300"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            {error && <p>{error}</p>}
                            <div className="text-center">
                                <Button type="submit" variant='secondary' className="font-bold text-center">Entrar</Button>
                            </div>
                            
                        </form>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default Page