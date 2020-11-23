// eslint-disable-next-line
importScripts(`https://unpkg.com/svelte/compiler.js`)

export default function () {
  return function transform (code, id) {
    // our only transform is to compile svelte components
    // eslint-disable-next-line
    if (/.*\.svelte/.test(id)) return svelte.compile(code).js.code
  }
}
