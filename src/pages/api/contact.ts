import type { APIRoute } from 'astro'
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from 'astro:env/server'

export const prerender = false

const WHO = { sergey: 'Sergey', anastasia: 'Anastasia', both: 'Both / not sure' } as const

// Per-instance memory: enough to stop a script hammering one warm function
const recent = new Map<string, number[]>()
const LIMIT = 5
const WINDOW = 10 * 60 * 1000

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const limited = (ip: string) =>
{
    const now = Date.now()
    const hits = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW)
    hits.push(now)
    recent.set(ip, hits)
    return hits.length > LIMIT
}

export const POST: APIRoute = async ({ request, clientAddress, redirect }) =>
{
    const wantsJson = request.headers.get('accept')?.includes('application/json')
    const reply = (status: number, error?: string) =>
    {
        if(wantsJson) return Response.json(error ? { ok: false, error } : { ok: true }, { status })
        return redirect(error ? `/contact?error=${status}` : '/contact/sent', 303)
    }

    let form: FormData
    try
    {
        form = await request.formData()
    }
    catch
    {
        return reply(400, 'The form could not be read. Please try again.')
    }

    const field = (name: string, max: number) => String(form.get(name) ?? '').trim().slice(0, max)

    // Bots fill the hidden field or submit faster than a person can type
    const started = Number(form.get('started'))
    if(field('website', 200) || (started && Date.now() - started < 2500)) return reply(200)

    const name = field('name', 120)
    const email = field('email', 200)
    const message = field('message', 5000)
    const link = field('link', 500)
    const whoKey = field('who', 20) as keyof typeof WHO
    const who = WHO[whoKey] ?? WHO.both

    if(!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    {
        return reply(422, 'Please add your name, a valid email and a few words about the project.')
    }

    if(limited(clientAddress ?? 'unknown')) return reply(429, 'Too many messages in a short time. Please wait a few minutes.')

    if(!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID)
    {
        console.error('Contact form: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set')
        return reply(503, 'The form is not connected yet. Please reach us on Upwork or LinkedIn for now.')
    }

    const lines = [`<b>New project inquiry</b> for ${escape(who)}`, '', `<b>From:</b> ${escape(name)} &lt;${escape(email)}&gt;`]
    if(link) lines.push(`<b>Link:</b> ${escape(link)}`)
    lines.push('', escape(message))
    const text = lines.join('\n')

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML', link_preview_options: { is_disabled: true } }),
    }).catch(() => undefined)

    if(!response?.ok)
    {
        console.error('Contact form: Telegram returned', response?.status, await response?.text().catch(() => ''))
        return reply(502, 'The message did not go through on our side. Please try again, or reach us on Upwork.')
    }

    return reply(200)
}
