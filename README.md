# Portfolio — Antônio Lanza

Site pessoal e portfólio de **Antônio Pernoncini Lanza**, desenvolvedor full stack focado em React, TypeScript e interfaces modernas.

**Live:** [www.antoniolanza.com](https://www.antoniolanza.com)

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Framer Motion
- i18n (PT / EN / ES)
- pnpm workspaces (monorepo)
- Deploy na Vercel

## Como rodar localmente

Requisitos: **Node.js 20+** e **pnpm 10**.

```bash
# na raiz do repositório
cd Portfolio
pnpm install
pnpm --filter @workspace/portfolio run dev
```

O app sobe em `http://localhost:3005` (porta configurável via `PORT` no `.env`).

Copie o exemplo de env se precisar:

```bash
cp artifacts/portfolio/.env.example artifacts/portfolio/.env
```

## Estrutura

```text
.
├── Portfolio/                       # workspace pnpm
│   ├── artifacts/
│   │   ├── portfolio/               # app do site
│   │   └── api-server/              # API Express (GitHub repos, health)
│   ├── lib/                         # libs compartilhadas (OpenAPI, Zod, DB)
│   └── scripts/
├── package.json
├── README.md
├── LICENSE
└── vercel.json
```

## Scripts úteis

| Comando | Descrição |
|--------|-----------|
| `pnpm --filter @workspace/portfolio run dev` | Dev server do site |
| `pnpm --filter @workspace/portfolio run build` | Build de produção |
| `pnpm --filter @workspace/api-server run dev` | API local (porta 3001) |
| `pnpm run typecheck` | Typecheck do monorepo |

## Contato

- Site: [antoniolanza.com](https://www.antoniolanza.com)
- LinkedIn: [antoniopernoncini](https://www.linkedin.com/in/antoniopernoncini/)
- GitHub: [AntonioLanzaDesenvolvedor](https://github.com/AntonioLanzaDesenvolvedor)

## Licença

MIT — veja [LICENSE](./LICENSE).
