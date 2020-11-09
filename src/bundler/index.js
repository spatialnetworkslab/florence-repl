import * as rollup from 'rollup/dist/es/rollup.browser.js'
import json from './plugins/json.js'

import getResolveId from './getResolveId.js'
import getLoad from './getLoad.js'
import getTransform from './getTransform.js'

function generateFileLookup (replFiles) {
  const fileLookup = {}

  for (const fileName in replFiles) {
    fileLookup[`./${fileName}`] = replFiles[fileName]
  }

  return fileLookup
}

let rollupCache

self.addEventListener(
  'message',
  async event => {
    const preloadedPackagesUsed = {}

    const fileLookup = generateFileLookup(event.data.replFiles)
    const dummyCodePackages = event.data.dummyCodePackages

    console.log('prebundle')

    const bundle = await rollup.rollup({
      input: './App.svelte',
      cache: rollupCache,
      plugins: [
        {
          name: 'repl-plugin',
          resolveId: getResolveId(
            fileLookup,
            dummyCodePackages
          ),
          load: getLoad(
            fileLookup,
            preloadedPackagesUsed,
            dummyCodePackages
          ),
          transform: getTransform()
        },
        json
      ],
      inlineDynamicImports: true
    })

    console.log('postbundle')

    rollupCache = bundle.cache

    // a touch longwinded but output contains an array of chunks
    // we are not code-splitting, so we only have a single chunk
    const bundled = (await bundle.generate({ format: 'esm' }))
      .output[0]
      .code

    self.postMessage({ bundled, preloadedPackagesUsed })
  }
)
