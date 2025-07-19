import SectionHeader from '@/components/section-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, CheckCircle, Clock, Mail, Pencil, Shield, User as UserIcon, XCircle } from 'lucide-react';

const ROLE_COLORS = {
    admin: 'bg-blue-100 text-blue-800 border-blue-200',
    manager: 'bg-green-100 text-green-800 border-green-200',
    user: 'bg-gray-100 text-gray-800 border-gray-200',
};

const ROLE_ICONS = {
    admin: Shield,
    manager: UserIcon,
    user: UserIcon,
};

const UserShow = ({ user }: { user: User }) => {
    const RoleIcon = ROLE_ICONS[user.role as keyof typeof ROLE_ICONS] || UserIcon;
    const isEmailVerified = user.email_verified_at !== null;

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Home', href: '/' },
                { title: 'Users', href: '/users' },
                { title: user.name, href: `/users/${user.id}` },
            ]}
        >
            <Head title={`${user.name} - User Details`} />

            <SectionHeader
                title="User Details"
                actions={
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route('users.index')}>
                                <ArrowLeft className="size-4" />
                                Back to Users
                            </Link>
                        </Button>
                        <Button variant="default" asChild>
                            <Link href={route('users.edit', user.id)}>
                                <Pencil className="size-4" />
                                Edit User
                            </Link>
                        </Button>
                    </div>
                }
            />

            <div className="space-y-6">
                {/* User Profile Card */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-6">
                            <Avatar className="size-24 border-4 border-background shadow-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="text-2xl font-semibold">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                                    <p className="text-lg text-muted-foreground">{user.email}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge
                                        variant="outline"
                                        className={`font-medium capitalize ${ROLE_COLORS[user.role as keyof typeof ROLE_COLORS]}`}
                                    >
                                        <RoleIcon className="mr-1 size-3" />
                                        {user.role}
                                    </Badge>
                                    <div className="flex items-center gap-2">
                                        {isEmailVerified ? (
                                            <div className="flex items-center gap-1 text-green-600">
                                                <CheckCircle className="size-4" />
                                                <span className="text-sm font-medium">Email Verified</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 text-red-600">
                                                <XCircle className="size-4" />
                                                <span className="text-sm font-medium">Email Not Verified</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="size-5" />
                                Contact Information
                            </CardTitle>
                            <CardDescription>Basic contact details and verification status</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-sm">{user.email}</span>
                                    {isEmailVerified ? (
                                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                                            <CheckCircle className="mr-1 size-3" />
                                            Verified
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                                            <XCircle className="mr-1 size-3" />
                                            Unverified
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            {isEmailVerified && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Verified On</label>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="size-4" />
                                        {user.email_verified_at}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Account Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserIcon className="size-5" />
                                Account Information
                            </CardTitle>
                            <CardDescription>User role and account management details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 space-x-2">
                                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                                <span className="font-mono text-sm">#{user.id}</span>
                            </div>
                            <div className="space-y-2 space-x-2">
                                <label className="text-sm font-medium text-muted-foreground">Role</label>
                                <Badge variant="outline" className={`w-fit capitalize ${ROLE_COLORS[user.role as keyof typeof ROLE_COLORS]}`}>
                                    <RoleIcon className="mr-1 size-3" />
                                    {user.role}
                                </Badge>
                            </div>
                            <div className="space-y-2 space-x-2">
                                <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                                <Badge variant="outline" className="w-fit border-green-200 bg-green-50 text-green-700">
                                    <CheckCircle className="mr-1 size-3" />
                                    Active
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline Information */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="size-5" />
                                Account Timeline
                            </CardTitle>
                            <CardDescription>Important dates and account history</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Account Created</label>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="size-4 text-blue-500" />
                                        <span>{user.created_at}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock className="size-4 text-green-500" />
                                        <span>{user.updated_at}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common actions you can perform on this user account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="default" asChild>
                                <Link href={route('users.edit', user.id)}>
                                    <Pencil className="size-4" />
                                    Edit Profile
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href={`mailto:${user.email}`} target="_blank">
                                    <Mail className="size-4" />
                                    Send Email
                                </a>
                            </Button>
                            {!isEmailVerified && (
                                <Button variant="outline">
                                    <CheckCircle className="size-4" />
                                    Verify Email
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default UserShow;
