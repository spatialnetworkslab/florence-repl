export default async function fetchPackage (url) {
  return (await fetch(url)).text()
}
