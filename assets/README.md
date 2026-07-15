# assets

Put images used by the site here.

## Header image

Upload your header/banner image as:

    assets/header.jpg

It automatically appears as the background of the page header (behind the title),
with a translucent brand overlay applied for text readability. No code change needed —
just add the file with exactly this name.

- Recommended: a wide landscape image (e.g. 1920×800 or wider), JPG or PNG.
- If you use a different name or format, update the `url("assets/header.jpg")` line in
  `../styles.css` (the `.hero` rule) to match.

Until `header.jpg` is present, the header falls back to a solid brand-colored gradient.
