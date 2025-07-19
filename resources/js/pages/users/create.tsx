import InputError from '@/components/input-error';
import SectionHeader from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { faker } from '@faker-js/faker';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Bot, Loader2 } from 'lucide-react';

const UsersCreate = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user' as 'admin' | 'manager' | 'user',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('users.store'));
    };

    const handleFakeFill = () => {
        const password = faker.internet.password();
        setData('name', faker.person.fullName());
        setData('email', faker.internet.email());
        setData('password', password);
        setData('password_confirmation', password);
        setData('role', faker.helpers.arrayElement(['admin', 'manager', 'user']));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Home', href: '/' },
                { title: 'Users', href: '/users' },
                { title: 'Create', href: '/users/create' },
            ]}
        >
            <Head title="Create User" />

            <SectionHeader
                title="Create User"
                actions={
                    <Button variant="outline" asChild>
                        <Link href={route('users.index')}>
                            <ArrowLeft className="size-4" />
                            Back to Users
                        </Link>
                    </Button>
                }
            />
            <div className="w-full max-w-4xl">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardDescription>Create a new user with the following details.</CardDescription>
                        <Button variant="outline" type="button" size="sm" onClick={handleFakeFill}>
                            <Bot className="size-4" />
                            Fake Fill
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="grid gap-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid gap-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="grid gap-1">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="grid gap-1">
                                        <Label htmlFor="password_confirmation">Password Confirmation</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>

                                <div className="grid gap-1">
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        value={data.role}
                                        onValueChange={(value) => setData('role', value as 'admin' | 'manager' | 'user')}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="manager">Manager</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role} />
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <Button variant="ghost" type="button" disabled={processing} asChild>
                                        <Link href={route('users.index')}>Cancel</Link>
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => reset()}>
                                        Reset
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? <Loader2 className="size-4 animate-spin" /> : 'Create'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default UsersCreate;
