<script>
	import Input from './input/Input.svelte'
	import Output from './output/Output.svelte'

  export let replFiles
  export let currentFileName
  
  const bundler = new Worker('./bundler.js')

  let bundled
  let firstUpdate = true // hack to avoid double bundling on load

	bundler.addEventListener('message', event => {
		bundled = event.data.bundled
	})

	function bundle (replFiles) {
    if (!firstUpdate) {
      bundler.postMessage({ replFiles })
    }

    firstUpdate = false
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
