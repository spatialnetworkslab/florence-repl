import prebundle from './prebundle.js'

export default function prebundler ({ cdn, cache }) {
  return {
    resolveId (importee, importer) {
      return importee
    },

    async load (importee, importer) {
      if (importee in cache) return cache[importee].code

      const prebundled = await prebundle({ packageName: importee, cdn })
      cache[importee] = prebundled
      return cache[importee].code
    }
  }
}
