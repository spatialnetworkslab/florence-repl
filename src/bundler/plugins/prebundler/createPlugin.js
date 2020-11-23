import getPackageURL from './getPackageURL.js'
import fetchPackage from '../../fetchPackage.js'

export default function createPlugin ({ packageURL, cdn }) {
  return {
    name: 'preload-plugin',

    async resolveId (id, importer) {
      if (id === packageURL) return packageURL

      if (isRelativeImport(id)) {
        return getRelativeURL(id, importer)
      }

      return await getPackageURL(id, cdn)
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

function isRelativeImport (id) {
  return id.startsWith('.')
}

function getRelativeURL (id, importer) {
  return new URL(id, importer).href
}
