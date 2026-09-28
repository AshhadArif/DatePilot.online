export type DynamicBlockName = 'popular-countdowns' | 'days-from-today' | 'today-weekday' | 'current-week' | 'leap-year-status'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ol'; items: string[] }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'note'; text: string }
  | { type: 'component'; name: DynamicBlockName }

export type Section = { heading: string; blocks: Block[] }

export type ToolContent = {
  answer: string
  intro: string[]
  howTo: string[]
  sections: Section[]
  guideSlugs: string[]
  related: string[]
  faqs: [string, string][]
}

export type GuideContent = {
  answer: string
  sections: [string, string][]
  toolSlugs: string[]
}
