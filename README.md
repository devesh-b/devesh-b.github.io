# devesh-b.github.io

Personal academic portfolio of **Devesh Bhaskaran** — digital design engineer, IC researcher, and PhD applicant (2027 intake).

**[devesh-b.github.io →](https://devesh-b.github.io)**

[![Deploy](https://github.com/devesh-b/devesh-b.github.io/actions/workflows/deploy-mettu.yml/badge.svg)](https://github.com/devesh-b/devesh-b.github.io/actions/workflows/deploy-mettu.yml)
![GitHub last commit](https://img.shields.io/github/last-commit/devesh-b/devesh-b.github.io)

---

## About

Covers published IC design research (APCCAS, NKCon), open-source RTL/layout projects (SkyWater SKY130A, Efabless tapeouts), and work-in-progress hardware. Built to serve as the primary reference for PhD applications in analog/RF IC design and digital SoC.

## Stack

| Layer    | Tool                                                                             |
| -------- | -------------------------------------------------------------------------------- |
| SSG      | [mettu](https://github.com/devesh-b/mettu) — custom Python + Jinja2             |
| CSS      | [Tailwind v4](https://tailwindcss.com/) + [DaisyUI v5](https://daisyui.com/)    |
| Fonts    | Fraunces · DM Sans · IBM Plex Mono (Google Fonts variable)                       |
| Build    | [Vite](https://vitejs.dev/)                                                      |
| Deploy   | GitHub Actions → GitHub Pages (`gh-pages` branch)                                |

Content lives in `content/` as Markdown + YAML front matter. Templates are Jinja2 in `templates/`. `npm run build` runs the SSG then bundles CSS/assets via Vite.

## Local development

Requires **Python 3.12+** and **Node 22+**.

```bash
# Install dependencies
pip install -r requirements.txt
npm install

# Development build + watch
npm run dev

# Production build → dist/
npm run build
```

## Project structure

```
content/        # Markdown pages + YAML front matter
templates/      # Jinja2 HTML templates
assets/
  css/          # main.css (Tailwind + custom)
  images/       # static images
src/
  main.py       # SSG entry point
  *.py          # renderers, image processing, etc.
dist/           # built output (git-ignored, deployed to gh-pages)
```

## License

Source code MIT. Content (text, images, research) © Devesh Bhaskaran — not for reuse without permission.
