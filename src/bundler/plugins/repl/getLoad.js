import fetchIfUncached from '../../fetchPackage.js'

export default function getLoad ({ fileLookup }) {
  return async function load (id) {
    if (id.startsWith('@SVELTE@')) {
      return await fetchIfUncached(id.slice(8))
    }

    if (id in fileLookup) {
      return fileLookup[id].source
    }
  }
}
