import fetchIfUncached from './fetchPackage.js'

export default function (fileLookup, dependencyLookup) {
  return async function load (id) {
    if (id in fileLookup) {
      return fileLookup[id].source
    }

    if (id in dependencyLookup) {
      return dependencyLookup[id]
    }

    return await fetchIfUncached(id)
  }
}
