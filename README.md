## 1. 폴더 구조 (F.S.D)

프로젝트는 F.S.D(Feature-Sliced Design) 아키텍처를 따릅니다. 주요 폴더 구조는 다음과 같습니다:

- 주요 폴더:
  - app/: 앱 레벨 Provider, 글로벌 설정 등
  - entities/: 핵심 도메인 엔티티

  - features/: 독립적 기능 단위
  - pages/: 라우트별 페이지 및 UI
  - shared/: 공통 유틸, 상수, 라이브러리
  - widgets/: 여러 feature/엔티티를 조합한 UI 블록

- **apps/admin, apps/user**: 각각의 앱(어드민, 유저) 별로 독립적인 구조를 가집니다.

- **packages/**: 공통 패키지(유틸, 타입, UI 등)를 모아둔 모노레포 구조입니다.

---

## 2. 주요 라이브러리

클라이언트 상태 관리: zustand
서버 상태 관리: tanstack query
유효성 검증: zod
스타일링: tailwindcss, shadcn (packages에서 관리)

---

## 3. 에러 핸들링

### 500 에러 (서버 에러)

- **에러 바운더리**를 활용하여, 서버 에러를 처리하도록 합니다.

- `src/app/providers/QueryErrorBoundary.tsx` 에서 구현되어 있습니다.

- `pages/query-test`에서 아래 코드를 통해서 확인할 수 있습니다.

```tsx
const { refetch: refetchWithServerError } = useQuery({
  queryKey: ['test-server-error'],
  queryFn: fetchWithServerError,
  enabled: false, // Don't run automatically
  retry: false,
});

const { mutate: mutateWithServerError } = useMutation({
  mutationFn: fetchWithServerErrorMutation,
});
```

```tsx
// getQueryClient.ts
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        // server 에러인 경우 에러 바운더리에서 처리하도록
        throwOnError: (error) => {
          console.log(error);
          return error instanceof ApiError && error.code === 'SERVER_ERROR';
        },
      },
      mutations: {
        // server 에러인 경우 에러 바운더리에서 처리하도록
        throwOnError: (error) => {
          console.log(error);
          return error instanceof ApiError && error.code === 'SERVER_ERROR';
        },
      },

     ...
}
```

### 400 에러 (클라이언트 에러)

- 서버 상태 관리 도구로 tanstack query를 사용하고 있기 때문에 useQuery hook에서는 meta 필드를 사용해서 기본적으로 관리하고, toast를 통해서 에러 메세지를 보여줄 수 있도록 처리합니다.

```tsx
const { refetch } = useQuery({
  queryKey: ['test-error'],
  queryFn: fetchWithError,
  enabled: false, // Don't run automatically
  retry: false,
  meta: {
    toast: true,
    message: 'Test Query Error Toast',
  },
});
```

```ts
// getQueryClient.ts
export function makeQueryClient() {
  return new QueryClient({
    ...

    queryCache: new QueryCache({
      // NOTE: add error toast for query
      onError: (error, query) => {
        console.error(error);

        if (isServer) return;

        if (query.meta?.toast) {
          toast.error(query.meta?.message as string);
        }
      },
    }),
  });
}
```

- mutation hook은 onError 콜백을 사용해서 각각 처리할 수 있도록 합니다

```ts
const { mutate: mutateWithError } = useMutation({
  mutationFn: fetchWithErrorMutation,
  onError: (error) => {
    console.log(error);

    // NOTE: you can handle error depend on your error code type
    if (error instanceof ApiError) {
      toast.error(error.message);
    }
  },
});
```

---

### SSR 설정

- Next.js와 Tanstack query를 사용해서 SSR를 구현하기 위한 설정을 `getQueryClient`에서 처리했습니다.

---

## 3. 주석

### TSDoc

- 기본적으로 **TSDoc** 스타일의 주석을 사용합니다.

### Todo Tree

- VSCode의 Todo Tree 확장과 연동하여, `// TODO:` 주석을 통해 남은 작업이나 개선점을 관리합니다.

- 주석 예시:

  ```ts
  // TODO: 에러 처리 로직 개선 필요
  ```

---

## 4. 공통 패키지

### shadcn/ui

- UI 컴포넌트 라이브러리로, 일관된 디자인 시스템을 제공합니다.

- 커스텀 가능한 Button, Input, Toast 등 다양한 컴포넌트가 포함되어 있습니다.

### eslint rules

- `packages/eslint-config`에 공통 ESLint 규칙을 정의하여, 코드 스타일과 품질을 통일합니다.

- FSD 구조에 맞는 import 순서, 네이밍, 사용 금지 패턴 등을 관리합니다.

### api 초기 설정

- `shared/lib/apiClient.ts` 등에서 API 클라이언트(예: axios, fetch 등) 설정을 공통화하여, 각 앱에서 일관된 방식으로 API를 사용할 수 있습니다.

- API 엔드포인트, 에러 처리, 인증 토큰 관리 등도 포함됩니다.

### 5. Rules

- husky 를 통해서 commitlint, lint-staged을 관리하고 있으며 공통의 컨벤션을 강제하도록 합니다.
