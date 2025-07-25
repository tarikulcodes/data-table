import { LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | IconType | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash: {
        success: string | null;
        error: string | null;
        warning: string | null;
    };
    [key: string]: unknown;
}

export interface QueryParams {
    search?: string;
    page?: number;
    per_page?: number;
    sort_by?: string | null;
    sort_dir?: 'asc' | 'desc' | null;
    [key: string]: unknown;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    [key: string]: unknown;
}

export interface SimplePaginationLinks {
    first: string | null;
    last: string | null;
    next: string | null;
    prev: string | null;
}

export interface PaginatedData<T> {
    data: T[];
    queryParams: QueryParams;
    meta: PaginationMeta;
    links: SimplePaginationLinks;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    role: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface BulkAction<TData> {
    label: string;
    icon?: LucideIcon | IconType | null;
    onClick: (selectedRows: TData[]) => void;
    className?: string; // for styling (e.g. destructive)
}
