# Portfolio

Personal site of Jaime García-Page, backend and middleware developer.
Live at <https://jaimegpm.github.io/Portfolio/>.

## Stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4, with every colour and font defined once in `src/styles/tokens.css`
- No runtime dependencies beyond React: fonts are self hosted, there are no
  analytics, no external requests and no forms

## Development

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
npm test
```

Browser regression tests use Microsoft Edge through Playwright. They run
against a fresh production build, including its Content Security Policy.
The accessibility scan bypasses the policy only to inject axe into its own
isolated browser context.

## Deployment

The site is a static build published to GitHub Pages from the `dist` folder:

```bash
npm run deploy
```

The production build adds a Content Security Policy that only allows the
site's own scripts, styles, fonts and images. Development keeps it off because
Vite injects its own inline scripts there.

## Layout

| Path                      | Holds                                             |
| ------------------------- | ------------------------------------------------- |
| `src/styles/`             | design tokens, base styles and the Tailwind entry |
| `src/i18n/`               | Spanish and English dictionaries and the provider |
| `src/data/`               | profile, projects and stack                       |
| `src/components/`         | layout, sections and shared pieces                |
| `src/effects/`            | the byte trail behind the cursor and small hooks  |
| `src/theme/`              | theme state and the animated theme switch         |
| `public/fonts/`           | Doto and JetBrains Mono, woff2                    |
| `public/cursors/`         | the custom cursor, one file per theme and state   |
