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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { BulkAction, PaginatedData } from '@/types';
import { router } from '@inertiajs/react';
import { Table } from '@tanstack/react-table';
import { ArrowLeftRight, ChevronDown, RotateCcw, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from './ui/button';
import { Input } from './ui/input';

const DataTableToolbar = <TData,>({
    table,
    paginatedData,
    bulkActions = [],
    className,
    activeBulkActions = false,
    bulkDelete,
    resetColumnVisibility,
}: {
    table: Table<TData>;
    paginatedData: PaginatedData<TData>;
    bulkActions?: BulkAction<TData>[];
    className?: string;
    activeBulkActions?: boolean;
    bulkDelete?: {
        route: string;
        title?: string;
        description?: string;
    };
    resetColumnVisibility?: () => void;
}) => {
    const { queryParams } = paginatedData;
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedItemsToDelete, setSelectedItemsToDelete] = useState<TData[]>([]);

    const handleDebouncedSearch = useDebouncedCallback((value: string) => {
        if (value.length > 2 && value !== queryParams.search) {
            router.get(
                route(route().current() ?? ''),
                {
                    ...queryParams,
                    search: value,
                    page: 1,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                },
            );
        } else if (value.length === 0) {
            const updatedQueryParams = { ...queryParams, page: 1 };
            delete updatedQueryParams.search;

            router.get(route(route().current() ?? ''), updatedQueryParams, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            });
        }
    }, 500);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);

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
            });
            setShowDeleteDialog(false);
            setSelectedItemsToDelete([]);
            // Clear table selection
            table.toggleAllPageRowsSelected(false);
        }
    };

    return (
        <>
            <div className={cn('flex items-center justify-between gap-4', className)}>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                <ArrowLeftRight className="size-3.5" /> Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                            {resetColumnVisibility && (
                                <>
                                    <DropdownMenuItem onSelect={() => resetColumnVisibility()} className="text-muted-foreground">
                                        <RotateCcw className="size-4" /> Reset to default
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {activeBulkActions && allBulkActions.length > 0 && (
                        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="capitalize" disabled={selectedRows.length === 0}>
                                    Bulk actions ({selectedRows.length}) <ChevronDown className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48">
                                {allBulkActions.map((action, idx) => (
                                    <DropdownMenuItem
                                        key={idx}
                                        className={action.className}
                                        onSelect={() => {
                                            setDropdownOpen(false); // close dropdown
                                            action.onClick(selectedRows); // open dialog
                                        }}
                                    >
                                        {action.icon && <action.icon className="size-4 text-inherit" />} {action.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="max-w-sm pl-8"
                            defaultValue={queryParams.search ?? ''}
                            onChange={(e) => handleDebouncedSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

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
        </>
    );
};

export default DataTableToolbar;
