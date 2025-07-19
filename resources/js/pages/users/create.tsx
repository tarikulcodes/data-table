import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const UsersCreate = () => {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Home', href: '/' },
                { title: 'Users', href: '/users' },
                { title: 'Create', href: '/users/create' },
            ]}
        >
            <Head title="Create User" />

            <div className="mb-2 flex flex-row justify-between gap-2">
                <h2 className="text-2xl font-bold">Create User</h2>
            </div>
        </AppLayout>
    );
};

export default UsersCreate;
