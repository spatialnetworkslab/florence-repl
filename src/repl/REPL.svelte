<script>
  import { onMount } from 'svelte'

	import Input from './input/Input.svelte'
	import Output from './output/Output.svelte'

  import preloadPackages from '../preload/preloadPackages.js'
  import injectPreloadedCode from '../preload/injectPreloadedCode.js'

  export let replFiles
  export let currentFileName
  export let preload = undefined
  
  let preloadedPackages
  let dummyCodePackages = {}

  onMount(async () => {
    preloadedPackages = preload ? await preloadPackages(preload) : undefined

    if (preload) {
      for (const packageName in preloadedPackages) {
        dummyCodePackages[packageName] = preloadedPackages[packageName].dummyCode
      }
    }

    mounted = true
  })

  const bundler = new Worker('./bundler.js')

  let bundled

  // Lifecycle
  let mounted

	bundler.addEventListener('message', event => {
		if (mounted) {
      if (preload) {
        bundled = injectPreloadedCode(
          event.data.bundled,
          event.data.preloadedPackagesUsed,
          preloadedPackages
        )
      } else {
        bundled = event.data.bundled
      }
    }
	})

	function bundle (replFiles) {
    if (mounted) {
      bundler.postMessage({ replFiles, dummyCodePackages })
    }
	}

	$: bundle(replFiles, mounted)
</script>

<main>
	
  <Input 
    bind:replFiles 
    bind:currentFileName
  />

	<Output {bundled} />

</main>
