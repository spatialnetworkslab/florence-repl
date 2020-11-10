<script>
  import Input from './input/Input.svelte'
	import Output from './output/Output.svelte'

  import injectPreloadedCode from '../preload/injectPreloadedCode.js'
  import getFileName from '../utils/getFileName.js'

  export let replFiles
  export let currentFileId = 0
  export let preloaded = undefined

  if (!(getFileName(replFiles[0]) === 'App.svelte')) {
    throw new Error('First file must be \'App.svelte\'')
  }

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
      dummyCodePackages[`./${getFileName(replFile)}`] = replFile.dummyCode
    }

    bundler.postMessage({ replFiles, dummyCodePackages })
	}

	$: bundle(replFiles)
</script>

<main>
	
  <Input 
    bind:replFiles 
    bind:currentFileId
  />

	<Output {bundled} />

</main>
