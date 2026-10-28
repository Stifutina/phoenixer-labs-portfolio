---
title: "Data and agent layer for an AI commerce platform"
owner: sergey
summary: "The Postgres schema, the MCP server and client, and role-based auth behind a multi-tenant platform where AI agents answer from a merchant's own catalog."
when: 2025–2026
role: "Backend engineer, owner of the data model, MCP layer and auth"
area: ai
also: [backend]
stack: [TypeScript, Node.js, PostgreSQL, pgvector, Kysely, Model Context Protocol, Fastify, BetterAuth, Zod, Google Cloud, Vitest]
diagram: agent-platform
nda: true
featured: 1
order: 1
---

An e-commerce platform where AI agents answer customer and staff questions from each merchant's own products and documents. Several businesses share one deployment, and every user role sees a different slice of the data. The client is under NDA, so this page covers the engineering, not the product.

## What I owned

**The database.** The whole Postgres schema and every migration: tenants, users and roles, a multi-level product catalog, flat tag taxonomies, links between documents and catalog nodes, and the vector tables retrieval reads from. Queries are typed end to end with Kysely; vectors live in the same database through pgvector.

**The MCP server and client.** The Model Context Protocol server that gives agents their tools, such as catalog-scoped search and document retrieval, and the client inside the agent runtime that discovers and calls them. Tool inputs and outputs are typed and validated with Zod on both sides.

**Auth and roles.** BetterAuth sessions with role-based access, so each kind of user reaches only the data and tools their role allows.

## Why it matters

An agent is only as trustworthy as the data it can reach. Most of this work was about that: every answer grounded in real catalog records, scoped to the right business and the right person.
