import prebundle from './prebundle.js'
import fetchPackage from '../../fetchPackage.js'

export default function prebundler ({ cache }) {
  return {
    resolveId (importee, importer) {
      return importee
    },

    async load (importee, importer) {
      if (importee in cache) return cache[importee].code

      let prebundled

      if (importee === '@snlab/florence') {
        const code = await fetchPackage('https://cdn.skypack.dev/@snlab/florence')
        prebundled = { code }
      } else if (importee.startsWith('/-/@snlab')) {
        const code = fetchPackage(`https://cdn.skypack.dev${importee}`)
        prebundled = { code }
      } else {
        prebundled = await prebundle({ packageName: importee })
      }

      cache[importee] = prebundled
      return cache[importee].code
    }
  }
}
