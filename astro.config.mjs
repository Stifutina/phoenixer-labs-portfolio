// @ts-check
import { defineConfig, envField } from 'astro/config'
import vercel from '@astrojs/vercel'

export default defineConfig({
    site: 'https://phoenixer-labs.vercel.app',
    output: 'static',
    // The site used to be split by person; those pages now live on the team page
    redirects: {
        '/sergey': '/team#sergey',
        '/anastasia': '/team#anastasia',
    },
    adapter: vercel(),
    env: {
        schema: {
            TELEGRAM_BOT_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
            TELEGRAM_CHAT_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
            // Only for groups with topics: the topic the messages go to
            TELEGRAM_THREAD_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
        },
    },
    prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
    vite: {
        assetsInclude: ['**/*.glsl'],
    },
})
