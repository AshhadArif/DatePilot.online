import type { ToolContent } from './types'
import { ageContent } from './age'
import { calendarContent } from './calendar'
import { dateContent } from './dates'
import { guideContent } from './guides'
import { timeContent } from './time'
import { workContent } from './work'

export type { Block, DynamicBlockName, GuideContent, Section, ToolContent } from './types'

export const toolContent: Record<string, ToolContent> = {
  ...dateContent,
  ...ageContent,
  ...workContent,
  ...calendarContent,
  ...timeContent,
}

export { guideContent }
