# assets

Media used by the site.

```
assets/
├── images/   ← committed, served on the public page
└── videos/   ← local only (git-ignored, too large for the repo)
```

## Header image

The page header background is:

    assets/images/header.png

Replace that file (keep the same name) to change the header. It appears behind the
title with a translucent brand overlay for text readability — no code change needed.

- Recommended: a wide landscape image (e.g. 1920×800 or wider).
- To use a different name/format, update the `url("assets/images/header.png")` line in
  `../styles.css` (the `.hero` rule).

Until an image is present, the header falls back to a solid brand-colored gradient.

## Videos

`assets/videos/` is **git-ignored** — files there stay on your machine and are not
published (kept out because large binaries bloat the repo and slow the page). If you
later want a video on the site, compress it small or host it externally and embed it.
