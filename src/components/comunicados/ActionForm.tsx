import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea";
import { Comunicado } from "@/types/Comunicado";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";


const formSchema = z.object({
    titulo: z.string().min(2).max(60),
    conteudo: z.string(),
    tipo: z.enum(['INFORMATIVO', 'EVENTO'])
})

type Props = {
    setClose: (a: boolean) => void,
    edit: boolean,
    data?: Comunicado | null,
}

export const ActionForm = ({ setClose, edit, data }: Props) => {

  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
      if(typeof window !== "undefined"){
          setToken(window.localStorage.getItem('authToken'))
      }
  }, [])


    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          titulo: data?.tituloComunicado || '',
          tipo: data?.tipodocomunicado,
          conteudo: data?.conteudoComunicado || '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if(!edit){
            const response = await fetch('https://agendasenacapi-production.up.railway.app/comunicados', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  tituloComunicado: values.titulo,
                  tipodocomunicado: values.tipo,
                  conteudoComunicado: values.conteudo,
                  usersistema: {
                    codigo: "1"
                  }
                }),
              });

              if(!response.ok){
                toast({
                    title: 'Erro ao Criar Comunicado',
                    description: `${response.json()}`,
                    variant: 'destructive'
                  })
              } else{
                toast({
                    title: 'Comunicado Criado',
                    description: `${values.titulo} criado no sistema`
                  })
              }
        } else{
            const response = await fetch(`https://agendasenacapi-production.up.railway.app/comunicados/${data?.idComunicado}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  tituloComunicado: values.titulo,
                  ConteudoComunicado: values.conteudo,
                }),
              });

              if(!response.ok){
                toast({
                    title: 'Erro ao Editar Comunicado',
                    description: `${response.json()}`,
                    variant: 'destructive'
                  })
              } else{
                toast({
                    title: 'Comunicado Editado',
                    description: `${values.titulo} Editado no sistema`
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
                        name="titulo"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Título do Comunicado</FormLabel>
                            <FormControl>
                                <Input placeholder="Título do Comunicado" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    
                    <FormField
                        control={form.control}
                        name="tipo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo</FormLabel>
                                <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo de comunicado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="INFORMATIVO">Informativo</SelectItem>
                                    <SelectItem value="EVENTO">Evento</SelectItem>
                                    </SelectContent>
                                </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                    />

                    <FormField
                    control={form.control}
                    name="conteudo"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Conteúdo</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Conteúdo do comunicado" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                        
                    
                    <Button type="submit">Enviar</Button>
                </form>
            </Form>
        </div>
    )
}