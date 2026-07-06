# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

Internal web app for the femicide registry at Observatorio de las Violencias de Género "Ahora Que Sí Nos Ven". Operators use it to register and edit femicide cases.

## Commands

Development runs inside Docker — the host needs no Node.js installed.

```bash
# Start the dev server (http://localhost:5173)
docker compose up

# Type-check + lint (this is the test suite)
docker compose run --rm dev npm run test

# Auto-fix formatting, lint, and import ordering
docker compose run --rm dev npm run format

# Build for production
docker compose run --rm dev npm run build

# Regenerate API types after updating the OpenAPI spec
curl http://localhost:8080/v1/openapi.json > ./src/api/aqsnv/v1-openapi.json
docker compose run --rm dev npm run api-types
```

Lint and formatting run through Biome (`biome check`). `npm run test` fails on any lint error or unformatted file; `npm run format` (`biome check --write`) fixes what it can.

## Architecture

**Tech stack:** React 19, TypeScript, Vite, MUI v9, TanStack Form v1, TanStack Query v5, TanStack Router v1, Dayjs.

**Path alias:** `@/` maps to `src/`.

### App structure & folder conventions

- **`src/main.tsx`** — only mounts `<App />` onto `#root`. Nothing else.
- **`src/App.tsx`** — the single top-level component: `StrictMode → Errors (error boundary) → providers → RouterProvider`. It only *composes* providers and mounts the router — library setup lives in `src/lib/` (see below). It flattens the provider list as a flat array of wrapper functions composed with `reduceRight` (instead of a nested JSX pyramid). `useAuthProviderValue()` is called once and the value is passed to both the auth context and the router context.
- **`src/lib/`** — library initialization and preconfigured singletons, so setup isn't tangled into `App`:
  - `dayjs.ts` — extends dayjs with the `utc` plugin, loads the `es` locale, and re-exports `dayjs`. **Always import dayjs from `@/lib/dayjs`, never from `'dayjs'`** (enforced by Biome's `noRestrictedImports` rule, with `src/lib/dayjs.ts` exempted via an override) — this guarantees the plugin/locale are registered before any module-level `dayjs().utc()` runs, regardless of import order or code-splitting.
  - `reactQuery.ts` — the preconfigured `queryClient` singleton.
  - `reactRouter.ts` — the preconfigured TanStack `router` plus its `Register` type augmentation.
  - `auth.ts` — the in-memory `authToken` singleton + `login()`, read by the HTTP layer and the router guards.
- **`src/routes/`** — TanStack Router **file-based route files** (the `routesDirectory` in `vite.config.ts`). These are thin and own **all** router concerns: routing config (`createFileRoute`, `beforeLoad`, `head`, `validateSearch`) and a `component` that acts as an adapter — it reads router state (`Route.useSearch()` / `Route.useParams()` / `Route.useNavigate()`) and passes plain props + domain callbacks (e.g. `search` + `onSearchChange`) down to the feature component. `routeTree.gen.ts` (at `src/` root) is auto-generated from this dir — do not edit by hand.
- **`src/features/<domain>/`** — the page components (and their sub-components) that route files render, e.g. `features/cases/`, `features/feed/`. They are **router-agnostic**: no route ids, no `useSearch`/`useParams`/`getRouteApi` — router state arrives as props (a typed `<Link>` for cross-route navigation is fine).
- **`src/components/`** — shared/reusable UI (`Loading`, `UserAvatar`, `Layout`, the `form/` inputs). `Layout` is the authenticated app shell (nav + `<Outlet />`). `links.tsx` exports `createLink`-wrapped MUI controls (`ButtonLink`, `IconButtonLink`) — use these for internal route navigation so `to`/`params` stay type-checked; external URLs stay plain `href` anchors.

### Document head / titles

Per-route titles use TanStack Router's native `head` option — each route file returns `head: () => ({ title, meta })`. `<HeadContent />` is rendered in `src/routes/__root.tsx`; the deepest matched route's title wins. `index.html` intentionally has **no** static `<title>` (in a client-only SPA `HeadContent` appends rather than overwrites, so a static tag would win over the route title).

### API layer (`src/api/aqsnv/`)

- `v1.ts` — generated TypeScript types from the OpenAPI spec (do not edit manually; excluded from Biome in `biome.json`)
- `v1-openapi.json` — source OpenAPI document used to generate `v1.ts` (excluded from Biome; regenerating it via the `curl`/`api-types` flow above needs no reformatting)
- `cases.ts`, `auth.ts`, `feed.ts`, `profiles.ts` — typed API wrappers that re-export enums from `v1.ts` and expose fetch functions using `src/utils/http.ts`

All enums used in the form come from `v1.ts` via re-exports in `cases.ts`.

### Form system (`src/features/cases/`)

The case form is the core of the app. Its data flow:

1. **`formValues.tsx`** — single source of truth for form shape:
   - `defaultFormValues` — initial values for the create form
   - `formValuesToCase()` — converts form state → `Case` API payload
   - `caseToFormValues()` — converts API `Case` → form state (used by edit)

2. **`CaseForm.tsx`** — shared form shell used by both the new and edit pages; handles submission, error display, and the tabbed layout (Case / Victim / Aggressor tabs)

3. **Field group components** (`CaseFields`, `VictimFields`, `AggressorFields`) — render the actual fields using `form.AppField`. Each module exports **only** its component (see the Biome note below); its field list lives in `controlledFields.ts` and its help text in `help/`.

4. **`controlledFields.ts`** — exports `caseControlledFields` / `victimControlledFields` / `aggressorControlledFields` (plain `Set`s, no JSX) that tell `CaseForm` which fields belong to each tab, so it can show a tab-level error indicator. The case set is *derived* from the other two; keeping all three here (rather than on the field components) also stops the field components from importing each other.

5. **`help/{caseHelp,victimHelp,aggressorHelp}.tsx`** — the help-text constants and JSX help components for each section, consumed via `import * as help from "./help/caseHelp"` (e.g. `helpText={help.FECHA_DEL_CASO}` / `helpText={<help.CaseCategoryHelper />}`).

> **Biome `useComponentExportOnlyModules`:** a module that exports a React component must export *only* components (plain constants are allowed). That's why `controlledFields.ts` and `help/` are separate modules — do **not** move those `Set`s or help components back into the field components, or `npm run test` will fail the lint. The single lint rule turned off globally is `noChildrenProp` (TanStack Form/Router pass render functions via the `children` prop by design).

### Form hook (`src/hooks/form.tsx`)

Creates `useAppForm` and `form.AppField` via TanStack Form's `createFormHook`. All form fields use the pre-registered components:

| Component name | Used for |
|---|---|
| `Text` | Free text input |
| `Combo` | Single-select dropdown |
| `MultiCombo` | Multi-select dropdown |
| `Checkbox` | Boolean toggle |
| `YesNoUnknown` | Tri-state: yes / no / unknown (maps to `boolean \| undefined`) |
| `RadioGroup` | Exclusive choice |
| `DatePicker` | Date input |

`YesNoUnknown` maps to `boolean | undefined` in the API via `yesNoUnknownToBoolean` / `booleanToYesNoUnknown` in `src/utils/cast.ts`.

### Adding a new field to the case form

1. Add the field to `defaultFormValues` in `formValues.tsx`
2. Add conversion logic in `formValuesToCase()` (form → API)
3. Add reverse conversion in `caseToFormValues()` (API → form)
4. Add the new enum to the re-exports in `cases.ts` if it's an enum type
5. Add `form.AppField` in the relevant field group component (`CaseFields`, `VictimFields`, or `AggressorFields`); put any help text in the matching `help/*.tsx` module
6. Add the field name to the matching set in `controlledFields.ts` for tab-level error tracking

### Conditional field visibility

Use `form.Subscribe` to show/hide fields based on other field values. See `wasJudicialized` → `judicialMeasures` in `VictimFields.tsx` as the canonical pattern.

### Auth

OAuth (PKCE) callback lives at `/oauth/cb`. The access token is an in-memory module singleton in `src/lib/auth.ts` (`authToken` + `login()`), lost on reload. Authenticated API wrappers call `authorizedRequest()` (`src/utils/http.ts`), which attaches the `Bearer` header from that singleton — **components and API signatures never handle the token**. The router's `_authenticated` guard reads `authToken.isAvailable()` and `/oauth/cb` calls `login()`, both importing the singleton directly (auth is not kept in the router context). Unauthenticated calls (the OAuth handshake in `api/aqsnv/auth.ts`) use `httpRequest()` directly.
