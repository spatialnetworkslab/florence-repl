<script>
	import Tabs from './Tabs.svelte'

	export let components
	export let current

  let textarea

	function getMaxIndex (_components) {
		const ids = _components.map(({ id }) => id)
		return Math.max(...ids)
	}

	function newComponent() {
		const id = getMaxIndex(components) + 1

		components = components.concat({
			id,
			name: `Component${id}`,
			type: 'svelte',
			source: '',
		})

		current = id
		textarea.focus()
	}

	$: currentComponent = components.findIndex(({ id }) => id === current)
	$: tabs = components.map(({ id, name, type }) => ({ id, name, type }))
</script>

<section>
	<Tabs
		{tabs}
		{current}
		on:select={({ detail }) => (current = detail)}
		on:new={newComponent}
  />
	<textarea
		bind:value={components[currentComponent].source}
		bind:this={textarea}
  />
</section>
