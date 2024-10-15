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

const formSchema = z.object({
    nome: z.string().min(2).max(60),
    turno: z.enum(["MANHÃ", "TARDE", "Noite"]),
    curso: z.enum(["Medio Tec Analise e Desenvolvimento de Sistema", "Logistica", ""]),
    periodo: z.string(),
    ano: z.string(),
    detalhes: z.string().min(2, 'Digite algo aqui')
})

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

    const deleteTurmas = async (id: number) => {
        const response = await fetch(`https://agendasenacapi-production.up.railway.app/turma/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json'
            }
        });
        response.ok ? console.log('ok') : ''
        setClose(false)
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
            if(!edit){
                const response = await fetch('https://agendasenacapi-production.up.railway.app/turmas', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        curso: {
                            idcursos: values.curso === 'Logistica' ? 1 : 2,  
                          },
                        periodo: values.periodo,
                        anno: Number(values.ano),
                        turno: values.turno.toUpperCase(),
                        nomeTurma: values.nome,
                        datalhesTurma: values.detalhes,
                        }),
                    
                  });

                  if(!response.ok){
                    toast({
                        title: 'Erro ao Criar Turma',
                        description: `${response.json()}`,
                        variant: 'destructive'
                      })
                  } else{
                    toast({
                        title: 'Turma Criada',
                        description: `${values.nome} criada no sistema`
                      })
                  }
            } else{
                console.log(values)
                const response = await fetch(`https://agendasenacapi-production.up.railway.app/turma/${data?.idturma}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      periodo: values.periodo,
                      anno: values.ano,
                      turno: values.turno.toUpperCase(),
                      nomeTurma: values.nome,
                      datalhesTurma: values.detalhes,
                      
                    }),
                  });

                  if(!response.ok){
                    toast({
                        title: 'Erro ao Editar Turma',
                        description: `${response.json()}`,
                        variant: 'destructive'
                      })
                  } else{
                    toast({
                        title: 'Turma editada',
                        description: `${values.nome} editada no sistema`
                      })
                  }
            }
            
            setClose(false)
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
                        <Button type="submit">Submit</Button>
                        {edit &&
                            <Button variant="destructive" onClick={() => deleteTurmas(data?.idturma as number)}>Excluir</Button>
                        }
                        
                    </div>
                    
                </form>
            </Form>
        </div>
    )
}