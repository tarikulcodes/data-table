import { cn } from '@/lib/utils';
import { PaginatedData } from '@/types';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from './ui/input';

const DataTableFilters = <TData,>({ paginatedData, className }: { paginatedData: PaginatedData<TData>; className?: string }) => {
    const { queryParams } = paginatedData;

    const handleDebouncedSearch = useDebouncedCallback((value: string) => {
        if (value.length > 2 && value !== queryParams.search) {
            router.get(
                route(route().current() ?? ''),
                {
                    ...queryParams,
                    search: value,
                    page: 1,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                },
            );
        } else if (value.length === 0) {
            const updatedQueryParams = { ...queryParams, page: 1 };
            delete updatedQueryParams.search;

            router.get(route(route().current() ?? ''), updatedQueryParams, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            });
        }
    }, 500);

    return (
        <div className={cn('flex items-center justify-between gap-4', className)}>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="max-w-sm pl-8"
                        defaultValue={queryParams.search ?? ''}
                        onChange={(e) => handleDebouncedSearch(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default DataTableFilters;
