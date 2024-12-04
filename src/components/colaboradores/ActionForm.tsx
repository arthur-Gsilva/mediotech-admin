import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { User } from "@/types/Estudante";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createColaborador, editColaborador } from "@/utils/api";



const formSchema = z.object({
    tipoUser: z.enum(['PROFESSOR', 'COORDENADOR', "ALUNO", 'ADMIN', '']),
    nome: z.string().min(2).max(60),
    email: z.string().email({ message: 'Email inválido' }),
    representante: z.string().optional(),
    contato: z.string(),
    dataNascimento: z.string().length(10),
    senha: z.string().min(6, 'A senha deve conter pelo menos 6 dígitos'),
    genero: z.enum(['Masculino', 'Feminino', ''])
})

export type ColaFormValues = z.infer<typeof formSchema> 

type Props = {
    setClose: (a: boolean) => void,
    data?: User | null,
    edit: boolean
}

export const ActionForm = ({ setClose, data, edit }: Props) => {

    const { toast } = useToast()

    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if(typeof window !== "undefined"){
            setToken(window.localStorage.getItem('authToken'))
        }
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: data?.nomeCompletoUser || "",
            contato: data?.contatopessoal?.toString() || "",  
            dataNascimento: data?.dataNascimentoUser || "",
            tipoUser: data?.tipoUser || "",
            genero: data?.generoUser || "",
            email: data?.imailUser || "",
            senha: ""
        },
    })

    const queryClient = useQueryClient();
    
    const addMutation = useMutation({
        mutationFn: createColaborador,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['colaboradores', token]
            })
        }
    })
    const editMutation = useMutation({
        mutationFn: editColaborador,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['colaboradores', token]
            })
        }
    })


    const onSubmit  = async (values: z.infer<typeof formSchema>) => {
        const valuesEdit = {
            id: data?.codigo as number,
            values
        }
        try {
            if (edit) {
                await editMutation.mutateAsync(valuesEdit);
                toast({ title: "Sucesso", description: "Colaborador editado com sucesso.", className: "bg-green-500 text-white" });
            } else {
                await addMutation.mutateAsync(values);
                toast({ title: "Sucesso", description: "Colaborador criado com sucesso.", className: "bg-green-500 text-white" });
            }

            setClose(false)
            } catch (error) {
            toast({ title: "Erro", description: "Falha ao salvar as alterações.", variant: "destructive" });
            }
    }

    return(
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome do Colaborador" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                            control={form.control}
                            name="tipoUser"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cargo</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Selecione o Cargo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value="COORDENADOR">Coordenador</SelectItem>
                                        <SelectItem value="PROFESSOR">Professor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email do Colaborador" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex gap-2 [&>*]:flex-1">
                        
                        
                        
                        <FormField
                            control={form.control}
                            name="contato"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Número do Colaborador" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-2 [&>*]:flex-1">
                        <FormField
                            control={form.control}
                            name="dataNascimento"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de Nascimento</FormLabel>
                                    <FormControl>
                                        <Input placeholder="00/00/0000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!edit && 
                            <FormField
                            control={form.control}
                            name="senha"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha de acesso</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Senha do colaborador" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        }
                        
                    </div>

                    <div className="flex gap-2 [&>*]:flex-1">
                        
                            <FormField
                                control={form.control}
                                name="genero"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gênero</FormLabel>
                                        <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                            <SelectValue placeholder="Selecione seu Gênero" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem value="Masculino">Masculino</SelectItem>
                                            <SelectItem value="Feminino">Feminino</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                    </div>
                    <Button type="submit">Enviar</Button>
                </form>
            </Form>

            
        </div>
    )
}