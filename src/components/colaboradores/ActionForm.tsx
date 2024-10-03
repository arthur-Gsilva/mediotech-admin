import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useQuery } from "@tanstack/react-query";
import { Turma } from "@/types/Turma";
import { getTurmas } from "@/utils/api";

const formSchema = z.object({
    tipoUser: z.enum(['PROFESSOR', 'COORDENADOR']),
    nome: z.string().min(2).max(60),
    email: z.string().email({ message: 'Email inválido' }),
    representante: z.string().optional(),
    contato: z.string(),
    dataNascimento: z.string().length(10),
    senha: z.string().min(6, 'A senha deve conter pelo menos 6 dígitos'),
    turma: z.number(),
    genero: z.enum(['Masculino', 'Feminino'])
})

type Props = {
    setClose: (a: boolean) => void
}

export const ActionForm = ({ setClose }: Props) => {

    const token = localStorage.getItem('authToken')

    const { data: turmas, error, isLoading } = useQuery<Turma[]>({
        queryKey: [],
        queryFn: getTurmas,
        enabled: !!token
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          nome: "",
          representante: '',
          contato: '',
          dataNascimento: '',
          turma: 0
        },
    })

    const tipoUser = form.watch("tipoUser");

    const onSubmit  = async (values: z.infer<typeof formSchema>) => {
        const response = await fetch('https://agendasenacapi-production.up.railway.app/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                tipoUser: values.tipoUser,
                nomeCompletoUser: values.nome,
                imailUser: values.email,
                contatopessoal: Number(values.contato),
                senhaAcessoUser: values.senha,
                dataNascimentoUser: values.dataNascimento,
                nomecontatoumergencia: 'SEM',
                numerourgencia: 'SEM',
                generoUser: values.genero,
                turma: {
                    idturma: Number(values.turma) || null
                }
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
                                <Input placeholder="Nome do aluno" {...field} />
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
                        {tipoUser === 'PROFESSOR' &&
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
                                            {turmas?.map((turma) => (
                                                <SelectItem key={turma.idturma} value={turma.idturma.toString()}>{turma.nomeTurma}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        }
                        
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}