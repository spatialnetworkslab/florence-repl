import * as rollup from 'rollup/dist/es/rollup.browser.js'
import getPackageURL from './getPackageURL.js'
import createPlugin from './createPlugin.js'

export default async function prebundle ({ packageName }) {
  const packageURL = await getPackageURL(packageName)

  const inputConfig = {
    input: packageURL,
    plugins: [createPlugin({ packageURL })]
  }

  const bundle = await rollup.rollup(inputConfig)
  const { output } = await bundle.generate({ format: 'esm' })

  return output[0]
}
