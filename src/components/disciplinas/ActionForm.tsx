import { Disciplina } from "@/types/Disciplina"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useQuery } from "@tanstack/react-query"
import { User } from "@/types/Estudante"
import { getColaboradores, getTurmas } from "@/utils/api"
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

type Props = {
    setClose: (a: boolean) => void,
    edit: boolean,
    data?: Disciplina
}


export const ActionForm = ({ setClose, edit, data }: Props) => {

    const [token, setToken] = useState<string | null>()

    useEffect(() => {
      const authToken = localStorage.getItem('authToken')
      setToken(authToken)
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

    const deleteDisciplina = async (id: number) => {
        console.log(id)
        const response = await fetch(`https://agendasenacapi-production.up.railway.app/disciplinas/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json'
            }
          });

          response.ok ? console.log('ok') : ''
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if(!edit){
            const response = await fetch(`https://agendasenacapi-production.up.railway.app/disciplinas`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nomeDaDisciplina: values.nome,
                    detalhesAdicionais: values.detalhes,
                    cargaHoraria: values.cargaHoraria,
                    professor: {
                        codigo: Number(values.professor)
                    },
                    turma: {
                        idturma: Number(values.turma)
                    }
                })
            })

            if(!response.ok){
                toast({
                    title: 'Erro ao Criar disciplina',
                    description: `${response.json()}`,
                    variant: 'destructive'
                  })
              } else{
                toast({
                    title: 'disciplina Criada',
                    description: `${values.nome} criada no sistema`
                  })
              }
        } else {
            const response = await fetch(`https://agendasenacapi-production.up.railway.app/disciplinas/${data?.idDisciplina}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nomeDaDisciplina: values.nome,
                    detalhesAdicionais: values.detalhes,
                    cargaHoraria: values.cargaHoraria,
                    professor: {
                        codigo: Number(values.professor)
                    },
                    turma: {
                        idturma: Number(values.turma)
                    }
                })
            })

            if(!response.ok){
                toast({
                    title: 'Erro ao Editar disciplina',
                    description: `${response.json()}`,
                    variant: 'destructive'
                  })
              } else{
                toast({
                    title: 'disciplina Editada',
                    description: `${values.nome} Editado no sistema`
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