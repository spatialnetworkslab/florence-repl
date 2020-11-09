import generateDummyCode from './generateDummyCode.js'

export default function parseCode (minifiedCode, packageMetadata) {
  if (packageMetadata.format === 'esm') return parseESM(minifiedCode, packageMetadata)
  // if (packageMetadata.format === 'mjs') return parseMJS(minifiedCode, packageMetadata)
}

function parseESM (minifiedCode, packageMetadata) {
  const newPackageMetadata = Object.assign({}, packageMetadata)

  const [codeBodyUntrimmed, exportValueUntrimmed] = minifiedCode.split('export')
  const codeBody = codeBodyUntrimmed.trim()
  const exportValue = exportValueUntrimmed.trim()

  newPackageMetadata.exportValue = exportValue

  if (!exportValue.startsWith('default ')) {
    // exportValue will be something like { a, b as c }
    newPackageMetadata.exportsObject = parseExportsObject(exportValue)
  }

  newPackageMetadata.iife = wrapIIFE(codeBody, newPackageMetadata)
  newPackageMetadata.dummyCode = generateDummyCode(newPackageMetadata)

  return newPackageMetadata
}

function parseExportsObject (exportValue) {
  const trimmed = exportValue
    .trim()
    .substring(0, exportValue.length - 1)
    .substring(1, exportValue.length)
    .trim()

  const entries = trimmed
    .split(',')
    .map(entry => entry.trim())
    .map(entry => entry.split(' as '))

  const exportsObject = {}

  for (const entry of entries) {
    if (entry.length === 1) {
      exportsObject[entry[0]] = entry[0]
    } else {
      exportsObject[entry[1]] = entry[0]
    }
  }

  return exportsObject
}

// function parseMJS (minifiedCode, packageMetadata) {
//   const newPackageMetadata = Object.assign({}, packageMetadata)

//   const [codeBody, exportsObject] = minifiedCode.split('export')
//   const exports = getExportsMJS(exportsObject)

//   newPackageMetadata.exports = exports
//   newPackageMetadata.iife = wrapIIFE(codeBody, exports)
//   newPackageMetadata.dummyCode = generateDummyCode(newPackageMetadata)

//   return newPackageMetadata
// }

function wrapIIFE (code, newPackageMetadata) {
  const { exportValue, exportsObject } = newPackageMetadata

  const returnValue = exportValue.startsWith('default ')
    ? exportValue.substr(8, exportValue.length)
    : asString(exportsObject)

  return '(function() {\n' +
    `${code}\n` +
    `return ${returnValue}\n` +
    '})()'
}

function asString (exportsObject) {
  let str = '{'

  for (const key in exportsObject) {
    str += ` ${key}: ${exportsObject[key]},`
  }

  str = str.substring(0, str.length - 1)

  str += ' }'

  return str
}
