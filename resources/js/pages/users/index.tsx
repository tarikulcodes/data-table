import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PaginatedData, User } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const UsersIndex = ({ usersData }: { usersData: PaginatedData<User> }) => {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Home', href: '/' },
                { title: 'Users', href: '/users' },
            ]}
        >
            <Head title="Users" />

            <div className="mt-6 flex flex-row justify-between gap-4">
                <h2 className="text-2xl font-bold">Users</h2>
                <div className="flex flex-row gap-2">
                    <Button variant="outline">
                        <Plus className="size-4" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* <pre>{JSON.stringify(usersData, null, 2)}</pre> */}
        </AppLayout>
    );
};

export default UsersIndex;
