export default function getCompilerRenames (transformedDummyCode) {
  const transformedExportNames = transformedDummyCode
    .split('\n')
    .map(str => str.trim())
    .filter(str => str && str !== '')

  return transformedExportNames
}
