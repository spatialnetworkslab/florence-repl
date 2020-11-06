import fetchPackage from './fetchPackage.js'

export default function (componentLookup, dependencyLookup) {
  return async function load (id) {
    if (id in componentLookup) {
      return componentLookup[id].source
    }

    if (id in dependencyLookup) {
      return dependencyLookup[id]
    }

    return await fetchPackage(id)
  }
}
