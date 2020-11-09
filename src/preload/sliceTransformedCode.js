export default function sliceTransformedCode (bundled, packageMetadata) {
  const { name } = packageMetadata

  const startTag = `/* @@START_DUMMY_CODE_${name}@@ */`
  const endTag = `/* @@END_DUMMY_CODE_${name}@@ */`

  const [codeBefore, restCode] = bundled.split(startTag)
  const [transformedDummyCode, codeAfter] = restCode.split(endTag)

  return { codeBefore, transformedDummyCode, codeAfter }
}
