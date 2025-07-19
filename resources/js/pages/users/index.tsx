import { DataTable } from '@/components/datatable';
import { DataTableColumnHeader } from '@/components/datatable-column-header';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { BulkAction, PaginatedData, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const UsersIndex = ({ usersData }: { usersData: PaginatedData<User> }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedItemsToDelete, setSelectedItemsToDelete] = useState<User[]>([]);

    const columns: ColumnDef<User>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="#ID" queryParams={usersData.queryParams} />,
            cell: ({ row }) => {
                return <div className="">#{row.original.id}</div>;
            },
        },
        {
            header: 'Avatar',
            accessorKey: 'avatar',
            cell: ({ row }) => {
                return (
                    <Avatar className="size-10">
                        <AvatarImage src={row.original.avatar} />
                        <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                );
            },
        },
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name" queryParams={usersData.queryParams} />,
            cell: ({ row }) => {
                return (
                    <div>
                        <h2 className="text-base font-semibold">{row.original.name}</h2>
                        <p className="text-sm text-gray-500">{row.original.email}</p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" queryParams={usersData.queryParams} />,
        },
        {
            accessorKey: 'updated_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Updated At" queryParams={usersData.queryParams} />,
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-0.5" key={row.original.id}>
                        <Button variant="ghost" size="icon" className="size-8 text-blue-500">
                            <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8 text-green-500">
                            <Pencil className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8 text-red-500">
                            <Trash2 className="size-[0.98rem]" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const bulkActions: BulkAction<User>[] = [
        {
            label: 'Delete selected',
            icon: Trash2,
            className: 'text-destructive',
            onClick: (selected) => {
                setSelectedItemsToDelete(selected);
                setShowDeleteDialog(true);
            },
        },
        // Add more actions as needed
    ];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Home', href: '/' },
                { title: 'Users', href: '/users' },
            ]}
        >
            <Head title="Users" />

            <div className="flex flex-row justify-between gap-4">
                <h2 className="text-2xl font-bold">Users</h2>
                <div className="flex flex-row gap-2">
                    <Button variant="outline">
                        <Plus className="size-4" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* <pre>{JSON.stringify(usersData, null, 2)}</pre> */}

            <DataTable columns={columns} data={usersData.data} paginatedData={usersData} bulkActions={bulkActions} />
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent className="max-w-sm lg:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete {selectedItemsToDelete.length} users</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete {selectedItemsToDelete.length} users? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => {
                                router.delete(route('users.bulk-delete'), {
                                    data: {
                                        ids: selectedItemsToDelete.map((item) => item.id),
                                    },
                                    preserveScroll: true,
                                    preserveState: false,
                                });
                                setShowDeleteDialog(false);
                                setSelectedItemsToDelete([]);
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
};

export default UsersIndex;
