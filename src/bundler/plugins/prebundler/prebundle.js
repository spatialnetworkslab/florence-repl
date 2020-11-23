import * as rollup from 'rollup/dist/es/rollup.browser.js'
import getPackageURL from './getPackageURL.js'
import createPlugin from './createPlugin.js'

export default async function prebundle ({ packageName, cdn }) {
  const packageURL = await getPackageURL(packageName, cdn)

  const inputConfig = {
    input: packageURL,
    plugins: [createPlugin({ packageURL, cdn })]
  }

  const bundle = await rollup.rollup(inputConfig)
  const { output } = await bundle.generate({ format: 'esm' })

  return output[0]
}
