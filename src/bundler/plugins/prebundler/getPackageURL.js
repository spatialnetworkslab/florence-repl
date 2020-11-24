export default async function getPackageURL (packageName) {
  packageName = packageName.startsWith('/') ? packageName.slice(1) : packageName
  return `https://cdn.skypack.dev/${packageName}`
}
