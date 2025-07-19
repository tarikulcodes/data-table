# DataTable

A feature-rich, server-side data table implementation built with React, TanStack Table, Laravel, and Inertia.js. This data table provides pagination, sorting, search, bulk actions, and column visibility controls out of the box.

## 🛠️ Tech Stack

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white) ![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white) ![Inertia](https://img.shields.io/badge/Inertia-9553E9?style=for-the-badge&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Frontend Stack

- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript with excellent developer experience
- **Inertia.js** - Modern monolith approach connecting Laravel and React seamlessly
- **TanStack Table** - Powerful headless table library for complex data interactions
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Unstyled, accessible UI primitives for custom design systems
- **Lucide Icons** - Beautiful & consistent icon library
- **Vite** - Fast build tool and development server

### Backend Stack

- **Laravel 11** - Elegant PHP framework with rich ecosystem
- **PHP 8.3+** - Modern PHP with performance improvements and type safety
- **MySQL/PostgreSQL** - Robust database with full-text search capabilities
- **Laravel Resources** - API resource transformation for consistent data formatting
- **Laravel Pagination** - Built-in pagination with query string persistence

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **PHP 8.2+** with extensions: `mbstring`, `xml`, `ctype`, `json`, `bcmath`, `fileinfo`, `tokenizer`
- **Composer** - PHP dependency manager
- **Node.js 18+** and **npm** (or **yarn**/**pnpm**)
- **MySQL 8.0+** or **PostgreSQL 13+**
- **Git**

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/data-table.git
    cd data-table
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install Node.js dependencies**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

4. **Environment setup**

    ```bash
    # Copy environment file
    cp .env.example .env

    # Generate application key
    php artisan key:generate
    ```

5. **Configure your `.env` file**

    ```env
    APP_NAME="Data Table"
    APP_URL=http://localhost:8000

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=data_table
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

6. **Database setup**

    ```bash
    # Create database (make sure MySQL/PostgreSQL is running)
    # Then run migrations
    php artisan migrate

    # Seed with sample data (optional)
    php artisan db:seed
    ```

7. **Build frontend assets**

    ```bash
    # For development
    npm run dev

    # For production
    npm run build
    ```

8. **Start the development server**

    ```bash
    # In one terminal - Laravel server
    php artisan serve

    # In another terminal - Vite dev server (for hot reload)
    npm run dev
    ```

9. **Access the application**

    Open your browser and visit: `http://localhost:8000`

### Quick Development Commands

```bash
# Watch for file changes (auto-reload)
npm run dev

# Run Laravel with specific host/port
php artisan serve --host=0.0.0.0 --port=8080

# Clear application cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# Run database migrations
php artisan migrate:fresh --seed

# Generate TypeScript types for Laravel routes (if using Ziggy)
php artisan ziggy:generate
```

### Docker Setup (Alternative)

If you prefer using Docker:

```bash
# Using Laravel Sail
./vendor/bin/sail up -d

# Install dependencies inside container
./vendor/bin/sail composer install
./vendor/bin/sail npm install

# Run migrations
./vendor/bin/sail artisan migrate --seed

# Build assets
./vendor/bin/sail npm run dev
```

### Troubleshooting

**Common Issues:**

1. **Vite connection refused**: Make sure both `php artisan serve` and `npm run dev` are running
2. **Database connection error**: Verify database credentials in `.env`
3. **Permission errors**: Set proper permissions:
    ```bash
    chmod -R 775 storage bootstrap/cache
    ```
4. **Missing APP_KEY**: Run `php artisan key:generate`

## ✨ Features

- 🔍 **Server-side Search** - Debounced search with query parameter persistence
- 📄 **Server-side Pagination** - Configurable page sizes with navigation controls
- 🔄 **Server-side Sorting** - Click-to-sort columns with visual indicators
- ✅ **Bulk Actions** - Select multiple rows and perform batch operations
- 🗑️ **Bulk Delete** - Built-in bulk delete functionality with confirmation dialog
- 👁️ **Column Visibility** - Show/hide columns with localStorage persistence
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎯 **TypeScript Support** - Fully typed with generic interfaces
- 🎨 **Customizable** - Extensible styling and behavior

## 📋 Table of Contents

- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Features](#-features)
- [Components Overview](#-components-overview)
- [Quick Start](#-quick-start)
- [Frontend Usage](#-frontend-usage)
- [Backend Implementation](#️-backend-implementation)
- [API Reference](#-api-reference)
- [Examples](#-examples)
- [Customization](#-customization)
- [Advanced Usage](#-advanced-usage)

## 🧩 Components Overview

### Core Components

| Component               | File                                                  | Description                                  |
| ----------------------- | ----------------------------------------------------- | -------------------------------------------- |
| `DataTable`             | `resources/js/components/datatable.tsx`               | Main table component with all features       |
| `DataTableToolbar`      | `resources/js/components/datatable-toolbar.tsx`       | Search, bulk actions, column visibility      |
| `DataTablePagination`   | `resources/js/components/datatable-pagination.tsx`    | Pagination controls and page size selector   |
| `DataTableColumnHeader` | `resources/js/components/datatable-column-header.tsx` | Sortable column headers with sort indicators |

### Supporting Files

| File                                           | Description                                           |
| ---------------------------------------------- | ----------------------------------------------------- |
| `resources/js/hooks/use-column-visibility.tsx` | Hook for managing column visibility with localStorage |
| `resources/js/types/index.d.ts`                | TypeScript interfaces and types                       |

## 🚀 Quick Start

### 1. Basic Implementation

```tsx
import { DataTable } from '@/components/datatable';
import { ColumnDef } from '@tanstack/react-table';

// Define your data type
interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

// Define columns
const columns: (ColumnDef<User> & { enable_sorting?: boolean })[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        enable_sorting: true,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        enable_sorting: true,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        enable_sorting: true,
    },
];

// Use in your page component
function UsersPage({ usersData }: { usersData: PaginatedData<User> }) {
    return <DataTable columns={columns} data={usersData.data} paginatedData={usersData} tableKey="users-table" />;
}
```

### 2. With Bulk Actions

```tsx
<DataTable
    columns={columns}
    data={usersData.data}
    paginatedData={usersData}
    activeBulkActions={true}
    bulkDelete={{
        route: route('users.bulk-delete'),
        title: 'Delete Users',
        description: 'Are you sure you want to delete the selected users?',
    }}
    tableKey="users-table"
/>
```

## 💻 Frontend Usage

### Column Definition

Columns follow TanStack Table's `ColumnDef` interface with an additional `enable_sorting` property:

```tsx
const columns: (ColumnDef<YourDataType> & { enable_sorting?: boolean })[] = [
    {
        accessorKey: 'field_name',
        header: 'Display Name',
        enable_sorting: true, // Enable server-side sorting for this column
        cell: ({ row }) => {
            // Custom cell rendering
            return <div>{row.original.field_name}</div>;
        },
    },
    {
        header: 'Actions',
        accessorKey: 'actions',
        enable_sorting: false,
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <Button onClick={() => editItem(row.original.id)}>Edit</Button>
                    <Button onClick={() => deleteItem(row.original.id)}>Delete</Button>
                </div>
            );
        },
    },
];
```

### Custom Bulk Actions

```tsx
const bulkActions: BulkAction<User>[] = [
    {
        label: 'Export Selected',
        icon: Download,
        onClick: (selectedRows) => {
            // Handle export
            exportUsers(selectedRows);
        },
    },
    {
        label: 'Archive Selected',
        icon: Archive,
        className: 'text-orange-600',
        onClick: (selectedRows) => {
            // Handle archive
            archiveUsers(selectedRows);
        },
    },
];

<DataTable
    // ... other props
    bulkActions={bulkActions}
    activeBulkActions={true}
/>;
```

### DataTable Props

```tsx
interface DataTableProps<TData, TValue> {
    columns: (ColumnDef<TData, TValue> & { enable_sorting?: boolean })[];
    data: TData[];
    paginatedData?: PaginatedData<TData>;
    bulkActions?: BulkAction<TData>[];
    bulkDelete?: {
        route: string;
        title?: string;
        description?: string;
    };
    activeBulkActions?: boolean;
    tableKey?: string; // For localStorage column visibility
}
```

## 🛠️ Backend Implementation

### 1. Controller Method

```php
<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // Extract query parameters with defaults
        $queryParams = request()->only(['search', 'page', 'per_page', 'sort_by', 'sort_dir']) + [
            'sort_by' => 'id',
            'sort_dir' => 'desc',
            'per_page' => 10,
            'page' => 1
        ];

        $users = User::query()
            // Search functionality
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                      ->orWhere('email', 'like', '%' . $search . '%');
            })
            // Sorting
            ->orderBy($queryParams['sort_by'], $queryParams['sort_dir'])
            // Pagination
            ->paginate($queryParams['per_page'])
            ->withQueryString();

        return Inertia::render('users/index', [
            'usersData' => UserResource::collection($users)->additional([
                'queryParams' => $queryParams,
            ]),
        ]);
    }

    // Bulk delete method
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id',
        ]);

        User::whereIn('id', $request->ids)->delete();

        return redirect()->route('users.index')
                        ->with('success', 'Users deleted successfully');
    }
}
```

### 2. Resource Collection

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'created_at' => $this->created_at->format('M d, Y'),
            'updated_at' => $this->updated_at->format('M d, Y'),
            // Add any other fields you need
        ];
    }
}
```

### 3. Routes

```php
// routes/web.php
Route::delete('users/bulk-delete', [UserController::class, 'bulkDelete'])->name('users.bulk-delete');
Route::resource('users', UserController::class);
```

## 📚 API Reference

### TypeScript Interfaces

```typescript
// Main data structure returned from backend
interface PaginatedData<T> {
    data: T[];
    queryParams: QueryParams;
    meta: PaginationMeta;
    links: SimplePaginationLinks;
}

// Query parameters for server requests
interface QueryParams {
    search?: string;
    page?: number;
    per_page?: number;
    sort_by?: string | null;
    sort_dir?: 'asc' | 'desc' | null;
    [key: string]: unknown;
}

// Bulk action definition
interface BulkAction<TData> {
    label: string;
    icon?: LucideIcon | IconType | null;
    onClick: (selectedRows: TData[]) => void;
    className?: string; // For custom styling
}

// Pagination metadata from Laravel
interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}
```

## 🎯 Examples

### Complete Users Table Example

```tsx
// resources/js/pages/users/index.tsx
import { DataTable } from '@/components/datatable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash } from 'lucide-react';

const ROLE_COLORS = {
    admin: 'border-blue-500 text-blue-500',
    manager: 'border-green-500 text-green-500',
    user: 'border-gray-500 text-gray-500',
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
            cell: ({ row }) => <div>#{row.original.id}</div>,
        },
        {
            header: 'Avatar',
            accessorKey: 'avatar',
            enable_sorting: false,
            cell: ({ row }) => (
                <Avatar className="size-10">
                    <AvatarImage src={row.original.avatar} />
                    <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
                </Avatar>
            ),
        },
        {
            accessorKey: 'name',
            header: 'Name',
            enable_sorting: true,
            cell: ({ row }) => (
                <div>
                    <h2 className="text-base font-semibold">{row.original.name}</h2>
                    <p className="text-sm text-gray-500">{row.original.email}</p>
                </div>
            ),
        },
        {
            accessorKey: 'role',
            header: 'Role',
            enable_sorting: true,
            cell: ({ row }) => (
                <Badge variant="outline" className={`capitalize ${ROLE_COLORS[row.original.role as keyof typeof ROLE_COLORS]}`}>
                    {row.original.role}
                </Badge>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Created At',
            enable_sorting: true,
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            enable_sorting: false,
            cell: ({ row }) => (
                <div className="flex flex-row gap-0.5">
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
                                    This action cannot be undone. This will permanently delete the user "{row.original.name}".
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
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={usersData.data}
            paginatedData={usersData}
            activeBulkActions={true}
            bulkDelete={{
                route: route('users.bulk-delete'),
                title: 'Delete Users',
                description: 'Are you sure you want to delete the selected users? This action cannot be undone.',
            }}
            tableKey="users-table"
        />
    );
};
```

## 🎨 Customization

### Styling

The datatable uses Tailwind CSS classes and follows your existing design system. Key classes can be customized:

- Table container: `.rounded-md.border`
- Selected rows: `data-state="selected"`
- Toolbar: `.mb-3`
- Pagination: `.mt-4`

### Search Behavior

The search is debounced by 500ms and triggers when:

- Input length > 2 characters
- Input is cleared (length = 0)

To customize the debounce timing, modify the `useDebouncedCallback` in `datatable-toolbar.tsx`:

```tsx
const handleDebouncedSearch = useDebouncedCallback((value: string) => {
    // Search logic
}, 300); // Change from 500ms to 300ms
```

### Column Visibility Persistence

Column visibility is automatically saved to localStorage using the `tableKey` prop. Each table should have a unique key:

```tsx
<DataTable
    tableKey="users-table" // Unique identifier
    // ... other props
/>
```

### Pagination Options

Default page size options are defined in `datatable-pagination.tsx`:

```tsx
const PER_PAGE_OPTIONS = [10, 15, 20, 25, 30, 40, 50, 100];
```

## 🔧 Advanced Usage

### Custom Search Logic

Extend the backend search to include more fields:

```php
->when($request->search, function ($query, $search) {
    $query->where(function ($q) use ($search) {
        $q->where('name', 'like', '%' . $search . '%')
          ->orWhere('email', 'like', '%' . $search . '%')
          ->orWhere('phone', 'like', '%' . $search . '%')
          ->orWhereHas('profile', function ($profile) use ($search) {
              $profile->where('bio', 'like', '%' . $search . '%');
          });
    });
})
```

### Advanced Sorting

Handle relationship sorting:

```php
$allowedSorts = ['id', 'name', 'email', 'created_at', 'profile.company'];

if (in_array($queryParams['sort_by'], $allowedSorts)) {
    if (str_contains($queryParams['sort_by'], '.')) {
        // Handle relationship sorting
        [$relation, $field] = explode('.', $queryParams['sort_by']);
        $users->join($relation, 'users.id', '=', "{$relation}.user_id")
              ->orderBy("{$relation}.{$field}", $queryParams['sort_dir']);
    } else {
        $users->orderBy($queryParams['sort_by'], $queryParams['sort_dir']);
    }
}
```

### Error Handling

Add error handling for failed requests:

```tsx
// In your page component
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Wrap router calls with error handling
const handleBulkAction = async (selectedRows: User[]) => {
    try {
        setLoading(true);
        setError(null);

        await router.delete(route('users.bulk-delete'), {
            data: { ids: selectedRows.map((row) => row.id) },
            onError: (errors) => {
                setError('Failed to delete users. Please try again.');
            },
        });
    } catch (err) {
        setError('An unexpected error occurred.');
    } finally {
        setLoading(false);
    }
};
```

## 🚀 Performance Tips

1. **Use Resource Collections**: Always use Laravel Resource Collections to control exactly what data is sent to the frontend
2. **Limit Searchable Fields**: Only search fields that are indexed in your database
3. **Optimize Queries**: Use `select()` to limit returned columns, eager load relationships
4. **Debounced Search**: The built-in 500ms debounce prevents excessive API calls
5. **Column Visibility**: Hidden columns still receive data - consider conditional inclusion in your Resource

## 🤝 Contributing

To extend the datatable functionality:

1. Add new features to the appropriate component
2. Update TypeScript interfaces in `types/index.d.ts`
3. Add backend support if needed
4. Update this documentation
5. Test with the Users example

---

**Built with ❤️ using React, TanStack Table, Laravel, and Inertia.js**
