# ota1022.github.io

Personal portfolio website for Itaru OTA.

<https://ota1022.github.io/>

## Development

```bash
npm install
npm run dev
npm run check
```

## CV generation

The Pages workflow generates `public/cv.pdf` from
`content/cv/resume.en.md` when the Markdown source is present. Pull requests
receive the generated PDF as a `cv-preview` workflow artifact, while builds on
`main` include it directly in the deployed site.

Local generation requires Pandoc, XeLaTeX, and Poppler. The PDF uses XeLaTeX's
default font so that builds do not depend on operating-system fonts:

```bash
bash scripts/generate-cv.sh
```

## Tech Stack

- Next.js 16 (App Router)
- Material UI
- Markdown with validated embed directives (Blog)

See [Blog authoring](docs/blog-authoring.md) for the frontmatter schema,
supported embeds, validation rules, and preview workflow.
