import { DataTable } from '@/components/datatable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PaginatedData, User } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';

const UsersIndex = ({ usersData }: { usersData: PaginatedData<User> }) => {
    const columns: ColumnDef<User>[] = [
        {
            header: '#ID',
            accessorKey: 'id',
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
            header: 'Name',
            accessorKey: 'name',
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
            header: 'Created At',
            accessorKey: 'created_at',
        },
        {
            header: 'Updated At',
            accessorKey: 'updated_at',
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

            <DataTable columns={columns} data={usersData.data} paginatedData={usersData} />
        </AppLayout>
    );
};

export default UsersIndex;
