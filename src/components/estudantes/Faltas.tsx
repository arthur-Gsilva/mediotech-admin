import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export const Faltas = () => {
    return(
        <div className="mt-4">
           <Table className="w-full px-2">
                <TableHeader >
                    <TableRow className="bg-primary [&>*]:text-white hover:bg-primary">
                        <TableHead className="w-[200px]">Disciplina</TableHead>
                        <TableHead>Jul</TableHead>
                        <TableHead>Ago 2</TableHead>
                        <TableHead>Set</TableHead>
                        <TableHead>Out</TableHead>
                        <TableHead>Nov</TableHead>
                        <TableHead>Dez</TableHead>
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>Matemática</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>8</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Cosmologia</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>8</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Projetos gereciais</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>8</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Controle e Leitura</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>8</TableCell>
                    </TableRow>
                </TableBody>
           </Table>
        </div>
    )
}