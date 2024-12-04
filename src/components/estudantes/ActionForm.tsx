import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Turma } from "@/types/Turma";
import { createEstudante, editEstudante } from "@/utils/api/user";
import { getTurmas } from "@/utils/api/turma";
import { User } from "@/types/Estudante";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";


const formSchema = z.object({
    nome: z.string().min(2).max(60),
    email: z.string().email({ message: 'Email inválido' }),
    contato: z.string(),
    dataNascimento: z.string().length(10),
    senha: z.string().min(6, 'A senha deve conter pelo menos 6 dígitos'),
    turma: z.number(),
    genero: z.enum(['Masculino', 'Feminino', ''])
})

export type UserFormValues = z.infer<typeof formSchema> 

type Props = {
    setClose: (a: boolean) => void,
    data?: User | null,
    edit: boolean
}

export const ActionForm = ({ setClose, data, edit }: Props) => {

    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if(typeof window !== "undefined"){
            setToken(window.localStorage.getItem('authToken'))
        }
    }, [])

    const {toast} = useToast()

    const { data: turmas} = useQuery<Turma[]>({
        queryKey: [],
        queryFn: getTurmas,
        enabled: !!token
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: data?.nomeCompletoUser || "",
            contato: data?.contatopessoal?.toString() || "",  
            dataNascimento: data?.dataNascimentoUser || "",
            turma: data?.turma?.idturma || 0, 
            genero: data?.generoUser || "",
            email: data?.imailUser || "",
            senha: ""
        },
    })

    const queryClient = useQueryClient();
    
    const addMutation = useMutation({
        mutationFn: createEstudante,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['alunos', token]
            })
        }
    })
    const editMutation = useMutation({
        mutationFn: editEstudante,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['alunos', token]
            })
        }
    })

    const onSubmit = async (values: UserFormValues) => {
        const valuesEdit = {
            id: data?.codigo as number,
            values
        }
        try {
            if (edit) {
                await editMutation.mutateAsync(valuesEdit);
                toast({ title: "Sucesso", description: "Aluno editado com sucesso.", className: "bg-green-500 text-white" });
            } else {
                await addMutation.mutateAsync(values);
                toast({ title: "Sucesso", description: "Aluno criado com sucesso.", className: "bg-green-500 text-white" });
            }

            setClose(false)
            } catch (error) {
            toast({ title: "Erro", description: "Falha ao salvar as alterações.", variant: "destructive" });
            }
        };


      return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome do aluno" {...field} />
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
                                <Input placeholder="Email do Aluno" {...field} />
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
                                        <Input type="number" placeholder="Número do Aluno" {...field} />
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
                        <FormField
                            control={form.control}
                            name="senha"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha de acesso</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Senha do Aluno" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-2 [&>*]:flex-1">
                        <FormField
                            control={form.control}
                            name="turma"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Turma</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value ? field.value.toString() : ''}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a turma" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {turmas?.map((turma, index) => {
                                        const turmaId = turma?.idturma?.toString() || `nenhuma-${index}`;
                                            return (
                                                <SelectItem key={turmaId} value={turmaId}>
                                                    {turma.nomeTurma}
                                                </SelectItem>
                                            );
                                        })}

                                        </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
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
      )
}