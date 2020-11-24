import getPackageURL from './getPackageURL.js'
import fetchPackage from '../../fetchPackage.js'

export default function createPlugin ({ packageURL }) {
  return {
    name: 'preload-plugin',

    async resolveId (id, importer) {
      if (id === packageURL) return packageURL
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
