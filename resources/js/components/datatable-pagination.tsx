import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PaginatedData } from '@/types';
import { router } from '@inertiajs/react';

const PER_PAGE_OPTIONS = [10, 15, 20, 25, 30, 40, 50, 100];

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    paginatedData: PaginatedData<TData>;
}

export function DataTablePagination<TData>({ table, paginatedData }: DataTablePaginationProps<TData>) {
    const { meta, links, queryParams } = paginatedData;

    // Per page change
    const handlePerPageChange = (value: number) => {
        router.get(
            route(route().current() ?? ''),
            {
                ...queryParams,
                per_page: value,
                page: 1,
            },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                Showing {meta.to - meta.from + 1} of {meta.total} items
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select value={meta.per_page.toString()} onValueChange={(value) => handlePerPageChange(Number(value))}>
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {PER_PAGE_OPTIONS.map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {meta.current_page} of {meta.last_page}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => {
                            router.get(route(route().current() ?? ''), { ...queryParams, page: 1 }, { preserveState: true, preserveScroll: true });
                        }}
                        disabled={links.first === null || meta.current_page === 1}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => {
                            router.get(
                                route(route().current() ?? ''),
                                { ...queryParams, page: meta.current_page - 1 },
                                { preserveState: true, preserveScroll: true },
                            );
                        }}
                        disabled={links.prev === null || meta.current_page === 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => {
                            router.get(
                                route(route().current() ?? ''),
                                { ...queryParams, page: meta.current_page + 1 },
                                { preserveState: true, preserveScroll: true },
                            );
                        }}
                        disabled={links.next === null || meta.current_page === meta.last_page}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => {
                            router.get(
                                route(route().current() ?? ''),
                                { ...queryParams, page: meta.last_page ?? 1 },
                                { preserveState: true, preserveScroll: true },
                            );
                        }}
                        disabled={links.last === null || meta.current_page === meta.last_page}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}
