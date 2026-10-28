import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { areaKeys } from './data/area-keys'

const work = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        owner: z.enum(['sergey', 'anastasia']),
        // Short line for cards and the project header
        summary: z.string(),
        when: z.coerce.string().optional(),
        role: z.string(),
        // Main area, plus any other area pages the project should also appear on
        area: z.enum(areaKeys),
        also: z.array(z.enum(areaKeys)).default([]),
        stack: z.array(z.string()),
        cover: image().optional(),
        gallery: z.array(z.object({
            src: image(),
            alt: z.string(),
            // Short name for the picture and a line about it, shown by the compare and boards layouts
            caption: z.string().optional(),
            detail: z.string().optional(),
            // Boards layout: span the full width
            wide: z.boolean().default(false),
        })).default([]),
        coverAlt: z.string().default(''),
        // CSS object-position for the cover when a card crops it
        coverFocus: z.string().default('center'),
        // Small label on the cover, e.g. when the screen is representative rather than the client's
        coverNote: z.string().optional(),
        // Card size on an area grid
        size: z.enum(['wide', 'tall', 'normal']).default('normal'),
        // Diagram drawn in code instead of an image (NDA projects)
        diagram: z.enum(['agent-platform']).optional(),
        /**
         * How the project page presents the work
         *  case     text first, one wide hero, staggered gallery (engineering and AI work)
         *  stage    renders on a lit stage beside a sticky story column (3D stills, small originals)
         *  cinema   full-bleed looping video under the title, then the cuts for each screen
         *  compare  before and after boards, each with the part's name and its final mesh size
         *  boards   a presentation wall of brand boards, black and white alternating
         */
        layout: z.enum(['case', 'stage', 'cinema', 'compare', 'boards']).default('case'),
        // The project's own light: tints the page glow and the stage behind the work
        glow: z.string().optional(),
        // Looping video for the cinema layout, served from /public
        video: z.object({ src: z.string(), poster: z.string() }).optional(),
        live: z.url().optional(),
        // Other places the work lives: a model on Hugging Face, a Behance case, a store listing
        links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
        nda: z.boolean().default(false),
        featured: z.number().optional(),
        order: z.number(),
    }),
})

export const collections = { work }
