import prebundle from './prebundle.js'
import fetchPackage from '../../fetchPackage.js'

export default function prebundler ({ cache }) {
  return {
    resolveId (importee, importer) {
      return importee
    },

    async load (importee, importer) {
      if (importee in cache) return cache[importee].code

      // if (importee === '@snlab/florence') {
      //   const prebundled = await fetchPackage('https://cdn.skypack.net/@snlab/florence')
      // }

      // const prebundled = await prebundle({ packageName: importee })

      const prebundled = importee === '@snlab/florence'
        ? await fetchFlorence()
        : await prebundle({ packageName: importee })

      cache[importee] = prebundled
      return cache[importee].code
    }
  }
}

async function fetchFlorence () {
  const code = await fetchPackage('https://cdn.skypack.dev/-/@snlab/florence@v0.1.22-0GlOErMo1VIYJxFjzNJK/dist=es2020/@snlab/florence.js')
  return { code }
}