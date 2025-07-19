import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BulkAction, PaginatedData } from '@/types';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DataTablePagination } from './datatable-pagination';
import DataTableToolbar from './datatable-toolbar';

// Done: Add pagination
// Done: Add sorting
// TODO: Add filtering
// Done: Add search
// Done: Add Bulk actions
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    paginatedData?: PaginatedData<TData>;
    bulkActions?: BulkAction<TData>[];
    bulkDelete?: {
        route: string;
        title?: string;
        description?: string;
    };
}

export function DataTable<TData, TValue>({ columns, data, paginatedData, bulkActions = [], bulkDelete }: DataTableProps<TData, TValue>) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedItemsToDelete, setSelectedItemsToDelete] = useState<TData[]>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        getPaginationRowModel: getPaginationRowModel(),
        manualSorting: true,
    });

    // Add built-in delete action if bulkDelete is provided
    const allBulkActions = [...bulkActions];
    if (bulkDelete) {
        allBulkActions.push({
            label: 'Delete selected',
            icon: Trash2,
            className: 'text-destructive',
            onClick: (selected) => {
                setSelectedItemsToDelete(selected);
                setShowDeleteDialog(true);
            },
        });
    }

    const handleBulkDelete = () => {
        if (bulkDelete && selectedItemsToDelete.length > 0) {
            router.delete(bulkDelete.route, {
                data: {
                    ids: selectedItemsToDelete.map((item) => (item as TData & { id: number }).id),
                },
                preserveScroll: true,
                preserveState: false,
            });
            setShowDeleteDialog(false);
            setSelectedItemsToDelete([]);
            // Clear table selection
            table.toggleAllPageRowsSelected(false);
        }
    };

    return (
        <div>
            {paginatedData && <DataTableToolbar table={table} paginatedData={paginatedData} className="mb-3" bulkActions={allBulkActions} />}
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

            {/* Built-in Delete Dialog */}
            {bulkDelete && (
                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogContent className="max-w-sm lg:max-w-md">
                        <AlertDialogHeader>
                            <AlertDialogTitle>{bulkDelete.title || 'Delete selected items'}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {bulkDelete.description || 'Are you sure you want to delete the selected items? This action cannot be undone.'}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleBulkDelete}>
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}
