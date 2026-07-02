# ui-registro-femicidios

Internal website for the femicide registry system we use at the Observatorio de las Violencias de Género “Ahora Que Sí Nos Ven”

This is a [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) app built with [Vite](https://vitejs.dev/). It uses [MUI](https://mui.com/) for UI, [TanStack Router](https://tanstack.com/router/latest) for routing, [TanStack Form](https://tanstack.com/form/latest) for the case form, and [React Query](https://tanstack.com/query/v3) for server state.

> For a deeper tour of the architecture and conventions, see [CLAUDE.md](./CLAUDE.md).

## Development

### Prerequisites

We use a dockerized development environment, so you will need [docker](https://www.docker.com/) on your machine. No other dependencies are required in your machine.

### Quick start

* Make sure you have a server running from https://github.com/ahoraquesinosven/api-registro-femicidios
    * Follow the steps described in that API README to create the `env.defaults`
    * Update the `.env` with: `AUTH_PROVIDER_REDIRECT_URI=http://localhost:5173/oauth/cb` to make sure it is calling this UI
    * Run `docker compose up` to run the server
* Run `docker compose up`. This will take a bit the first time since the docker images need to be built or downloaded. Once done, the website can be accessed at http://localhost:5173.

The compose service is named `dev`, so one-off commands run as `docker compose run --rm dev <command>`.

### Type-check + lint (the test suite)

```bash
docker compose run --rm dev npm run test
```

This runs `tsc` and ESLint. Lint runs with `--max-warnings 0`, so **zero warnings** are allowed. The same command runs in CI on every PR against `main` and `dev`, so run it before pushing.

### Build

```bash
docker compose run --rm dev npm run build
```

### AQSNV API types

We use [openapi-typescript](https://openapi-ts.dev/) to generate TypeScript types from the API's OpenAPI document. When the API exposes new types, regenerate ours:

1. Download the OpenAPI document: `curl http://localhost:8080/v1/openapi.json > ./src/api/aqsnv/v1-openapi.json`
2. Regenerate the types: `docker compose run --rm dev npm run api-types`

`src/api/aqsnv/v1.ts` is generated — do not edit it by hand.

## Conventions & caveats

* **Routing is file-based (TanStack Router).** Routes live in `src/routes/`; `src/routeTree.gen.ts` is generated from that directory — **never edit it by hand**. Route files are thin adapters: they own routing config (`createFileRoute`, `beforeLoad`, `head`, `validateSearch`) and read router state (`useSearch`/`useParams`/`useNavigate`), then pass plain props down to the page components in `src/features/<domain>/`, which are router-agnostic.
* **Per-route titles** use TanStack Router's native `head` option in each route file. `index.html` intentionally has no static `<title>`.
* **Cases-list filters live in the URL** as validated search params (see `src/features/cases/searchFilters.ts`). Shareable/bookmarkable, and the source of truth for the query.
* **Always import dayjs from `@/lib/dayjs`, never from `'dayjs'`** — this is enforced by ESLint so the `utc` plugin and `es` locale are registered before any module-level `dayjs()` call runs.
* **The auth token never appears in components or API signatures.** It's an in-memory singleton in `src/lib/auth.ts`, attached to requests by the fetch layer (`src/utils/http.ts`). It's lost on reload (OAuth PKCE handshake at `/oauth/cb` re-issues it).
* **Internal navigation uses the typed link wrappers** in `src/components/links.tsx` (`ButtonLink`, `IconButtonLink`) so `to`/`params` stay type-checked. External URLs stay plain anchors.
* **Library setup lives in `src/lib/`** (`dayjs`, `reactQuery`, `reactRouter`, `auth`) so it isn't tangled into `App.tsx`.

### Adding a new field to the case form

1. Add the field to `defaultFormValues` in `src/features/cases/formValues.tsx`.
2. Add the form → API conversion in `formValuesToCase()` and the API → form conversion in `caseToFormValues()`, both in `formValues.tsx`.
3. If it's an enum, re-export it from `src/api/aqsnv/cases.ts`.
4. Add a `form.AppField` in the relevant field group — `CaseFields.tsx`, `VictimFields.tsx`, or `AggressorFields.tsx` (all under `src/features/cases/`) — using a pre-defined component from `src/hooks/form.tsx`. If you need a new field component, check with Andres first.
5. Add the field name to that component's `controlledFields` set for tab-level error tracking.

## Reference links

Quick links to the docs for the libraries we use:

* [React](https://react.dev/reference/react) — UI library
* [Vite](https://vitejs.dev/guide/) — build tool / dev server
* [MUI](https://mui.com/material-ui/getting-started/) — UI component framework
* [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview) — file-based routing
* [TanStack Form](https://tanstack.com/form/latest/docs/framework/react/overview) — the case form ([listeners guide](https://tanstack.com/form/latest/docs/framework/react/guides/listeners))
* [React Query (v3)](https://tanstack.com/query/v3/docs/framework/react/overview) — server-state sync
* [Day.js](https://day.js.org/docs/en/installation/installation) — date handling
* [openapi-typescript](https://openapi-ts.dev/) — API type generation

## License

See the [LICENSE](./LICENSE) file for license rights and limitations (MIT).
