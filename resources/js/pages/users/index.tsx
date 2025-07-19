import { DataTable } from '@/components/datatable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PaginatedData, User } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Plus } from 'lucide-react';

const UsersIndex = ({ usersData }: { usersData: PaginatedData<User> }) => {
    const columns: (ColumnDef<User> & { enable_sorting?: boolean })[] = [
        {
            accessorKey: 'id',
            header: '#ID',
            enable_sorting: true,
            cell: ({ row }) => {
                return <div className="">#{row.original.id}</div>;
            },
        },
        {
            header: 'Avatar',
            accessorKey: 'avatar',
            enable_sorting: false,
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
            header: 'Name',
            enable_sorting: true,
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
            header: 'Created At',
            enable_sorting: true,
        },
        {
            accessorKey: 'updated_at',
            header: 'Updated At',
            enable_sorting: true,
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            enable_sorting: false,
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row gap-0.5" key={row.original.id}>
                        <Button variant="ghost" size="icon" className="size-8 text-blue-500">
                            <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8 text-green-500">
                            <Pencil className="size-4" />
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

            <div className="mb-2 flex flex-row justify-between gap-2">
                <h2 className="text-2xl font-bold">Users</h2>
                <div className="flex flex-row gap-2">
                    <Button variant="outline">
                        <Plus className="size-4" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* <pre>{JSON.stringify(usersData, null, 2)}</pre> */}

            <DataTable
                columns={columns}
                data={usersData.data}
                paginatedData={usersData}
                activeBulkActions={true}
                bulkDelete={{
                    route: route('users.bulk-delete'),
                }}
            />
        </AppLayout>
    );
};

export default UsersIndex;
