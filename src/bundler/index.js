import * as rollup from 'rollup/dist/es/rollup.browser.js'
import json from './plugins/json.js'

import getResolveId from './getResolveId.js'
import getLoad from './getLoad.js'
import getTransform from './getTransform.js'

const REPLACE_CODE = 'const test = \'BOOJAH\''

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
    const preloadedFilesUsed = {}

    const fileLookup = generateFileLookup(event.data.replFiles)

    const bundle = await rollup.rollup({
      input: './App.svelte',
      cache: rollupCache,
      plugins: [
        {
          name: 'repl-plugin',
          resolveId: getResolveId(fileLookup),
          load: getLoad(fileLookup, preloadedFilesUsed),
          transform: getTransform()
        },
        json
      ],
      inlineDynamicImports: true
    })

    rollupCache = bundle.cache

    // a touch longwinded but output contains an array of chunks
    // we are not code-splitting, so we only have a single chunk
    const _bundled = (await bundle.generate({ format: 'esm' }))
      .output[0]
      .code

    let bundled

    if (preloadedFilesUsed['my-test-dependency']) {
      const [codeBeforeDummy, restCode] = _bundled.split('/* @@@START_DUMMY_CODE@@@ */')
      const [, codeAfterDummy] = restCode.split('/* @@@END_DUMMY_CODE@@@ */')

      bundled = [codeBeforeDummy, REPLACE_CODE, codeAfterDummy].join('\n\n')
    } else {
      bundled = _bundled
    }

    self.postMessage({ bundled, preloadedFilesUsed })
  }
)
