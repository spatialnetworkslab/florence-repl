import prebundle from './prebundle.js'

export default function prebundler ({ cdn, cache }) {
  return {
    resolveId (importee, importer) {
      if (importee in cache) return importee
    },

    loadId (importee, importer) {
      if (importee in cache) return cache[importee].code

      const prebundled = prebundle({ packageName: importee, cdn })
      cache[importee] = prebundled
      return cache[importee].code
    }
  }
}
