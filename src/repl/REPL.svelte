<script>
  import Input from './input/Input.svelte'
	import Output from './output/Output.svelte'

  import injectPreloadedCode from '../preload/injectPreloadedCode.js'
  import getFileName from '../utils/getFileName.js'
  import getDummyCodePackages from '../utils/getDummyCodePackages.js'

  export let replFiles
  export let currentFileId = 0
  export let preloaded = undefined
  export let width
  export let height

  if (!(getFileName(replFiles[0]) === 'App.svelte')) {
    throw new Error('First file must be \'App.svelte\'')
  }

  let bundled
  let error = null

  const bundler = new Worker('./bundler.js')

	bundler.addEventListener('message', event => {
    if (event.data.error) {
      error = event.data.error
      return
    }

    error = null

		if (preloaded) {
      bundled = injectPreloadedCode(
        event.data.bundled,
        event.data.preloadedPackagesUsed,
        preloaded
      )

      return
    }

    bundled = event.data.bundled
	})

	function bundle (replFiles) {
    const dummyCodePackages = getDummyCodePackages(preloaded)
    bundler.postMessage({ replFiles, dummyCodePackages })
	}

  $: bundle(replFiles, preloaded)
</script>

<style>
.split {
  position: absolute;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
}

.left {
  left: 0;
  border-right: 1px solid #eee;
}

.right {
  right: 0;
  border-left: 1px solid #eee;
}
</style>

<div
  style={``}
>

  <div 
    class="split left"
    style={`width: ${width / 2}px; height: ${height}px;`}
  >

    <Input
      bind:replFiles 
      bind:currentFileId
      {height}
    />

  </div>

  <div 
    class="split right"
    style={`width: ${width / 2}px; height: ${height}px;`}
  >

    <Output
      {bundled}
      {error}
    />

  </div>

</div>
