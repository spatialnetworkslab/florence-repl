export default function generateDummyCode (packageMetadata) {
  const { name, exportValue, exportsObject } = packageMetadata

  const startTag = `/* @@START_DUMMY_CODE_${name}@@ */`
  const endTag = `/* @@END_DUMMY_CODE_${name}@@ */`

  let dummyCode = startTag + '\n'

  if (exportValue.startsWith('default ')) {
    const [, exportName] = exportValue.split(' ')

    dummyCode += `export default const ${exportName} = '${exportName}'\n`
  } else {
    for (const exportName in exportsObject) {
      dummyCode += `export const ${exportName} = '${exportName}'\n`
    }
  }

  dummyCode += endTag

  return dummyCode
}
