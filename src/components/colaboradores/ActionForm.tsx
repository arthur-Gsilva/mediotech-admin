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



const getFormSchema = (edit: boolean) => z.object({
    tipoUser: z.enum(['PROFESSOR', 'CORDENADOR', "ALUNO", 'ADMIN', '']),
    nome: z.string().min(2).max(60),
    email: z.string().email({ message: 'Email inválido' }),
    representante: z.string().optional(),
    contato: z.string(),
    dataNascimento: z.string().length(10),
    senha: edit 
        ? z.string().optional() 
        : z.string().min(6, 'A senha deve conter pelo menos 6 dígitos'),
    genero: z.enum(['Masculino', 'Feminino', ''])
})

type Props = {
    setClose: (a: boolean) => void,
    data?: User | null,
    edit: boolean
}

export const ActionForm = ({ setClose, data, edit }: Props) => {

    const formSchema = getFormSchema(edit);

    const { toast } = useToast()

    const [token, setToken] = useState<string | null>()

    useEffect(() => {
      const authToken = localStorage.getItem('authToken')
      setToken(authToken)
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


    const onSubmit  = async (values: z.infer<typeof formSchema>) => {
        if(!edit){
            console.log(values)
            const response = await fetch('https://agendasenacapi-production.up.railway.app/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  
                },
                body: JSON.stringify({
                    tipoUser: values.tipoUser.toUpperCase(),
                    nomeCompletoUser: values.nome,
                    imailUser: values.email,
                    contatopessoal: values.contato,
                    senhaAcessoUser: values.senha,
                    dataNascimentoUser: values.dataNascimento,
                    nomecontatoumergencia: 'SEM',
                    numerourgencia: 'SEM',
                    generoUser: values.genero,
                    
                }),
              });

              if(!response.ok){
                toast({
                    title: 'Erro ao cadastrar Usuário',
                    description: `${response.json()}`,
                    variant: 'destructive'
                  })
              } else{
                toast({
                    title: 'Colaborador adicionado',
                    description: `${values.nome} adicionado ao sistema`
                  })
              }
              
              
        } else{
            console.log(values)
            const response = await fetch(`https://agendasenacapi-production.up.railway.app/user/${data?.codigo}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    tipoUser: values.tipoUser.toUpperCase(),
                    nomeCompletoUser: values.nome,
                    imailUser: values.email,
                    contatopessoal: values.contato,
                    dataNascimentoUser: values.dataNascimento,
                    nomecontatoumergencia: 'SEM',
                    numerourgencia: 'SEM',
                    generoUser: values.genero,
                    turma: {
                        idturma: null
                    }
                }),
              });

              if(!response.ok){
                toast({
                    title: 'Erro ao Editar Usuário',
                    description: `${response.json()}`,
                    variant: 'destructive'
                  })
              } else{
                toast({
                    title: 'Colaborador Editado',
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
                                        <SelectItem value="CORDENADOR">Coordenador</SelectItem>
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