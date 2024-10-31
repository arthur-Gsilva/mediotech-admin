import { Disciplina } from "@/types/Disciplina"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { User } from "@/types/Estudante"
import { createDisciplina, editDisciplina, excludeDisciplina, getColaboradores, getTurmas } from "@/utils/api"
import { Turma } from "@/types/Turma"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"


const formSchema = z.object({
    nome: z.string().min(2).max(60),
    cargaHoraria: z.string().min(2, 'Essa disciplina precisa atingir horário mínimo').max(3, 'Essa disciplina não pode exercer tantas horas'),
    detalhes: z.string(),
    professor: z.string(),
    turma: z.string()
})

export type DisciFormValues = z.infer<typeof formSchema>

type Props = {
    setClose: (a: boolean) => void,
    edit: boolean,
    data?: Disciplina
}


export const ActionForm = ({ setClose, edit, data }: Props) => {

    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if(typeof window !== "undefined"){
            setToken(window.localStorage.getItem('authToken'))
        }
    }, [])

    const { toast } = useToast()

    const { data: colaboradores } = useQuery<User[]>({
        queryKey: ['colaboradores', token],
        queryFn: getColaboradores,
        enabled: !!token
    })

    const { data: turmas } = useQuery<Turma[]>({
        queryKey: ['turmas', token],
        queryFn: getTurmas,
        enabled: !!token,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          nome: data?.nomeDaDisciplina || '',
          detalhes: data?.detalhesAdicionais || '',
          cargaHoraria: data?.cargaHoraria || '',
          professor: data?.provessorid.toString() || '',
          turma: data?.idturma.toString() || ''
        },
    })

    const queryClient = useQueryClient();
    
    const addMutation = useMutation({
        mutationFn: createDisciplina,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['disciplinas', token]
            })
        }
    })
    const editMutation = useMutation({
        mutationFn: editDisciplina,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['disciplinas', token]
            })
        }
    })
    const deleteMutation = useMutation({
        mutationFn: excludeDisciplina,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['disciplinas', token]
            })
        }
    })

    const deleteDisciplina = async (id: number) => {
        await deleteMutation.mutateAsync(id)
        setClose(false)
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const valuesEdit = {
            id: data?.idDisciplina as number,
            values
        }
        try {
            if (edit) {
                await editMutation.mutateAsync(valuesEdit);
                toast({ title: "Sucesso", description: "Disciplina editada com sucesso.", className: "bg-green-500 text-white" });
            } else {
                await addMutation.mutateAsync(values);
                toast({ title: "Sucesso", description: "Disciplina criada com sucesso.", className: "bg-green-500 text-white" });
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
                                <Input placeholder="Nome da Disciplina" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    
                    <FormField
                        control={form.control}
                        name="detalhes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Detalhes</FormLabel>
                                <FormControl>
                                    <Input placeholder="Detalhes da disciplina" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                    />
                        

                    <FormField
                        control={form.control}
                        name="cargaHoraria"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Carga Horária</FormLabel>
                            <FormControl>
                                <Input placeholder="carga horária" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="professor"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Professor</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o professor" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {colaboradores?.map((colaborador, index) => (
                                            <SelectItem key={index} value={colaborador.codigo.toString()}>
                                                {colaborador.nomeCompletoUser} {/* Exibe o nome */}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="turma"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Turma</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a turma" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {turmas?.map((turma, index) => (
                                            <SelectItem key={index} value={turma.idturma.toString()}>
                                                {turma.nomeTurma} 
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex justify-between">
                        <Button type="submit">Enviar</Button>
                        
                        
                    </div>
                    
                </form>
            </Form>
            {edit &&
                <Button variant="destructive" onClick={() => deleteDisciplina(data?.idDisciplina as number)}>Excluir</Button>
            }
        </div>
    )
}