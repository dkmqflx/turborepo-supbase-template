# Next.js + Supabase Monorepo Template

Monorepo template using Next.js 14, Supabase, and TurboRepo with Feature-Sliced Design architecture.

## Features

- 🏗️ [TurboRepo](https://turbo.build/) for monorepo management
- ⚡ [Next.js 14](https://nextjs.org/) with App Router
- 🔐 [Supabase](https://supabase.com/) for authentication and database
- 📦 [pnpm](https://pnpm.io/) for fast, disk space efficient package management
- 🎨 [Shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/) for styling
- 🔄 [TanStack Query](https://tanstack.com/query/latest) for server state management

## Project Structure

The project follows Feature-Sliced Design (FSD) architecture and includes:

```
.
├── apps/
│   ├── admin/          # Admin dashboard
│   └── web/            # Main web application
├── packages/
│   ├── constants/      # Shared constants
│   ├── eslint-config/  # ESLint configurations
│   ├── supabase/      # Supabase client and types
│   ├── types/         # Shared TypeScript types
│   ├── ui/            # Shared UI components
│   └── utils/         # Shared utilities
```

Each app follows FSD structure:

```
src/
├── app/          # Next.js app router pages
├── entities/     # Business entities
├── features/     # User scenarios
├── shared/       # Shared code
└── widgets/      # Composite components
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [Supabase](https://supabase.com/) account

### Setup

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/your-repo-name.git

    cd your-repo-name
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3.  Create .env files:

    For web app (apps/web/.env):

    ```env
    # supabase

    NEXT_PUBLIC_SUPABASE_URL=""
    NEXT_PUBLIC_SUPABASE_ANON_KEY=""
    NEXT_SUPABASE_SERVICE_ROLE=""
    NEXT_SUPABASE_DB_PASSWORD=""

    ```

    For admin app (apps/admin/.env):

    ```env
    # supabase

    NEXT_PUBLIC_SUPABASE_URL=""
    NEXT_PUBLIC_SUPABASE_ANON_KEY=""
    NEXT_SUPABASE_SERVICE_ROLE=""
    NEXT_SUPABASE_DB_PASSWORD=""

    ```

## Notes

### Supabase Project ID

In `packages/supabase/package.json`, replace `<project-id>` with your Supabase project ID:

```json
{
  "scripts": {
    "generate-types": "npx supabase gen types typescript --project-id <project-id> --schema public > packages/types/src/database.ts"
  }
}
```

After setting up your Supabase schema, generate types:

```shell

pnpm generate-types

```

### Environment Variables

Make sure to create `.env` files in both `apps/web` and `apps/admin` directories. Never commit these files to version control.

### Adding UI Components

To add new shadcn/ui components:

```bash
pnpm ui:add <component-name>
```

### TODO Tree Comments

This project uses TODO Tree for better code organization and documentation. You can use the following comment tags throughout the codebase:

- `NOTE:` - Important information about code implementation or architectural decisions
- `TODO:` - Tasks that need to be completed
- `FIXME:` - Issues that need to be fixed
- `NAME:` - Name of person who created the comments

Example of NOTE comments in the codebase:

I recommend to read the following comment tags

```typescript
// admin/src/shared/lib/getQueryCient
// web/src/shared/lib/getQueryCient

// NOTE: add error toast for mutation
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(error.message)
    },
  })
})

// NOTE: add error toast for query
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error.message)
    },
  })
})
```

```typescript
// admin/src/shared/lib/supabaseMiddleware
// web/src/shared/lib/supabaseMiddleware

// NOTE: if you want to redirect to login page, uncomment the following code
// if (!session) {
//   return NextResponse.redirect(new URL('/login', request.url))
// }
```

```typescript
// packages/ui/src/components/ui/sonner.tsx
// NOTE: this export is added for error toast
export { toast } from 'sonner';
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
