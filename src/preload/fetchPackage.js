const testDependencyCode = `
const test = 'BOOYAH'
export { test as test }
`

export default async function fetchPackage (url) {
  if (url === '@@TESTURL@@') return testDependencyCode
  return await fetch(url)
}
