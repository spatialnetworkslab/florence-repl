<script>
	import Input from './input/Input.svelte'
	import Output from './output/Output.svelte'

	export let replFiles = []
  
  const compiler = new Worker('./compiler.js')

	let compiled
	let cache

	compiler.addEventListener('message', event => {
		compiled = event.data.compiled
		cache = event.data.cache
	})

	function compile (replFiles) {
		compiler.postMessage({replFiles, cache})
	}

	$: compile(replFiles)
</script>

<main>
	<Input bind:replFiles />
	<Output {compiled} />
</main>
