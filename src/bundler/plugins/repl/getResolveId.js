export default function getResolveId ({ fileLookup, cdn }) {
  return async function resolveId (importee, importer) {
    // import x from 'svelte'
    if (importee === 'svelte') return `@SVELTE@${cdn('svelte/index.mjs')}`

    // import x from 'svelte/somewhere'
    if (importee.startsWith('svelte/')) {
      return `@SVELTE@${cdn(`svelte/${importee.slice(7)}/index.mjs`)}`
    }

    // import x from './file.js' (inside 'svelte' or 'svelte/x' packages)
    if (importer && importer.startsWith(cdn('svelte'))) {
      const resolved = new URL(importee, importer).href
      if (resolved.endsWith('.mjs')) return resolved

      return `@SVELTE@${`${resolved}/index.mjs`}`
    }

    // local repl files
    if (importee in fileLookup) return importee
  }
}
