import { Toaster } from '@/components/ui/sonner';
import { useAppearance } from '@/hooks/use-appearance';
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { appearance } = useAppearance();
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                onAutoClose: () => router.reload({ only: ['flash'] }),
                onDismiss: () => router.reload({ only: ['flash'] }),
                duration: 3000,
            });
        }

        if (flash?.error) {
            toast.error(flash.error, {
                onAutoClose: () => router.reload({ only: ['flash'] }),
                onDismiss: () => router.reload({ only: ['flash'] }),
                duration: 3000,
            });
        }

        if (flash?.warning) {
            toast.warning(flash.warning, {
                onAutoClose: () => router.reload({ only: ['flash'] }),
                onDismiss: () => router.reload({ only: ['flash'] }),
                duration: 3000,
            });
        }
    }, [flash]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster position="top-center" richColors closeButton theme={appearance} />
        </AppLayoutTemplate>
    );
};
