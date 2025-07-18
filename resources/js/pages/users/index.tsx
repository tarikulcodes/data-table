import AppLayout from '@/layouts/app-layout';

const UsersIndex = () => {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Home', href: '/' },
                { title: 'Users', href: '/users' },
            ]}
        >
            UsersIndex
        </AppLayout>
    );
};

export default UsersIndex;
