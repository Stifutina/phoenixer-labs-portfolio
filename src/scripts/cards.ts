/**
 * Cursor-lit cards (from Anastasia's Three.js portfolio): the rim lights up under the pointer
 * and the card tilts a little towards it. One delegated listener for the whole document, so it
 * keeps working across client-side navigation.
 */
export function initCards()
{
    if(!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return

    let frame = 0
    let card: HTMLElement | null = null
    let x = 0
    let y = 0

    const update = () =>
    {
        frame = 0
        if(!card) return
        const rect = card.getBoundingClientRect()
        const mx = x - rect.left
        const my = y - rect.top
        card.style.setProperty('--mx', `${mx}px`)
        card.style.setProperty('--my', `${my}px`)
        if(card.classList.contains('door')) return
        card.style.setProperty('--ry', `${(mx / rect.width - 0.5) * 5}deg`)
        card.style.setProperty('--rx', `${-(my / rect.height - 0.5) * 5}deg`)
    }

    document.addEventListener('pointermove', (event) =>
    {
        const target = (event.target as Element | null)?.closest<HTMLElement>('.card, .door')
        if(card && card !== target)
        {
            card.style.removeProperty('--rx')
            card.style.removeProperty('--ry')
        }
        card = target ?? null
        if(!card) return
        x = event.clientX
        y = event.clientY
        if(!frame) frame = requestAnimationFrame(update)
    }, { passive: true })
}
