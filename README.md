# 🏫 SMAN Modal Bangsa Web Portal

<div align="center">

[![Next.js Version](https://img.shields.io/badge/Next.js-16.2.6--canary-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-%E2%89%A5_1.3-fbf0df?style=for-the-badge&logo=bun)](https://bun.sh/)
[![WordPress REST API](https://img.shields.io/badge/WordPress_API-v2-21759b?style=for-the-badge&logo=wordpress)](https://developer.wordpress.org/rest-api/)

A modern, high-performance, bilingual school portal built with the Next.js 16 App Router architecture and React 19, powered by a headless WordPress REST API.

[Explore Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure)

</div>

---

## ✨ Overview

**SMAN Modal Bangsa Website** is a state-of-the-art school portal that seamlessly bridges high-fidelity user experiences with powerful backend administration. The frontend consumes dynamic content from an existing WordPress backend via the `/wp-json/wp/v2` REST API, using **Incremental Static Regeneration (ISR)** to achieve blazing-fast load times, near-instantaneous page transitions, and significantly reduced backend server overhead.

---

## 🚀 Key Features

### 🎨 Premium UI & Motion Experience
- **Smooth Scrolling:** Global smooth inertia-based scrolling powered by **Lenis** with page-transition scroll restoration.
- **Magic Hover Cards:** Interactive glowing cards (Aceternity UI) that trace user mouse movements on all news card grids.
- **Scroll Reveal Animations:** Micro-animations and staggered fade-ins powered by **Framer Motion** for a premium feel.
- **Infinite Slider:** Smooth, touch-enabled swipe gestures, autoplay, and fade animations on the home screen using **Embla Carousel**.

### ⚙️ Core Technical Features
- **🌐 Native Bilingual Routing:** Dual-language localization (ID/EN) using Next.js App Router routing structure.
- **⚡ High Performance:** Static generation with background revalidation (ISR) for fast load speeds.
- **📊 View Counter System:** Tracks and displays view counts directly integrated with WordPress post metrics.
- **🔍 Full-Text Search & Pagination:** Easy navigation and search options for news and achievements.
- **🖼️ Optimized Media Assets:** Custom layout components ensuring aspect ratios are kept using Next.js Image optimization.
- **🛡️ Safe HTML Content:** Server-side sanitization of HTML content delivered from WordPress.
- **🔎 SEO & Metadata:** Automated generation of `sitemap.xml`, `robots.txt`, dynamic OpenGraph tags, and JSON-LD schema schemas.

---

## 🛠 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | [Next.js 16](https://nextjs.org/) (App Router) | React framework for web production |
| **Runtime & PM** | [Bun](https://bun.sh/) | Blazing fast JavaScript bundler & package manager |
| **UI Library** | [React 19](https://react.dev/) | Component-driven UI development |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling engine |
| **Animations** | [Framer Motion](https://motion.dev/) | Smooth components & scrolling animations |
| **Carousel** | [Embla Carousel](https://www.embla-carousel.com/) | Modern touch-friendly slider engine |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Inertial smooth scrolling hook |
| **Data Fetching** | WordPress REST API | Headless CMS architecture |
| **Localization** | Native i18n | Locale routing & dictionary translations |

---

## 📦 Getting Started

### Prerequisites
- **Bun** $\ge$ 1.3 installed on your system.
  - *Windows (PowerShell):* `powershell -c "irm bun.sh/install.ps1 | iex"`
  - *macOS/Linux:* `curl -fsSL https://bun.sh/install | bash`

### 1. Clone & Enter Repository
```bash
git clone https://github.com/faruqeclypst/sman-modalbangsa.git
cd sman-modalbangsa
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Configure the endpoints:
```env
NEXT_PUBLIC_WP_API_URL=https://sman-modalbangsa.sch.id/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=https://sman-modalbangsa.sch.id
```

### 4. Run Development Server
```bash
bun run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

---

## 📁 Project Structure

```bash
src/
├── app/                  # Next.js App Router root
│   ├── [lang]/           # Locale-routed layouts and views
│   │   ├── berita/       # News module
│   │   ├── profil/       # School profile pages
│   │   ├── prestasi/     # Achievements pages
│   │   ├── kontak/       # Contact page
│   │   ├── layout.tsx
│   │   └── page.tsx      # Main Landing Page
│   ├── global-error.tsx
│   ├── sitemap.ts        # Dynamic sitemap generator
│   ├── robots.ts         # Automated robots.txt rule
│   └── globals.css
│
├── components/           # Reusable UI component modules
│   ├── home/             # Home page sections & Hero Slider
│   ├── layout/           # Header, Footer, and Sidebar navigation
│   ├── news/             # News lists, cards, and View Counter elements
│   └── ui/               # Core design elements (Lenis, Magic Card, FadeIn)
│
├── i18n/                 # Localization configurations
│   ├── config.ts
│   ├── dictionaries.ts   # Loader utilities
│   └── dictionaries/     # Language dictionary JSON files (id/en)
│
├── lib/                  # Library & helper layers
│   ├── wp.ts             # WordPress API connection client
│   ├── wp-types.ts       # TypeScript schemas for WP entities
│   └── utils.ts          # Styling helper utilities
│
└── proxy.ts              # Localized routing request filter
```

---

## 🌍 Internationalization (i18n)

The project leverages Next.js native language routing. 

### Supported Locales
* 🇮🇩 **Indonesian (id)** - Standard locale
* 🇺🇸 **English (en)** - Alternative locale

### Localization Workflow
1. Translation strings are defined in static JSON dictionary files:
   - `src/i18n/dictionaries/id.json`
   - `src/i18n/dictionaries/en.json`
2. Routing requests that do not specify a locale prefix (`/id` or `/en`) are automatically parsed and redirected in middleware according to:
   - The value stored in the `NEXT_LOCALE` cookie.
   - The user agent's `Accept-Language` headers.

---

## 📰 Headless WordPress Integration

All communication with the WordPress REST API is configured inside `src/lib/wp.ts`.

### Example Helpers

#### Get Posts
```typescript
import { getPosts } from "@/lib/wp";

const { posts, totalPages, totalPosts } = await getPosts({
  page: 1,
  perPage: 10,
  search: "akreditasi",
});
```

#### Get Single Post Details
```typescript
import { getPostById } from "@/lib/wp";

const post = await getPostById(123); // Returns Post object or null
```

### ⚡ ISR Cache Configuration
The application leverages static site caching with automatic background revalidation:
```typescript
export const revalidate = 3600; // Cache pages for 1 hour
```
This strategy ensures blazing-fast rendering speeds for school visitors and prevents high server loads on the WordPress host during heavy traffic.

---

## 🚀 Deployment

The project is structured to deploy smoothly on any hosting architecture:

- **▲ Vercel:** (Recommended) Standard configuration works out-of-the-box.
- **Docker:** Build a lightweight container to host on virtual private servers (VPS).
- **Node.js/Bun Server:** Start the optimized build using production process managers like PM2.

### Build and Start Commands
```bash
# Build production bundle
bun run build

# Start production build
bun run start
```

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **`dev`** | `bun run dev` | Starts Next.js development server with hot-reload |
| **`build`** | `bun run build` | Compiles optimized static assets for production |
| **`start`** | `bun run start` | Runs the built production bundle server |
| **`lint`** | `bun run lint` | Analyzes code for style checks and warnings |
| **`typecheck`** | `bun run typecheck` | Validates TypeScript static types and declarations |

---

## 🔒 Notes & Constraints
- **No Static Export:** Since it uses dynamic i18n middleware routing and on-demand ISR caching, the project must run on a Node/Bun server environment rather than simple static CDN hosting.
- **WordPress Connectivity:** The Next.js server runtime must have direct network access to the configured `NEXT_PUBLIC_WP_API_URL` to fetch content during static page compilation and revalidation.

---

<div align="center">

Built with ❤️ for SMAN Modal Bangsa using Next.js 16 & WordPress REST API.

</div>
