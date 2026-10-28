import sergeyPhoto from '../assets/people/sergey.jpg'
import anastasiaPhoto from '../assets/people/anastasia.jpg'
import { areaKeys, type Area } from './area-keys'

export const people = {
    sergey: {
        slug: 'sergey',
        name: 'Sergey Naydenko',
        first: 'Sergey',
        role: 'Backend and AI infrastructure',
        photo: sergeyPhoto,
        cv: '/cv/sergey-naydenko-cv.pdf',
        upwork: 'https://www.upwork.com/freelancers/~01f0076778d4183ff8',
        linkedin: 'https://www.linkedin.com/in/serhii-naydenko-96b47b121',
    },
    anastasia: {
        slug: 'anastasia',
        name: 'Anastasia Naydenko',
        first: 'Anastasia',
        role: '3D, frontend and model training',
        photo: anastasiaPhoto,
        cv: '/cv/anastasia-naydenko-cv.pdf',
        upwork: 'https://www.upwork.com/freelancers/~01925515c7b3d730e5',
        linkedin: 'https://www.linkedin.com/in/%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D1%81%D1%96%D1%8F-%D0%BD%D0%B0%D0%B9%D0%B4%D0%B5%D0%BD%D0%BA%D0%BE-49b979b4/',
        instagram: 'https://www.instagram.com/anastasia.3d.art',
        threejs: 'https://3d-threejs-exercises.vercel.app/',
    },
} as const

export type Owner = keyof typeof people

/**
 * The site is split by what we build, not by who builds it. Each area page tints the net
 * towards the light of the person who carries most of that work; AI belongs to both.
 */
export { areaKeys, type Area }

export const areas: Record<Area, {
    label: string
    tone: Owner | 'studio'
    who: Owner[]
    title: string
    lead: string
    band: string
    tools: { name: string; items: string[] }[]
}> = {
    backend: {
        label: 'Backend',
        tone: 'sergey',
        who: ['sergey'],
        title: 'Backend engineering: Node.js, TypeScript and Postgres',
        lead: 'Services, schemas and integrations that have to be right before they can be pretty. TypeScript on Node.js, Postgres and MongoDB, queues and search, and the APIs your business already runs on. Most of it under NDA, so these pages describe what was built and with what, never for whom.',
        band: 'Need a backend that holds up?',
        tools: [
            { name: 'Languages and runtimes', items: ['TypeScript', 'JavaScript', 'Node.js', 'PHP'] },
            { name: 'Frameworks', items: ['Fastify', 'Express', 'Nest.js', 'Sails.js', 'GraphQL', 'WebSockets'] },
            { name: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB', 'Kysely', 'TypeORM'] },
            { name: 'Auth', items: ['BetterAuth', 'OAuth', 'JWT', 'Auth0', 'Roles and permissions'] },
            { name: 'Cloud and ops', items: ['AWS', 'AWS Lambda', 'Google Cloud', 'Serverless', 'Docker', 'CI/CD', 'RabbitMQ'] },
            { name: 'Integrations', items: ['Shopify', 'Printify', 'Mailchimp', 'SendGrid', 'HubSpot'] },
        ],
    },
    ai: {
        label: 'AI',
        tone: 'studio',
        who: ['sergey', 'anastasia'],
        title: 'AI systems: agents, RAG and models we train ourselves',
        lead: 'Past the chat wrapper. Sergey builds what agents need underneath: MCP servers and clients, permissions, data they can trust. Anastasia fine-tunes, evaluates and deploys her own models, from a three-language support classifier to a LoRA-tuned Qwen3.',
        band: 'Have an AI idea that needs more than a prompt?',
        tools: [
            { name: 'Agents', items: ['Model Context Protocol servers and clients', 'Tool permissions', 'OpenAI API'] },
            { name: 'Retrieval', items: ['RAG', 'pgvector', 'Vector search', 'bge-m3 embeddings'] },
            { name: 'Training', items: ['Fine-tuning (DistilBERT, Qwen3 with LoRA)', 'Unsloth', 'PEFT', 'TRL'] },
            { name: 'Deployment', items: ['Hugging Face Spaces and ZeroGPU', 'Gradio', 'Cloudflare Workers and Containers'] },
        ],
    },
    '3d': {
        label: '3D',
        tone: 'anastasia',
        who: ['anastasia'],
        title: '3D: real-time scenes, product animation and models',
        lead: 'Real-time Three.js and GLSL in the browser, and everything Blender can do before that: product animation, characters, environments, and CAD parts rebuilt into clean, light meshes.',
        band: 'Want something people stop scrolling for?',
        tools: [
            { name: 'Modeling and animation', items: ['Blender', 'Cinema 4D', 'Cycles', 'Character rigging', 'Retopology', 'Fluid simulation'] },
            { name: 'Real-time', items: ['Three.js', 'GLSL shaders', 'GPU particles', 'cannon-es', 'GSAP', 'Spline'] },
            { name: 'Delivery', items: ['DaVinci Resolve', 'Web video loops', 'glTF for the browser'] },
        ],
    },
    frontend: {
        label: 'Frontend',
        tone: 'anastasia',
        who: ['anastasia'],
        title: 'Frontend: interfaces, landing pages and live 3D on the web',
        lead: 'The part people actually touch. React, TypeScript, Vite and Astro, Framer and Webflow when they fit, with 3D and motion built in rather than bolted on.',
        band: 'Need the front end to feel finished?',
        tools: [
            { name: 'Frameworks', items: ['TypeScript', 'React', 'Vue', 'Vite', 'Astro'] },
            { name: 'No-code and commerce', items: ['Framer', 'Webflow', 'Shopify themes'] },
            { name: 'Motion', items: ['Three.js', 'GSAP', 'CSS scroll-driven animation'] },
        ],
    },
    design: {
        label: 'Design',
        tone: 'anastasia',
        who: ['anastasia'],
        title: 'Design: logos, brand systems and interfaces',
        lead: 'Logos that hold up from a favicon to a poster, landing pages with a point of view, and the small details that make a product feel finished.',
        band: 'Need a mark or a page with some weight?',
        tools: [
            { name: 'Brand', items: ['Logo design', 'Vector illustration', 'Brand guidelines', 'Adobe Illustrator'] },
            { name: 'Interface', items: ['UI and UX', 'Figma', 'Landing pages'] },
        ],
    },
}

export const areaLabels: Record<Area, string> = Object.fromEntries(areaKeys.map((key) => [key, areas[key].label])) as Record<Area, string>
