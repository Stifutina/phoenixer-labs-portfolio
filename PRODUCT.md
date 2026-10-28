# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output) deployed on Vercel. Three.js only where a scene earns it (hero background), loaded lazily. Project pages from Astro content collections. Contact form posts to a Vercel serverless function that forwards to a Telegram bot. English only.

## Users

Clients hiring freelance or contract engineering help, mostly arriving from Upwork, LinkedIn or a direct link: founders, product owners and agency leads. They are judging in a few minutes whether this team can ship their thing: a backend or AI integration, a 3D/interactive front end, or a product that needs both. Some need one person; some need the pair.

## Product Purpose

The portfolio of Phoenixer Labs, a two-person studio: Sergey Naydenko and Anastasia Naydenko, a married couple from Ukraine. Success is a qualified client opening the contact page and writing a message.

## Positioning

One small team that covers the whole path from database to pixels to model: Sergey builds backends, data models and AI infrastructure (MCP servers and clients, auth and roles, Postgres); Anastasia builds 3D, interactive front ends and trains her own models. Each has 15 years of experience. A client gets two seniors who already work as one unit, with no hand-off gap between the backend, the AI and the visual layer.

## Operating Context

- Visitors usually come from an Upwork proposal or profile and compare against other freelancers' portfolios.
- Much of Sergey's work is under NDA: describe role and technology, never client names or identifying details.
- One large AI commerce platform (multi-tenant, role-based) must stay anonymous: no name, domain, logo, screenshots that reveal it, or product-specific terms. Sergey owned the full Postgres schema and migrations, the MCP server and client, and authentication with roles (BetterAuth).

## Capabilities and Constraints

- Site areas: studio home, Sergey's wing, Anastasia's wing, a page per project, a separate contact page. A contact link is reachable from every view.
- English only.
- No quoted Upwork numbers (Job Success, badges, earnings, job counts). Link to the profiles instead.

## Brand Commitments

- Name: Phoenixer Labs.
- Dark, clean, minimal, fast; asymmetric layouts (user's stated preference).
- Each person's work area is distinguishable by its own color theme.
- Copy must read as written by people, not by a generator: concrete, specific, no buzzword stacks.

## Evidence on Hand

- Anastasia's projects (Upwork portfolio): Three.js portfolio of 40 scenes (live: https://3d-threejs-exercises.vercel.app/), AI support ticket board with a fine-tuned DistilBERT classifier (EN/RU/UK, over 80% accuracy on unseen messages, deployed on Cloudflare Worker + Container), RAG document chat with LoRA fine-tuned Qwen3-4B on Hugging Face ZeroGPU, 3D retopology of bicycle mechanical parts from STEP, Bella Terra Stone logo system, 3D bunny character with rigging and animation, 3D animated landscape background for a Framer site, logo to 3D video, strawberry juice product animation, low-poly flying island, AR-style furniture promo, low-poly donut cafe game asset pack.
- Sergey's projects (Upwork, partly NDA): conversion optimization platform (Node.js, TypeScript, MongoDB, Elasticsearch, AWS, GCP, WYSIWYG banner editor, mail integrations, timezone-aware scheduling), AI print-on-demand generator (OpenAI, Node.js, MongoDB, Printify and Shopify APIs), mobile app API for an EV customization app (Node.js, serverless, OAuth, image processing), plus the anonymous AI commerce platform above.
- Profiles: Anastasia Upwork https://www.upwork.com/freelancers/~01925515c7b3d730e5, Sergey Upwork https://www.upwork.com/freelancers/~01f0076778d4183ff8, Sergey LinkedIn https://www.linkedin.com/in/serhii-naydenko-96b47b121, Anastasia LinkedIn https://www.linkedin.com/in/%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D1%81%D1%96%D1%8F-%D0%BD%D0%B0%D0%B9%D0%B4%D0%B5%D0%BD%D0%BA%D0%BE-49b979b4/, Instagram https://www.instagram.com/anastasia.3d.art
- Absent, do not fabricate: client logos, metrics beyond those stated above, testimonials other than ones the user provides, pricing.

## Product Principles

1. Show the work first; claims only where a project backs them.
2. Make the pair legible: two distinct people, one team, one contact.
3. NDA respect is a feature: describe the engineering, never the client.
4. Every page is one step from the contact form.
5. Speed is part of the pitch: a 3D studio site that loads instantly proves the craft.

## Accessibility & Inclusion

WCAG 2.2 AA contrast on dark backgrounds; motion respects prefers-reduced-motion; the site works without WebGL.
