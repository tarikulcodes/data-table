import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BulkAction, PaginatedData } from '@/types';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { DataTablePagination } from './datatable-pagination';
import DataTableToolbar from './datatable-toolbar';

// Done: Add pagination
// Done: Add sorting
// TODO: Add filtering
// Done: Add search
// TODO: Add Bulk actions
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    paginatedData?: PaginatedData<TData>;
    bulkActions?: BulkAction<TData>[];
}

export function DataTable<TData, TValue>({ columns, data, paginatedData, bulkActions }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        getPaginationRowModel: getPaginationRowModel(),
        manualSorting: true,
    });

    return (
        <div>
            {paginatedData && <DataTableToolbar table={table} paginatedData={paginatedData} className="mb-3" bulkActions={bulkActions} />}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {paginatedData && (
                <div className="mt-4">
                    <DataTablePagination table={table} paginatedData={paginatedData} />
                </div>
            )}
        </div>
    );
}
