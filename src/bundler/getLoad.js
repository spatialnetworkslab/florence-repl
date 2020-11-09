import fetchIfUncached from './fetchPackage.js'

const DUMMY_CODE = `
/* @@@START_DUMMY_CODE@@@ */
export const test = 'test'
/* @@@END_DUMMY_CODE@@@ */
`

export default function (fileLookup, preloadedFilesUsed) {
  return async function load (id) {
    if (id in fileLookup) {
      return fileLookup[id].source
    }

    // test-dependency
    if (id === 'my-test-dependency') {
      preloadedFilesUsed[id] = true
      return DUMMY_CODE
    }

    return await fetchIfUncached(id)
  }
}
