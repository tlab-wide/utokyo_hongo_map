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
published (kept out because large binaries bloat the repo and slow the page).

The video shown on the site is hosted on YouTube and embedded in `../index.html`
(the "Preview" section): https://youtu.be/55ZpqTAqM7c — so the local `.mp4` is just
a backup and does not need to be committed.
