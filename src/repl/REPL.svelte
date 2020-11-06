<script>
	import Input from './Input.svelte'
	import Output from './Output.svelte'

  const compiler = new Worker('./compiler.js')

	export let components = []

	let current = 0
	let compiled
	let cache

	compiler.addEventListener('message', event => {
		compiled = event.data.compiled
		cache = event.data.cache
	})

	function compile (components) {
		compiler.postMessage({components, cache})
	}

	$: compile(components)
</script>

<main>
	<Input bind:components bind:current />
	<Output {compiled} />
</main>
