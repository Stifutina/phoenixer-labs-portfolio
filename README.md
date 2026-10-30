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

## Contact form → Telegram group

Messages from the contact form are posted by a bot into the team's Telegram group, so they don't sit in one person's private chat.

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy its token.
2. Add the bot to the group, then send any message in the group.
3. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy the group's `chat.id` (negative; supergroups start with `-100`).
4. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in the hosting settings (and in a local `.env` for testing), then redeploy. See `.env.example`. If the group uses topics, also set `TELEGRAM_THREAD_ID`.

If Telegram upgrades the group to a supergroup, its id changes. The form follows the new id automatically and logs it, so you can update `TELEGRAM_CHAT_ID`.

Without the variables the form shows a clear "not connected yet" message and points people to Upwork and LinkedIn.
