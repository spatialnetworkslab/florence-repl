<script>
  import Input from './input/Input.svelte'
	import Output from './output/Output.svelte'

  import injectPreloadedCode from '../preload/injectPreloadedCode.js'

  export let replFiles
  export let currentFileName
  export let preloaded = undefined

  let bundled

  const bundler = new Worker('./bundler.js')

	bundler.addEventListener('message', event => {
		if (preloaded) {
      bundled = injectPreloadedCode(
        event.data.bundled,
        event.data.preloadedPackagesUsed,
        preloadedPackages
      )
    } else {
      bundled = event.data.bundled
    }
	})

	function bundle (replFiles) {
    let dummyCodePackages = {}

    for (const replFile of replFiles) {
      dummyCodePackages[replFile.fileName] = replFile.dummyCode
    }

    bundler.postMessage({ replFiles, dummyCodePackages })
	}

	$: bundle(replFiles)
</script>

<main>
	
  <Input 
    bind:replFiles 
    bind:currentFileName
  />

	<Output {bundled} />

</main>
