---
title: "Why I Gave Up Claude Design for a Local Marp Setup"
description: "Why I left a hosted design tool, and which parts of Marp to tell Claude to use when it builds the replacement for you."
date: "2026-09-16"
category: "blog"
emoji: "📐"
tags: ["Marp", "Claude", "AI"]
---

For a short stretch, I finished my decks in Claude Design, the hosted design canvas from Anthropic Labs. The narrative, the bullets, and the sources stayed in Markdown in a Git repository, and the tool turned those pages into the deck itself. The Markdown was an input and never the deliverable, and the instructions in my own repository said so: the slide source was material for "building the final layout in a separate design app."

It did not last. Now one Markdown file produces the PDF I project at the venue. Marp renders it, a CSS theme carries the design, and the rules that theme follows are files I can read, diff, and hand to an agent. Here is a deck that came out of it:

::speakerdeck[Reaching an Amazon ECS Service Connect Service from Outside an ECS Service]{id="5101ad2d3b9c4f519a38de98bd611a27"}

This post is not a story about using less AI. Claude writes more of my decks today than it did on the canvas. It wrote the theme, it drafts the bodies, and it runs the checks before I look at a page. What changed is where it works — a terminal inside my repository instead of a hosted canvas.

## Why I Moved Off Claude Design

The loop had four stages: draft the narrative, write `slides.md`, hand it to the design tool, and export. Reviewing a deck meant reading the Markdown for order, coverage, and sources, then checking the rendered result separately for anything the layout had broken.

Three things wore me down, and they are in the order they hit me.

**It felt sluggish next to Claude Code, which I have open all day.** Small revisions are most of deck work — tighten this line, cut a bullet, redo one page. Each of those took long enough that I started batching them, then avoiding them. A tool that makes small changes expensive quietly pushes you toward accepting whatever is already on screen.

**Token spend was hard to steer.** I could not tell in advance whether a request would be cheap or expensive, and I had no reliable way to keep a long session inside a budget. In a terminal I can see what a turn costs, cut context, and decide what to spend on a rewrite. On the canvas I was guessing.

**It lost track of instructions and edited outside the scope I asked for.** A constraint I had set earlier would come back undone a few turns later, and a request aimed at one page would move things on another. That is the failure mode of an older chat assistant, and it is the one that actually made the work stressful: not the mistakes themselves, but having to re-check every page for changes I never asked for.

Two more problems were structural rather than friction. The rendered deck was not reproducible from the repository, so rebuilding an old talk meant opening the tool again. And the design was never written down. It existed as settings inside the tool and as pages I had already made, so checking whether a new page should follow an earlier one meant opening the tool and comparing. There was nothing an agent could read before touching a deck.

Claude Design is a research preview from Anthropic Labs, and it will keep moving. This is where it stood when I stopped using it.

## What a Local Setup Had to Replace

![Before: slides.md feeds a hosted design canvas holding both the layout and the design rules, which produces the PDF. After: slides.md, deck.css, DESIGN-GUIDE.md, and the slides check command all sit in the Git repository, and marp turns them into the PDF](/blog/images/claude-design-to-local-marp-slide-system/where-the-rules-live.png)

A hosted design system does several jobs at once, and a replacement has to cover each one deliberately:

- **A renderer** that turns a source document into slides.
- **A theme** that makes every deck look like it came from the same place.
- **A design system**: the rules about what is allowed, what is not, and why.
- **A review path** that catches a violation before the deck is projected.
- **Instructions an AI agent reads**, since Claude writes and edits most of my slide bodies.

## You Do Not Have to Learn Marp First

I did not read the Marp documentation and then start building. Claude wrote the whole setup and I reviewed diffs. If you can describe a deck you have already given, you can have this running in an afternoon without knowing what a Marpit directive is.

What does not delegate is the decisions underneath. Left alone, a model reaches for every feature the tool offers, because each one solves the page in front of it: a font-size override here, an inline style there, a card component to fill an empty half. Nothing is wrong on that page, and thirty pages later the deck has no rules at all.

So the useful thing to bring is a short list: which parts of Marp are allowed to touch a page, and which are not. That list is next.

## The Marp Surface I Actually Use

| Ask for | What it does |
| --- | --- |
| `--theme-set` with `/* @theme name */` | Every design decision lives in one CSS file, outside the slide source |
| Front matter `theme:`, `paginate:`, `size: 16:9` | Deck-wide setup, three lines, no per-page variation |
| Class directives, `<!-- _class: cover -->` | The only styling vocabulary a page gets: a class the theme defines |
| `--pdf` | The deliverable |
| `--preview` | The writing loop: it opens the deck and reloads on save |
| `--allow-local-files` | Local images and the profile photo resolve |
| `--html` | The little markup two layouts genuinely need |
| `--no-stdin` | Marp waits on standard input forever inside an agent's shell, and never converts |

That is one command, and the rest is bookkeeping:

```sh
marp talks/example-event/slides.md --pdf \
  --no-stdin --html --allow-local-files \
  --theme-set themes/
```

Two smaller decisions belong here as well. Pin the CLI version — a theme depends on how one renderer version handles flex layout inside a slide, and an unannounced upgrade reflows finished decks. And put the command behind a script, so the flags are not something anyone has to remember:

```sh
slides setup                      # install the pinned Marp CLI
slides new <target.md> [online|onsite]
slides build <slides.md> [out.pdf]
slides html  <slides.md> [out.html]
slides preview <slides.md>
slides check <slides.md>
slides doctor
```

Claude wrote that script, including the two flags above, after the first conversion hung on stdin and the second lost its images. Describing a failure is enough; you do not need to know which flag fixes it.

The layout it sits in stays the same for every talk:

```text
slides/
  bin/slides              the wrapper above
  themes/deck.css         the theme
  themes/deck-onsite.css  the venue variant
  templates/deck.md       starter copied for a new talk
  examples/showcase.md    every layout, for checking theme edits
  references/*.pdf        the decks the theme was derived from
  DESIGN-GUIDE.md         the rules
  AGENTS.md               what an agent must do before finishing
talks/<event>/slides.md   one directory per talk
```

## What I Tell It Not to Use

| Rule out | Why |
| --- | --- |
| `style:` blocks in front matter, HTML `style` attributes | Per-page CSS is how a deck stops having a design and starts having thirty |
| `_backgroundColor:`, `_color:` | Same, for color: a page that needs its own palette is a theme gap, not a page |
| Theme metadata that enables auto-scaling | Text that silently shrinks to fit hides the actual problem, which is that the page holds too much |
| `transition:` directives | The PDF ignores them, so they are motion nobody at the venue will see |
| Classes inherited from a general-purpose template (`dense`, `invert`, `cards`, `info-box`) | Every one of them is a way to cram or decorate a page instead of cutting it |

The pattern is the same in each row. Marp gives a page an escape hatch; the escape hatch makes one page work and the deck worse. Closing them early means the page has to say less — the outcome I wanted anyway.

## Hand Over the Decks You Already Gave

A theme is CSS, and I wrote none of it. You do not need a template repository to start from, or a designer — you need decks you have already presented. The PDFs, the PowerPoint files, whatever you last stood in front of: put them in the repository and ask Claude for two things.

One is a Marp theme: a single `/* @theme name */` stylesheet, plus the page classes a slide source will name to reach it. The other is a plain-language list of the conventions it found across those decks. Read that list before you read the CSS. It is short, it is in your language, and a wrong line in it becomes a wrong rule in every deck you make afterward.

![Decks already presented, as PDF or PPTX, are read by Claude, which returns two things: a plain-language list of the conventions those decks followed, and deck.css carrying the @theme declaration and the page classes](/blog/images/claude-design-to-local-marp-slide-system/theme-from-decks.png)

Both halves describe the same thing: the design those decks were already following. Cover layout, where the heading sits, the thin rule under it, the small logo in the corner, page numbers, margins, body and table sizes, the single accent color. The source decks stay in the repository afterward, so a later question — why is the heading here, why is this size — is answered against what shipped rather than against taste.

The decks will not show you what to do with leftover vertical space, so say it explicitly. Unprompted, a model centers the block and moves on. Mine spreads the remaining height between bullet items up to a cap, and on a page with several blocks gives the last one a double share, so the slack lands in the bottom margin instead of opening a hole under the subtitle.

The stylesheet that came back is one file. It imports Marp's `default` theme, then defines that surface as custom properties:

```css
/* @theme deck */
@import "default";

:root {
  --slide-background: var(--neutral-0);
  --slide-heading: var(--ink-900);
  --slide-accent: var(--accent-500);
  --text-body: 24px;
  --page-padding-x: 64px;
  --content-gap: 11px;
}
```

If you end up needing a second look — another brand, a print variant, a version for a room where the back row sits far from the screen — derive it instead of copying it. Mine is a venue split: `deck-onsite.css` imports the base theme and changes type size and weight, nothing else. Colors, spacing, page classes, and prohibitions stay shared, so a fix to the base reaches both, and a deck picks its variant in front matter with `theme: deck-onsite`. Keep the list of differences short enough to say in one sentence. Past that, it is a second design rather than a variant, and you are maintaining two of them.

A company or community template as a starting point works too, as long as you keep the original copy in its own directory, unmodified, with a record of where it came from and at which commit. Then a question about a layout decision is a diff between two files in the same repository rather than a memory of what someone's template did.

## Write the Rules Down

`DESIGN-GUIDE.md` is the part that actually replaces the hosted design system, and it is the file I spent the most time on. It grows out of that first list of conventions, and every rule in it still points back at the decks in the repository.

It names the page classes the theme defines (`cover`, `profile`, `compact`, `divider`, `no-page`) and the few helpers allowed alongside them (`accent`, `columns`, `role-panels`, `small`, `muted`, `label-detail-list`). Then it repeats the prohibitions from the table above in the model's working language, with a replacement for each, because a rule an agent reads before editing is worth more than one it reads in a review.

Section dividers get the strictest rule, because they are the easiest way to make a deck look structured without making it clearer. They are off by default. Using one requires a topic change that adjacent headings cannot carry on their own, and a recorded justification directly above it:

```markdown
<!-- divider-justification: the talk moves from how the system is meant to work to the outage itself, so the subject changes from the architecture in general to the environment where it failed -->
<!-- _class: divider -->

# The environment the outage happened in
```

"A new chapter starts here" is explicitly not a valid reason.

## Make the Rules Executable

A written rule that nothing enforces decays, and an agent that has read a guide will still reach for a font-size override at midnight. `slides check` runs a lint pass before every build, preview, and HTML export, and it fails the command rather than warning:

```sh
slides check talks/example-event/slides.md
```

The checks are deliberately blunt — `grep` and a short `awk` program over the Markdown, one per row of the table above. One of them, as it appears in the script:

```sh
if grep -En '^[[:space:]]*style:[[:space:]]*\||<style|[[:space:]]style=' "$input"; then
  printf 'Page-level CSS is not allowed; use a theme class.\n' >&2
  failed=1
fi
```

Every failure prints the offending line numbers and a pointer back to `DESIGN-GUIDE.md`. Reading a rule is optional; passing it is not.

A theme change gets one more check. `examples/showcase.md` exercises every layout the theme supports, so rendering it after editing CSS shows what moved.

## Point the Agent at the Rules

The repository's agent instructions are part of the design system rather than a convenience. `AGENTS.md` in the slide directory (with `CLAUDE.md` as a symlink to it) requires reading `DESIGN-GUIDE.md` before creating or editing a deck, running `check` before finishing, and rendering the PDF to images afterward to inspect every page for clipped text, overlap, and margins.

The guide also carries a section on what AI-generated decks tend to look like, which is easier to police in text than on a canvas: a heading, a subtitle, and four bullets repeated on every page; the same conclusion restated in heading, subtitle, body, and figure caption; term-and-definition pairs stacked into a glossary; a summary page that rewords the body instead of stating the outcome. Those are the failures I could not describe to a design tool at all, and they are the ones that make a deck feel machine-made.

That section has a counterweight, added after I overcorrected: avoiding a generated look is not a reason to delete background the audience needs. If a first-time listener cannot follow an acronym, the answer is another page, not a terser one.

## Diagrams Belong in draw.io

Marp does not help with an architecture diagram, and neither does a screenshot of one drawn in a hurry. Ask Claude for a draw.io file instead, keep it in the talk's directory next to the slides, and export a PNG or SVG for the deck to reference. The two diagrams in this post were made that way.

Reach for draw.io's MCP server here rather than pasting XML around. With it connected, Claude edits the diagram where it lives and hands back the file, so "make the collector its own box" is one turn instead of a translation exercise. Without a server it still works, because a `.drawio` file is XML that Claude can edit in the repository directly; you just run the export yourself.

Either way the point is the same as everywhere else in this setup: the diagram is a file. It stays editable, so a box that turns out wrong at rehearsal is a box you fix rather than a picture you redraw, and its history is a diff. Exporting with the diagram embedded (`-e` on the draw.io CLI) keeps that true of the PNG as well — the image reopens in the editor as a working document.

Name the export `diagram.png` and keep `diagram.drawio` beside it; avoid the `diagram.drawio.png` double extension some tools suggest, because editors that recognize `.drawio` will try to open the export as a source file.

## The Day-to-Day Loop

**Write the structure.** The deck starts as plain Marp Markdown: page breaks, headings, and what each page has to carry. No classes, no styling, nothing about how any of it looks. At this stage the file is an outline that happens to be in slide format, and it is the part worth arguing with yourself about, because no amount of layout fixes a page that should not exist.

**Apply the design system.** Claude takes that draft and dresses it — the page classes from the guide, and CSS added to the theme when a layout the deck needs is not there yet. Because the rules are a file, this step is mostly mechanical, and the diff is small enough to read.

**Preview and fix.** `slides preview` converts the deck, opens it in Chrome, and then watches the file and reloads on save. What is on screen is the same HTML the PDF is rendered from — same theme, same images — so a fix is: change the line, glance up, keep going. This is the phase the canvas used to own, and it is the one I was most worried about losing. Having the rendered page update as I save turned out to be the part that mattered, not being able to drag things around on it.

Before you go looking for that loop in your editor: a Marp preview inside an editor extension is a different renderer, and it only applies the themes registered in that editor's own settings. A custom theme shows up there as the plain default until you register it, which is easy to misread as the theme being broken.

**Export.** One command lints the deck and writes the PDF. Nothing is running in the background by then; the preview is a writing tool, not part of the build.

```sh
# start from the starter, then write the structure into it
slides new talks/example-event/slides.md onsite

# keep this open once the classes are in; it reloads on every save
slides preview talks/example-event/slides.md

# lint, then produce the deliverable
slides build talks/example-event/slides.md
```

Nothing leaves the machine, the PDF lands next to its source, and the diff of a revision is readable in a pull request.

## Constraints Instead of Nudging

The change I did not expect to like this much is that the deck stopped asking to be nudged.

A large share of the time slide software consumes goes into adjustments that change nothing for the audience: a box moved four pixels, a font dropped one step so a line fits, a bullet list squeezed into whatever space is left. Here those decisions were made once, in the theme and the guide, and every page inherits them. There is nothing to drag, so there is no evening spent dragging.

That also turns a bad-looking page into information instead of a chore. A page that will not fit is telling me it carries two ideas rather than one, and the only moves left are to split it or cut it. On a canvas I would have made it fit and moved on, and the deck would have been worse in a way nobody could point to afterward.

Maintaining the theme is the other half of that, and I want that work. It is mine: no hosted design system propagates into it, and nothing resets when someone else ships an update. Early on I paid for it in CSS bugs — footer line height eating into the body, bullet-only pages stretching, the weight hierarchy collapsing when everything went bold for the onsite theme. Each one is now a commit with a reason attached, and every later deck starts from the fixed version. That is the opposite of the loop I left, where the same problem could come back on the next turn.

None of this serves a deck that is mostly bespoke artwork, where each page is its own composition. If the visuals are the deliverable, a canvas is the right tool. This setup is for talks whose value is the argument, and it is built so the argument is the only thing left to work on.

## In Closing

I used Claude Design alone. With a team sharing one canvas the conclusion may come out differently. If you are also speaking solo, the setup here takes an afternoon and Claude does most of it. After that the deck is one Markdown file, and the rest of your time goes to the talk. Build it with Claude, and enjoy the talks.
