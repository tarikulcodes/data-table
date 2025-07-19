import { DataTable } from '@/components/datatable';
import SectionHeader from '@/components/section-header';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PaginatedData, User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Plus, Trash } from 'lucide-react';

const ROLE_COLORS = {
    admin: 'border-blue-500 text-blue-500 ',
    manager: 'border-green-500 text-green-500 ',
    user: 'border-gray-500 text-gray-500 ',
};

const UsersIndex = ({ usersData }: { usersData: PaginatedData<User> }) => {
    const handleDeleteUser = (userId: number) => {
        router.delete(route('users.destroy', userId));
    };

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
            accessorKey: 'role',
            header: 'Role',
            enable_sorting: true,
            cell: ({ row }) => {
                return (
                    <Badge variant="outline" className={`capitalize ${ROLE_COLORS[row.original.role as keyof typeof ROLE_COLORS]}`}>
                        {row.original.role}
                    </Badge>
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
                        <Button variant="ghost" size="icon" className="size-8 text-blue-500" asChild>
                            <Link href={route('users.show', row.original.id)}>
                                <Eye className="size-4" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8 text-green-500" asChild>
                            <Link href={route('users.edit', row.original.id)}>
                                <Pencil className="size-4" />
                            </Link>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="size-8 text-red-500">
                                    <Trash className="size-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the user "{row.original.name}" and remove their
                                        data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteUser(row.original.id)} className="bg-red-600 hover:bg-red-700">
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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

            <SectionHeader
                title="Users"
                actions={
                    <Button variant="outline" asChild>
                        <Link href={route('users.create')}>
                            <Plus className="size-4" />
                            Add User
                        </Link>
                    </Button>
                }
            />

            {/* <pre>{JSON.stringify(usersData, null, 2)}</pre> */}

            <DataTable
                columns={columns}
                data={usersData.data}
                paginatedData={usersData}
                activeBulkActions={true}
                bulkDelete={{
                    route: route('users.bulk-delete'),
                }}
                tableKey="users-table"
            />
        </AppLayout>
    );
};

export default UsersIndex;
