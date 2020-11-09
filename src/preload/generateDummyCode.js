export default function generateDummyCode (packageMetadata) {
  const { name, exports } = packageMetadata

  const startTag = `/* @@START_DUMMY_CODE_${name}@@ */`
  const endTag = `/* @@END_DUMMY_CODE_${name}@@ */`

  let dummyCode = startTag + '\n'

  for (const exportName of exports) {
    dummyCode += `export const ${exportName}\n`
  }

  dummyCode += endTag

  return dummyCode
}
