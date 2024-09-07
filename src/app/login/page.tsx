"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8, 'A senha tem no minimo 8 digitos')
})

const Page = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

    return(
        <div className="h-screen w-screen flex">
            <div className=" flex-1 flex justify-center items-center bg-slate-5">
                <div className="bg-primary rounded-lg min-w-[40%] pb-20">
                    <div className="w-full bg-secondary flex items-center justify-center my-4">
                        <img src="/logo.png" alt="logo do Senac" className="h-auto w-32 p-0"/>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  w-full px-5 text-center">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white text-lg">Usuário</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Usuário" {...field} className="min-w-[250px]"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                <FormItem className="text-center">
                                    <FormLabel className="text-lg text-white">Senha</FormLabel>
                                    <FormControl>
                                        <Input placeholder="senha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit" variant='secondary' className="font-bold">Entrar</Button>
                        </form>
                    </Form>
                    
                </div>
            </div>

            <div className=" flex-1 bg-right-top bg-cover  bg-[url(/login.png)]">

            </div>
        </div>
    )
}

export default Page