export default function injectPreloadedCode (
  _bundled,
  usedPackages,
  preloadedPackages
) {
  let bundled = _bundled

  for (const packageName in usedPackages) {
    bundled = injectPreloadedCodePackage(bundled, preloadedPackages[packageName])
  }

  return bundled
}

export function injectPreloadedCodePackage (bundled, packageMetadata) {
  const {
    codeBefore,
    transformedDummyCode,
    codeAfter
  } = removeTransformedCode(bundled, packageMetadata)

  const compilerRenamesObject = getCompilerRenames(transformedDummyCode, packageMetadata)
  const destructureString = getDestructureString(compilerRenamesObject)

  const fullIIFEExpression = `const ${destructureString} = ${packageMetadata.iife}`

  return [codeBefore, fullIIFEExpression, codeAfter].join('\n')
}

function removeTransformedCode (bundled, packageMetadata) {
  const { name } = packageMetadata

  const startTag = `/* @@START_DUMMY_CODE_${name}@@ */`
  const endTag = `/* @@END_DUMMY_CODE_${name}@@ */`

  const [codeBefore, restCode] = bundled.split(startTag)
  const [transformedDummyCode, codeAfter] = restCode.split(endTag)

  return {
    codeBefore: codeBefore.trim(),
    transformedDummyCode: transformedDummyCode.trim(),
    codeAfter: codeAfter.trim()
  }
}

function getCompilerRenames (transformedDummyCode, packageMetadata) {
  const transformedExportNames = transformedDummyCode
    .split('\n')
    .map(declaration => declaration.trim())
    .map(declaration => declaration.split(';')[0])
    .filter(declaration => declaration && declaration !== '')
    .map(declaration => declaration.split('const ')[1])
    .map(declaration => declaration.split(' = ')[0])

  const { exportValue, exportsObject } = packageMetadata

  const originalExportNames = exportsObject
    ? Object.keys(exportsObject)
    : [exportValue.substr(8, exportValue.length)]

  const compilerRenamesObject = {}

  for (let i = 0; i < originalExportNames.length; i++) {
    compilerRenamesObject[originalExportNames[i]] = transformedExportNames[i]
  }

  return compilerRenamesObject
}

function getDestructureString (compilerRenamesObject) {
  let destructureString = '{'

  for (const originalName in compilerRenamesObject) {
    const newName = compilerRenamesObject[originalName]
    destructureString += ` ${originalName}: ${newName},`
  }

  destructureString = destructureString.substring(0, destructureString.length - 1)
  destructureString += ' }'

  return destructureString
}
