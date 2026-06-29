# TaskFlow

A task & project management platform built as a **pnpm + Turborepo monorepo**.

## Structure

```
TaskFlow/
├── apps/
│   ├── web/      Next.js 16 frontend (App Router, Redux Toolkit, Tailwind)
│   └── api/      NestJS 11 backend (Clean Architecture)
├── packages/
│   ├── shared-types/   Domain types shared between web & api
│   ├── ui/             Shared UI components
│   ├── utils/          Shared utilities
│   └── configs/        Shared tooling configs (tsconfig, eslint)
├── docker/      Container & compose files
└── docs/        Project documentation
```

### API — Clean Architecture

Each feature module under `apps/api/src/modules/*` is split into the four
classic layers, with the dependency rule pointing inward
(`presentation → application → domain`, `infrastructure → domain`):

```
modules/<feature>/
├── domain/          Entities, value-objects, repository interfaces, events
├── application/     Use-cases, DTOs, ports, mappers
├── infrastructure/  Persistence entities, repository implementations, mappers
└── presentation/    Controllers, guards
```

Cross-cutting code lives in `src/shared` (reusable domain/app/infra) and
`src/core` (framework-level filters, interceptors, guards, pipes, etc.).

## Getting started

```bash
pnpm install        # install all workspaces
pnpm dev            # run every app in dev (turbo)
pnpm build          # build every app/package
pnpm lint           # lint all workspaces
```

Run a single app:

```bash
pnpm --filter web dev
pnpm --filter api dev
```

## Requirements

- Node.js >= 22
- pnpm 11
