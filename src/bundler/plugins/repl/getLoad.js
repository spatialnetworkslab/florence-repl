import fetchIfUncached from '../../fetchPackage.js'

export default function getLoad (fileLookup) {
  return async function load (id) {
    if (id in fileLookup) {
      return fileLookup[id].source
    }

    return await fetchIfUncached(id)
  }
}
