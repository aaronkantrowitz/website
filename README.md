# Aaron Kantrowitz

My personal website built with React Router v7 and deployed at [aaronkantrowitz.com](https://aaronkantrowitz.com).

## Tech Stack

- **Framework**: Svelte with TypeScript
- **Styling**: CSS
- **Build Tool**: Vite with HMR
- **Deployment**: Fly.io with automated GitHub Actions
- **Containerization**: Docker multi-stage build

## Development

### Local Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` to see the site locally.

### Building

Create a production build:

```bash
npm run build
```

## Deployment

The site automatically deploys to Fly.io when changes are pushed to the `main` branch via GitHub Actions.

### Manual Deployment

If you need to deploy manually:

```bash
flyctl deploy --remote-only
```

## Project Structure

```
app/
├── root.tsx          # Root layout and error boundaries
├── routes/           # File-based routing
├── components/       # Reusable UI components
└── app.css          # Tailwind configuration

public/               # Static assets
```

## Features

- ⚡️ Server-side rendering with SvelteKit
- 🎨 Modern styling with CSS
- 📱 Responsive design
- 🔄 Hot module replacement in development
- 🚀 Optimized production builds
- 🐳 Containerized deployment
- 🔒 TypeScript throughout

---

Built with ❤️ using Svelte
