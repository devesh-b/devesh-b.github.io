# Agent Guidelines — devesh-b.github.io

Personal academic portfolio for Devesh Bhaskaran. Custom Python SSG (mettu) + Jinja2 templates, Tailwind v4 + DaisyUI v5, built via Vite.

## Key Commands

```bash
# Full production build (SSG → Vite → dist/)
npm run build

# SSG only (fast iteration on templates/content)
python3 src/main.py

# Dev server with HMR
npm run dev
```

## File Layout

| Path | Purpose |
|---|---|
| `content/` | Markdown + YAML front matter — pages, projects, blog posts |
| `templates/` | Jinja2 HTML templates |
| `assets/css/main.css` | All custom CSS (Tailwind theme, components, animations) |
| `src/main.py` | SSG entry point — renders templates → static HTML |
| `_config.yml` | Site-wide config (name, URL, social links, nav, etc.) |

## Stack

- **SSG**: `src/main.py` renders Jinja2 + YAML/Markdown → root HTML; `npm run build` = Vite → SSG → Rollup → `dist/`; `closeBundle()` copies static assets
- **CSS**: Tailwind v4 (CSS-first, no `tailwind.config.js`); DaisyUI v5; custom palette via `@theme {}` block
- **Themes**: `academic-light` / `academic-dark` on `data-theme` attribute; dark selector: `@variant dark ([data-theme="academic-dark"] &)`
- **Deploy**: GitHub Actions pushes `dist/` to `gh-pages` on every push to `main`

## Common Patterns & Gotchas

- **Literal `{}` in Jinja2 output**: use `{{ '{' }}` and `{{ '}' }}` — needed for BibTeX block output
- **Loop-scoped mutation**: use `{% set ns = namespace(i=0) %}` + `{% set ns.i = ns.i + 1 %}` inside loops
- **Custom colours**: `--color-teal`, `--color-plum`, `--color-forest` in `@theme {}`; dark overrides in `[data-theme="academic-dark"]`
- **Per-page JSON-LD**: `{% block jsonld %}{% endblock %}` in `base.html`, overridden per template
- **`.card-glow > * { position: relative; z-index: 1 }`** — child elements that need `position: absolute` must use `!important` to override this rule
- **Animated CSS custom properties**: use `@property` declarations (Houdini) for animating values like `--ring-angle` via `@keyframes`
