// The areas the site is split by. Kept apart from site.ts so the content config can read them without pulling in images
export const areaKeys = ['backend', 'ai', '3d', 'frontend', 'design'] as const
export type Area = (typeof areaKeys)[number]
