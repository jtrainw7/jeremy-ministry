# FCA Ministry Impact Report: Sept–Oct 2026

Static site (HTML/CSS/JS). No build step. Netlify settings: no build command, publish directory `.`

## Structure
```
index.html   css/styles.css   js/script.js
images/{brand,hero,ministry,stories}   videos/
```

## Links used (edit in index.html if they change)
- Giving: https://my.fca.org/?form=jeremywomack&keyword=Jeremy%20Womack
- Thursday Bible study: https://meet.google.com/bfu-ueka-xbr

## Next edition
1. Keep this edition: copy `index.html` into `editions/2026-09/index.html`.
2. Replace photos in `images/`, edit the text in the root `index.html`, update dates.
3. Paths are root-absolute (`/css/...`), so they work from any folder on Netlify.
4. Preview locally with `python3 -m http.server` from this folder.

## After you know your Netlify address
Change `og:image` in `index.html` to the full URL (e.g. `https://yoursite.netlify.app/images/hero/huddle-practice.webp`) so link previews show the photo in texts and social posts.
