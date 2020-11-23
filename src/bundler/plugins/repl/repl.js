import getResolveId from './getResolveId.js'
import getLoad from './getLoad.js'
import getTransform from './getTransform.js'

export default function repl ({ fileLookup, cdn }) {
  return {
    name: 'repl-plugin',
    resolveId: getResolveId({ fileLookup, cdn }),
    load: getLoad({ fileLookup }),
    transform: getTransform()
  }
}
