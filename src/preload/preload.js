import fetchPackage from './fetchPackage.js'

export default async function preload (packages) {
  const preloadedPackages = {}

  for (const packageMetadata of packages) {
    const { name, url } = packageMetadata

    const minifiedCode = await fetchPackage(url)
    preloadedPackages[name] = parseCode(minifiedCode, packageMetadata)
  }

  return preloadedPackages
}

function parseCode (minifiedCode, packageMetadata) {
  if (packageMetadata.format === 'esm') return parseESM(minifiedCode, packageMetadata)
  if (packageMetadata.format === 'mjs') return parseMJS(minifiedCode, packageMetadata)
}

function parseESM (minifiedCode, packageMetadata) {
  const newPackageMetadata = Object.assign({}, packageMetadata)

  const [codeBody, ...exportsUntrimmed] = minifiedCode.split('export')
  const exports = exportsUntrimmed.map(str => str.trim())

  newPackageMetadata.exports = exports
  newPackageMetadata.iife = wrapIIFE(codeBody, exports)

  return newPackageMetadata
}

function parseMJS (minifiedCode, packageMetadata) {
  const newPackageMetadata = Object.assign({}, packageMetadata)

  const [codeBody, exportsObject] = minifiedCode.split('export')
  const exports = getExportsMJS(exportsObject)

  newPackageMetadata.exports = exports
  newPackageMetadata.iife = wrapIIFE(codeBody, exports)

  return newPackageMetadata
}

function wrapIIFE (code, exports) {
  let returnObj = '{'

  for (const exportName of exports) {
    returnObj += ` ${exportName},`
  }

  returnObj = returnObj.substring(0, returnObj.length - 1)
  returnObj += ' }'

  return `(function() { ${code} return ${returnObj} })()`
}

function getExportsMJS (exportsObject) {
  // TODO
}
