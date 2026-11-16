import { renderToString } from 'react-dom/server'
import App from './App'

// Static rendering entry used by scripts/generate-route-html.mjs. Keeping the
// route in the initial state means crawlers receive the page content in the
// HTML response, while the client still boots normally from main.tsx.
export function render(path: string) {
  return renderToString(<App initialPath={path} />)
}
