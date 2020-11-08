<script>
	import Input from './input/Input.svelte'
	import Output from './output/Output.svelte'

  export let replFiles
  export let currentFileName
  
  const bundler = new Worker('./bundler.js')

	let bundled
	let cache

	bundler.addEventListener('message', event => {
		bundled = event.data.bundled
		cache = event.data.cache
	})

	function bundle (replFiles) {
		bundler.postMessage({ replFiles, cache })
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
