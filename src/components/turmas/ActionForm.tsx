import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const formSchema = z.object({
    nome: z.string().min(2).max(60),
    representante: z.string().optional(),
    turno: z.enum(["manhã", "tarde"]),
    curso: z.enum(["Desenvolvimento de sistemas", "Logística"]),
    periodo: z.enum(["1º ano", "2º ano", "3º ano"]),
    ano: z.string(),
    detalhes: z.string().min(2, 'Digite algo aqui')
})

type Props = {
    setClose: (a: boolean) => void
}

export const ActionForm = ({ setClose }: Props) => {

    const token = localStorage.getItem('authToken')


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          nome: "",
          representante: ''
        },
    })

    const  onSubmit  = async (values: z.infer<typeof formSchema>) => {
        const response = await fetch('https://agendasenacapi-production.up.railway.app/turmas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              curso: {
                idcursos: 1,  
              },
              periodo: Number(values.periodo[0]) ,
              anno: Number(values.ano),
              turno: values.turno.toUpperCase(),
              nomeTurma: values.nome,
              datalhesTurma: values.detalhes,
            }),
          });

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
                                    <SelectItem value="manhã">Manhã</SelectItem>
                                    <SelectItem value="tarde">Tarde</SelectItem>
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
                                        <SelectItem value="Desenvolvimento de sistemas">Desenvolvimento de Sistemas</SelectItem>
                                        <SelectItem value="Logística">Logística</SelectItem>
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
                                        <SelectItem value="1º ano">1º Ano</SelectItem>
                                        <SelectItem value="2º ano">2º Ano</SelectItem>
                                        <SelectItem value="3º ano">3º Ano</SelectItem>
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
                    
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}