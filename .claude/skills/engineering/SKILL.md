---
name: engineering
version: 1.0.0
description: When discussing code quality, performance, React/Next.js patterns, TypeScript practices, Core Web Vitals, bundle optimization, or modern development. Covers Next.js 16, React 19, TypeScript 5.9+, and performance optimization.
---

# Engineering Best Practices

You are an expert in modern web development. Your goal is to ensure the Politics Platform follows best practices for Next.js 16, React 19, TypeScript 5.9+, and web performance.

## Politics Platform Stack

- **Next.js 16** with App Router
- **React 19** with new hooks
- **TypeScript 5.9+** strict mode
- **Tailwind CSS 4** with OKLCH colors
- **Zod 4** for validation
- **Supabase Postgres** for source-backed public data
- **MapLibre** and chart/table libraries where they improve understanding
- **Bun test**, Playwright, and Biome for quality checks
- **Hosting:** Vercel for the app; Cloudflare for DNS and email routing

---

## Core Web Vitals Targets

| Metric | Target | Platform Focus |
|--------|--------|----------------|
| **LCP** | <2.5s | Hero + search visible fast |
| **INP** | <200ms | Search and compare inputs responsive |
| **CLS** | <0.1 | No layout shift on results |

---

## Priority 1: Eliminating Waterfalls (CRITICAL)

### Defer Await Until Needed
```typescript
// Bad: blocks both branches
async function handleRequest(userId: string, skip: boolean) {
  const data = await fetchData(userId)
  if (skip) return { skipped: true }
  return processData(data)
}

// Good: only blocks when needed
async function handleRequest(userId: string, skip: boolean) {
  if (skip) return { skipped: true }
  const data = await fetchData(userId)
  return processData(data)
}
```

### Promise.all() for Independent Operations
```typescript
// Bad: sequential
const user = await fetchUser()
const posts = await fetchPosts()

// Good: parallel
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()])
```

### Strategic Suspense Boundaries
```tsx
// Good: wrapper shows immediately, data streams in
function Page() {
  return (
    <div>
      <Sidebar />
      <Suspense fallback={<Skeleton />}>
        <DataDisplay />
      </Suspense>
    </div>
  )
}
```

---

## Priority 2: Bundle Size (CRITICAL)

### Avoid Barrel File Imports
```tsx
// Bad: imports entire library
import { Check, X } from 'lucide-react'

// Good: use optimizePackageImports in next.config.ts
experimental: {
  optimizePackageImports: ['lucide-react', 'recharts']
}
```

### Dynamic Imports for Heavy Components
```tsx
import dynamic from 'next/dynamic'

const Charts = dynamic(() => import('./Charts'), {
  loading: () => <ChartsSkeleton />,
  ssr: false
})
```

### Defer Non-Critical Libraries
```tsx
// Load analytics after hydration
const Analytics = dynamic(
  () => import('@vercel/analytics/react').then(m => m.Analytics),
  { ssr: false }
)
```

### Preload on User Intent
```tsx
function EditorButton({ onClick }) {
  const preload = () => void import('./heavy-editor')
  return (
    <button onMouseEnter={preload} onFocus={preload} onClick={onClick}>
      Open Editor
    </button>
  )
}
```

---

## Priority 3: Server-Side Performance (HIGH)

### Authenticate Server Actions
```typescript
'use server'
export async function deleteItem(id: string) {
  const session = await verifySession()
  if (!session) throw new Error('Unauthorized')
  // ... proceed
}
```

### Minimize Serialization
```tsx
// Bad: serializes all fields
async function Page() {
  const user = await fetchUser()
  return <Profile user={user} />
}

// Good: only needed fields
async function Page() {
  const user = await fetchUser()
  return <Profile name={user.name} avatar={user.avatar} />
}
```

### Per-Request Deduplication
```typescript
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null
  return db.user.findUnique({ where: { id: session.user.id } })
})
```

---

## Priority 4: Re-render Optimization (MEDIUM)

### Use Transitions for Non-Urgent Updates
```tsx
'use client'
import { useTransition } from 'react'

function SearchResults() {
  const [isPending, startTransition] = useTransition()
  const [results, setResults] = useState(null)

  function handleChange(query) {
    startTransition(() => {
      setResults(fetchResults(query))
    })
  }

  return (
    <>
      <input onChange={(e) => handleChange(e.target.value)} />
      {isPending ? <Skeleton /> : <Results data={results} />}
    </>
  )
}
```

### Functional setState for Stable Callbacks
```tsx
// Bad: needs count in deps
const increment = useCallback(() => setCount(count + 1), [count])

// Good: stable reference
const increment = useCallback(() => setCount(c => c + 1), [])
```

### Lazy State Initialization
```tsx
// Bad: parseData runs every render
const [data, setData] = useState(parseData(rawData))

// Good: parseData runs once
const [data, setData] = useState(() => parseData(rawData))
```

---

## Priority 5: JavaScript Performance (LOW-MEDIUM)

### Use Set/Map for O(1) Lookups
```typescript
// Bad: O(n) per check
const allowed = ['a', 'b', 'c']
items.filter(item => allowed.includes(item.id))

// Good: O(1) per check
const allowed = new Set(['a', 'b', 'c'])
items.filter(item => allowed.has(item.id))
```

### Early Return
```typescript
function validate(users: User[]) {
  for (const user of users) {
    if (!user.email) return { valid: false, error: 'Email required' }
  }
  return { valid: true }
}
```

### Use toSorted() for Immutability
```typescript
// Bad: mutates original
const sorted = users.sort((a, b) => a.name.localeCompare(b.name))

// Good: creates new array
const sorted = users.toSorted((a, b) => a.name.localeCompare(b.name))
```

---

## React 19 Features

### use() Hook
```tsx
import { use } from 'react'

function PolicyData({ dataPromise }) {
  const data = use(dataPromise) // Suspends until resolved
  return <div>{data.summary}</div>
}
```

### useOptimistic
```tsx
const [optimisticResults, setOptimisticResults] = useOptimistic(results)

async function search(query) {
  setOptimisticResults({ query, pending: true })
  const actual = await fetchAnswer(query)
  setResults(actual)
}
```

### Server Actions
```tsx
'use server'
export async function submitFeedback(formData: FormData) {
  const message = formData.get('message')
  await saveFeedback(message)
  revalidatePath('/feedback')
}
```

---

## TypeScript Patterns

### Strict Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Zod for Runtime Validation
```tsx
import { z } from 'zod'

const QuerySchema = z.string()
  .min(1, 'Query cannot be empty')
  .max(500, 'Query too long')

type Query = z.infer<typeof QuerySchema>
```

### Discriminated Unions
```tsx
type Result =
  | { status: 'success'; data: TaxBreakdown }
  | { status: 'error'; error: string }
  | { status: 'loading' }
```

---

## State Management (Zustand)

### Store Pattern
```tsx
import { create } from 'zustand'

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  results: null,
  setQuery: (query) => set({ query }),
  search: () => {
    const { query } = get()
    set({ results: fetchResults(query) })
  },
}))
```

### Selective Subscriptions
```tsx
// Only re-render when specific values change
const query = useSearchStore(state => state.query)
```

---

## LCP Optimization

### Server-Side Render Critical Content
```tsx
// Good: SSR hero content
export default function HomePage() {
  return (
    <main>
      <h1>UK Policy Explainer</h1> {/* LCP candidate */}
      <SearchBar />
    </main>
  )
}
```

### Avoid Animation on LCP
```tsx
// Bad: framer-motion delays LCP
<motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

// Good: CSS animation or no animation
<h1 className="animate-fadeIn">
```

---

## CLS Prevention

### Reserve Space for Dynamic Content
```tsx
// Good: Skeleton maintains layout
{results ? <ResultsTable data={results} /> : <ResultsSkeleton />}
```

### Always Specify Image Dimensions
```tsx
<Image src="/chart.png" width={600} height={400} alt="Tax breakdown" />
```

---

## Design System Hygiene

### No Hardcoded Values
```tsx
// Bad
<div className="text-[#3B82F6] p-[13px]">

// Good: Use Tailwind scale and config
<div className="text-primary p-3">
```

### Consistent Patterns
- All buttons use same base styles
- All cards have same padding, radius, shadow
- All inputs have same height, border, focus states

---

## Performance Checklist

### Before Deploy
- [ ] LCP element server-rendered
- [ ] No animation on LCP element
- [ ] Bundle size <200KB initial JS
- [ ] Images optimized with next/image
- [ ] Heavy components code-split
- [ ] No hardcoded Tailwind values

### After Deploy
- [ ] Lighthouse score >90
- [ ] LCP <2.5s in field data
- [ ] INP <200ms
- [ ] CLS <0.1

---

## Key Files

- `next.config.ts` - Build optimizations
- `tsconfig.json` - TypeScript configuration
- `src/app/layout.tsx` - Root layout, fonts
- `src/app/page.tsx` - Homepage (LCP critical)
- `src/store/` - Zustand stores
- `src/lib/validation/` - Zod schemas
- `tailwind.config.ts` - Design tokens

## Politics Platform Context

- Source data correctness is non-negotiable; political claims must be traceable to primary sources stored in Supabase
- Prefer changes that reduce user-facing risk over novelty (predictable behavior > clever implementation)
- For new architecture suggestions, separate "ready now" vs "future" recommendations
- Always validate performance claims with project scripts and real outputs (`bun run fix-all`, `bun run build`, targeted tests)
- Supabase queries should use connection pooling and avoid N+1 patterns
- Do not introduce AI product features unless the product direction explicitly changes
- Treat pgvector or semantic retrieval as future-only; benchmark retrieval quality before shipping it
- ISR, cache tags, and scheduled refreshes should match source freshness SLAs (legislation: weekly, Hansard: daily during session, party publications: daily)
- All server components that fetch from Supabase should use React `cache()` for per-request deduplication
