import { Skeleton } from "../ui/skeleton"
import { TableBody, TableCell, TableRow } from "../ui/table"

export const TableSkeleton = () => {
    return(
        
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                </TableRow>
                
                <TableRow>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-full h-4 rounded-full" />
                    </TableCell>
                </TableRow>
            </TableBody>
        
    )
}