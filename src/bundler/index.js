import * as rollup from 'rollup/dist/es/rollup.browser.js'

import getResolveId from './getResolveId.js'
import getLoad from './getLoad.js'
import getTransform from './getTransform.js'

import dependencyLookup from '../dependencies'

const componentLookup = {}

function generateComponentLookup (components) {
  components.forEach(component => {
    componentLookup[`./${component.name}.${component.type}`] = component
  })
}

self.addEventListener(
  'message',
  async event => {
    generateComponentLookup(event.data.replFiles)

    let cache = event.data.cache

    const bundle = await rollup.rollup({
      input: './App.svelte',
      cache,
      plugins: [
        {
          name: 'repl-plugin',
          resolveId: getResolveId(componentLookup, dependencyLookup),
          load: getLoad(componentLookup, dependencyLookup),
          transform: getTransform()
        }
      ]
    })

    cache = bundle.cache

    // a touch longwinded but output contains an array of chunks
    // we are not code-splitting, so we only have a single chunk
    const bundled = (await bundle.generate({ format: 'esm' }))
      .output[0]
      .code

    self.postMessage({ bundled, cache })
  }
)
