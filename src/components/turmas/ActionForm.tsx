import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Turma } from "@/types/Turma";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTurma, editTurma, excludeTurma } from "@/utils/api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

const formSchema = z.object({
    nome: z.string().min(2).max(60),
    turno: z.enum(["MANHÃ", "TARDE", "Noite"]),
    curso: z.enum(["Medio Tec Analise e Desenvolvimento de Sistema", "Logistica", ""]),
    periodo: z.string(),
    ano: z.string(),
    detalhes: z.string().min(2, 'Digite algo aqui')
})

export type TurmaFormValues = z.infer<typeof formSchema>;

type Props = {
    setClose: (a: boolean) => void,
    edit: boolean,
    data?: Turma
}

export const ActionForm = ({ setClose, edit, data }: Props) => {

    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if(typeof window !== "undefined"){
            setToken(window.localStorage.getItem('authToken'))
        }
    }, [])

    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          nome: data?.nomeTurma || '',
          turno: data?.turno || 'MANHÃ',
          curso: data?.curso.nomecurso || '',
          periodo: data?.periodo || '',
          ano: data?.anno || '',
          detalhes: data?.detalhesTurma || ''
        },
    })

    
    const queryClient = useQueryClient();
    
    const addMutation = useMutation({
        mutationFn: createTurma,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['turmas', token]
            })
        }
    })
    const editMutation = useMutation({
        mutationFn: editTurma,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['turmas', token]
            })
        }
    })
    const deleteMutation = useMutation({
        mutationFn: excludeTurma,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['turmas', token]
            })
        }
    })

    const deleteTurmas = async (id: number) => {
        await deleteMutation.mutateAsync(id)
        setClose(false)
    }
    
    
    const onSubmit = async (values: TurmaFormValues) => {
        const valuesEdit = {
            id: data?.idturma as number,
            values
        }
        try {
            if (edit) {
                await editMutation.mutateAsync(valuesEdit);
                toast({ title: "Sucesso", description: "Turma editada com sucesso.", className: "bg-green-500 text-white" });
            } else {
                await addMutation.mutateAsync(values);
                toast({ title: "Sucesso", description: "Turma criada com sucesso.", className: "bg-green-500 text-white" });
            }

            setClose(false)
            } catch (error) {
            toast({ title: "Erro", description: "Falha ao salvar as alterações.", variant: "destructive" });
            }
        };

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
                                <Input placeholder="Nome da Turma" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    
                    <FormField
                        control={form.control}
                        name="turno"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Turno</FormLabel>
                                <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Selecione o turno" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="MANHÃ">Manhã</SelectItem>
                                    <SelectItem value="TARDE">Tarde</SelectItem>
                                    </SelectContent>
                                </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                    />
                        

                    <div className="flex gap-2 [&>*]:flex-1">
                        <FormField
                            control={form.control}
                            name="curso"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Curso</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Selecione o curso" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value="Medio Tec Analise e Desenvolvimento de Sistema">Desenvolvimento de Sistemas</SelectItem>
                                        <SelectItem value="Logistica">Logística</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="periodo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Período</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Selecione o período" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value="1">1º Ano</SelectItem>
                                        <SelectItem value="2">2º Ano</SelectItem>
                                        <SelectItem value="3">3º Ano</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="ano"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Ano</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Digite o ano da turma" {...field} />
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
                            <FormLabel>Detalhes da turma</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite detalhes da turma" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex justify-between">
                        <Button type="submit">Enviar</Button>
                        {edit &&
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" >Excluir</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Deseja excluir turma?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Importante ressaltar que essa ação é irreversível, ao clicar em excluir a turma será
                                        excluída permanentemente.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteTurmas(data?.idturma as number)}>Excluir</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        }
                        
                    </div>
                    
                </form>
            </Form>
        </div>
    )
}