import getResolveId from './getResolveId.js'
import getLoad from './getLoad.js'
import getTransform from './getTransform.js'

export default function repl ({ fileLookup }) {
  return {
    name: 'repl-plugin',
    resolveId: getResolveId({ fileLookup }),
    load: getLoad({ fileLookup }),
    transform: getTransform()
  }
}
