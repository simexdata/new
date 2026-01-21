# SIMS v6.2 — Vite Scaffold for Netlify

Този пакет добавя липсващите файлове (`index.html`, `package.json`, `vite.config.js`, `netlify.toml`, `_redirects`) към вашата папка `src/`, за да може **Netlify** да билдне проекта автоматично.

## Локален билд
```bash
npm ci
npm run dev     # локален dev сървър
npm run build   # production билд -> dist/
```

## Netlify (Git deploy)
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- NODE_VERSION: 20
- `_redirects` файл за SPA: вече е включен.

## Ръчен deploy (без Git)
1) `npm run build`
2) Качи **съдържанието на `dist/`** в Netlify → Deploys → Upload a deploy.
