import * as rollup from 'rollup/dist/es/rollup.browser.js'
import { dependencyLookup } from '../dependencies'

const CDN_URL = 'https://cdn.jsdelivr.net/npm/'

importScripts(`${CDN_URL}svelte/compiler.js`)

async function fetchPackage (url) {
	return (await fetch(url)).text()
}

const componentLookup = {}

function generateComponentLookup (components) {
  components.forEach(component => {
    componentLookup[`./${component.name}.${component.type}`] = component
  })
}

function resolveId (importee, importer) {
  if (importee === "svelte") return `${CDN_URL}/svelte/index.mjs`

  // import x from 'svelte/somewhere'
  if (importee.startsWith("svelte/")) {
    return `${CDN_URL}/svelte/${importee.slice(7)}/index.mjs`
  }

  // import x from './file.js' (via a 'svelte' or 'svelte/x' package)
  if (importer && importer.startsWith(`${CDN_URL}/svelte`)) {
    const resolved = new URL(importee, importer).href
    if (resolved.endsWith(".mjs")) return resolved

    return `${resolved}/index.mjs`
  }

  // local repl components
  if (importee in componentLookup) return importee

  // local dependencies
  if (importee in dependencyLookup) return importee

  // relative imports from a remote package
  if (importee.startsWith(".")) return new URL(importee, importer).href

  throw new Error(`Invalid import '${importee}' in ${importer}`)
}

async function load (id) {
  if (id in componentLookup) {
    return componentLookup[id].source
  }

  if (id in dependencyLookup) {
    return dependencyLookup[id].source
  }

  return await fetchPackage(id)
}

function transform (code, id) {
  // our only transform is to compile svelte components
  if (/.*\.svelte/.test(id)) return svelte.compile(code).js.code
}

self.addEventListener(
	'message',
	async event => {
    generateComponentLookup(event.data)

		const bundle = await rollup.rollup({
			input: './App.svelte',
			plugins: [
				{
					name: 'repl-plugin',
					resolveId,
					load,
					transform
				},
			],
		});

		// a touch longwinded but output contains an array of chunks
		// we are not code-splitting, so we only have a single chunk
    const output = (await bundle.generate({ format: "esm" }))
      .output[0]
			.code

		self.postMessage(output)
	}
)
