import { Comunicado } from "@/types/Comunicado"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

type Props = {
    isOpen: boolean,
    onClose: (a: boolean) => void,
    data: Comunicado | null
}

export const ComuniModal = ({ isOpen, onClose, data }: Props) => {



    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[80vw] max-w-none">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">{data?.tituloComunicado}</DialogTitle>
                    <div className="h-[2px] w-full bg-primary"></div>
                </DialogHeader>
                <div className='flex flex-col gap-2'>
                    <p>Tipo: {data?.tituloComunicado}</p>
                    <p>Data: xxx</p>
                </div>

                <div className="mt-10">
                    <p>{data?.conteudoComunicado}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}