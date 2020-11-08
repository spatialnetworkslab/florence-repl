import * as rollup from 'rollup/dist/es/rollup.browser.js'

import getResolveId from './getResolveId.js'
import getLoad from './getLoad.js'
import getTransform from './getTransform.js'

import dependencyLookup from '../dependencies'

const fileLookup = {}

function generateFileLookup (replFiles) {
  for (const fileName in replFiles) {
    fileLookup[`./${fileName}`] = replFiles[fileName]
  }
}

self.addEventListener(
  'message',
  async event => {
    generateFileLookup(event.data.replFiles)

    let cache = event.data.cache

    console.log(event.data.replFiles)

    const bundle = await rollup.rollup({
      input: './App.svelte',
      cache,
      plugins: [
        {
          name: 'repl-plugin',
          resolveId: getResolveId(fileLookup, dependencyLookup),
          load: getLoad(fileLookup, dependencyLookup),
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
