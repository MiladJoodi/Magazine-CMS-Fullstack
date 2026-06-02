# magazine-cms-fullstack 

Full-stack magazine platform — **Next.js**, **Prisma**, **REST API**, comments & views. A portfolio project showcasing editorial UI, article pages, and a clear path to a complete CMS backend.

**Author:** [Milad Joodi](https://github.com/MiladJoodi) · [LinkedIn](https://www.linkedin.com/in/joodi/) · [Repository](https://github.com/MiladJoodi/magazine-cms-fullstack)

---

## Overview

**Northline** is a magazine-style content site with a homepage feed, trending sidebar, and individual article pages. The frontend is built with Next.js App Router and shadcn/ui. Data is currently mocked in TypeScript modules, structured so it can be swapped for Prisma and API routes without rewriting the UI.

## Features

### Implemented

- Magazine homepage: header, featured hero, latest stories grid, trending sidebar, footer
- Dynamic article pages at `/posts/[slug]` (SSG via `generateStaticParams`)
- View and comment counts on cards and article headers
- Mock comments section on article pages
- Related stories and category badges
- Responsive layout (mobile → desktop)
- Editorial typography (Fraunces, Plus Jakarta Sans, Newsreader via `next/font`)

### Planned (full-stack roadmap)

- PostgreSQL + Prisma schema (posts, categories, comments, views)
- Next.js Route Handlers / REST API
- Real comment posting and view tracking
- Admin dashboard for publishing content
- Cover images with `next/image`

## Tech stack

| Layer | Tools |
|-------|--------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, React 19) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| Icons | Lucide React |
| Data (current) | Mock modules in `lib/mock/` |
| Data (planned) | Prisma ORM, PostgreSQL |

## Project structure

```
app/
  page.tsx                 # Homepage
  posts/[slug]/page.tsx    # Article detail (SSG)
  layout.tsx               # Root layout & fonts
components/
  home/                    # Homepage sections
  post/                    # Article page sections
  layout/                  # Header & footer
  ui/                      # shadcn components
lib/
  mock/                    # All demo seed data & getters
    index.ts               # Barrel export (@/lib/mock)
    posts.ts               # Posts + article helpers
    categories.ts          # Categories
    authors.ts             # Authors (+ CMS localStorage extras)
    comments.ts            # Comment templates per post
  types/                   # Post, Comment, Category, Author
  post-url.ts              # URL helpers
  category-url.ts
```

## Getting started

### Prerequisites

- Node.js 20+
- npm (or pnpm / yarn)

### Install & run

```bash
git clone https://github.com/MiladJoodi/magazine-cms-fullstack.git
cd magazine-cms-fullstack
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other commands

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint
```

## Sample routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured story and latest posts |
| `/posts/urban-design-future` | Example article page |
| `/posts/[slug]` | Any slug from mock data (10 articles) |

## Author

**Milad Joodi** — Freelance Frontend Developer

- GitHub: [@MiladJoodi](https://github.com/MiladJoodi)
- LinkedIn: [linkedin.com/in/joodi](https://www.linkedin.com/in/joodi/)
- Project: [github.com/MiladJoodi/magazine-cms-fullstack](https://github.com/MiladJoodi/magazine-cms-fullstack)

## License

This project is private/portfolio work unless a license file is added separately.
