const fetchCache = new Map()

// const testDependencyCode = `
// const test = 'BOOYAH'
// export { test as test }
// `

export default async function fetchPackage (url) {
  // if (url === '@@TESTURL@@') return testDependencyCode

  if (fetchCache.has(url)) {
    return fetchCache.get(url)
  }

  const promise = fetch(url)
    .then(async r => {
      if (r.ok) {
        return await r.text()
      }
      throw new Error(await r.text())
    })
    .catch(err => {
      fetchCache.delete(url)
      throw err
    })

  fetchCache.set(url, promise)
  return promise
}
