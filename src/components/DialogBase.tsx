import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ActionForm as EstudanteForm} from "./estudantes/ActionForm";
import { User } from "@/types/Estudante";
import { ActionForm as ColaboradorForm } from "./colaboradores/ActionForm";
import { ActionForm as ComunicadoForm } from "./comunicados/ActionForm";
import { Comunicado } from "@/types/Comunicado";

type Props = {
    isOpen: boolean,
    setIsOpen: (a: boolean) => void,
    title: string,
    tipo: 'COLABORADOR' | 'ALUNO' | 'COMUNICADO',
    data?:  User | null,
    comuniData?: Comunicado | null
}

export const DialogBase = ({ isOpen, setIsOpen, data, title, tipo, comuniData }: Props) => {
    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="my-5">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <div className="h-1 w-full bg-primary"></div>
                </DialogHeader>

                {tipo === 'COLABORADOR' && 
                    <ColaboradorForm setClose={setIsOpen} data={data} edit={true}/>
                }
                {tipo === 'ALUNO' && 
                    <>
                        <EstudanteForm setClose={setIsOpen} data={data} edit={true}/>
                    </>
                }
                {tipo === 'COMUNICADO' && 
                    <>
                        <ComunicadoForm setClose={setIsOpen}  data={comuniData} edit={true}/>
                    </>
                }
                
            </DialogContent>
        </Dialog>
    )
}