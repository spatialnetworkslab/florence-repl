import * as rollup from 'rollup/dist/es/rollup.browser.js'
import repl from './plugins/repl/repl.js'
import prebundler from './plugins/prebundler/prebundler.js'
import json from './plugins/json/json.js'

import getFileName from '../utils/getFileName.js'

function generateFileLookup (replFiles) {
  const fileLookup = {}

  for (const replFile of replFiles) {
    fileLookup[`./${getFileName(replFile)}`] = replFile
  }

  return fileLookup
}

let rollupCache
const prebundlerCache = {}

self.addEventListener(
  'message',
  async event => {
    const fileLookup = generateFileLookup(event.data.replFiles)
    const cdn = event.data.cdn

    try {
      const bundle = await rollup.rollup({
        input: './App.svelte',
        cache: rollupCache,
        plugins: [
          repl({ fileLookup, cdn }),
          json,
          prebundler({ cdn, cache: prebundlerCache })
        ],
        inlineDynamicImports: true
      })

      rollupCache = bundle.cache

      // a touch longwinded but output contains an array of chunks
      // we are not code-splitting, so we only have a single chunk
      const bundled = (await bundle.generate({ format: 'esm' }))
        .output[0]
        .code

      self.postMessage({ bundled })
    } catch (errorMessage) {
      const error = { message: errorMessage.toString() }
      self.postMessage({ error })
    }
  }
)
