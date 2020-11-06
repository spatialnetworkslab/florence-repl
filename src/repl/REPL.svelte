<script>
	import Input from './Input.svelte'
	import Output from './Output.svelte'

  const compiler = new Worker('../compiler/compiler.js')

	export let components = []

	let current = 0
	let compiled

	compiler.addEventListener('message', event => {
		compiled = event.data
	})

	function compile (_components) {
		worker.postMessage(_components)
	}

	$: compile(components)
</script>

<main>
	<Input bind:components bind:current />
	<Output {compiled} />
</main>
