import fetchPackage from '../../fetchPackage.js'

export default async function getPackageURL (packageName, cdn) {
  const url = cdn(packageName)
  const pkgUrl = `${url}/package.json`
  const pkg = JSON.parse(await fetchPackage(pkgUrl))

  if (packageName === '@snlab/florence') {
    return new URL(pkg.module, `${url}/`).href
  } else {
    // get an entry point from the pkg.json - first try svelte, then modules, then main
    if (pkg.svelte || pkg.module || pkg.main) {
      // use the above url minus `/package.json` to resolve the URL
      return new URL(pkg.svelte || pkg.module || pkg.main, `${url}/`).href
    }
  }
}
