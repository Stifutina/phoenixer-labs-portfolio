# Phoenixer Labs portfolio

The site of Sergey and Anastasia Naydenko. Astro, static pages, one serverless function for the contact form, deployed on Vercel.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static pages + Vercel function in .vercel/output
npm run check      # type check
```

## Where things live

| What | Where |
| --- | --- |
| Projects (one Markdown file each) | `src/content/work/*.md`, schema in `src/content.config.ts` |
| Project images | `src/assets/work/<project>/` (Astro resizes and converts them at build) |
| People, CV links, the five areas (Backend, AI, 3D, Frontend, Design) | `src/data/site.ts` |
| Home, area pages (`[area].astro`), team, contact | `src/pages/` |
| CVs | `public/cv/` (linked from the team page and footer) |
| Plexus background | `src/scripts/plexus.ts`, shaders in `src/shaders/` |
| Portraits, logo | `src/assets/people/`, `src/components/Logo.astro` |
| Video loops | `public/media/` (served as is) |
| Contact endpoint | `src/pages/api/contact.ts` |
| Original images and screenshots | `source-assets/` (not shipped) |

### Adding a project

1. Put images in `src/assets/work/<slug>/`.
2. Copy any file in `src/content/work/`, rename it to `<slug>.md`, and edit the front matter. `owner` is `sergey` or `anastasia`; `area` is one of `backend`, `ai`, `3d`, `frontend`, `design`, and `also` lists any other area pages it should appear on. Add `featured: <n>` to show it on the home page (lower numbers come first).
3. Pick how the page presents the work with `layout`: `case` (engineering, one wide hero), `stage` (3D stills on a lit stage), `cinema` (full-screen looping `video`), `compare` (before/after boards with `caption` and `detail` per picture) or `boards` (a wall of brand boards; `wide: true` spans a board across). `glow` sets the project's own colour.

## Contact form → Telegram

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy its token.
2. Send the bot any message (or add it to a group), then open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id`.
3. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in Vercel (Project → Settings → Environment Variables) and in a local `.env` for testing. See `.env.example`.

Without them the form shows a clear "not connected yet" message and points people to Upwork and LinkedIn.
