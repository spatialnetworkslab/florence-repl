import fetchPackage from './fetchPackage.js'
import parseCode from './parseCode.js'

export default async function preload (packages) {
  const preloadedPackages = {}

  for (const packageMetadata of packages) {
    const { name, url } = packageMetadata

    const minifiedCode = await fetchPackage(url)
    preloadedPackages[name] = parseCode(minifiedCode, packageMetadata)
  }

  return preloadedPackages
}
