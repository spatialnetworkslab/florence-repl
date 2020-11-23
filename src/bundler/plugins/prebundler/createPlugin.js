import getPackageURL from './getPackageURL.js'
import fetchPackage from '../../fetchPackage.js'

export default function createPlugin ({ packageURL }) {
  return {
    name: 'preload-plugin',

    async resolveId (id, importer) {
      if (id === packageURL) return packageURL

      if (isSkypackPath(id)) {
        return `https://cdn.skypack.dev${id}`
      }

      if (isRelativeImport(id)) {
        return getRelativeURL(id, importer)
      }

      return await getPackageURL(id)
    },

    load (id) {
      return fetchPackage(id)
    },

    transform (code, id) {
      // eslint-disable-next-line
      if (/.*\.svelte/.test(id)) return svelte.compile(code).js.code
    }
  }
}

function isSkypackPath (id) {
  return id.startsWith('/-/')
}

function isRelativeImport (id) {
  return id.startsWith('.')
}

function getRelativeURL (id, importer) {
  return new URL(id, importer).href
}
