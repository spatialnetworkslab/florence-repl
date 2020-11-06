<script>
	import { createEventDispatcher } from 'svelte'

	export let tabs = []
	export let current = 0
  
  const dispatch = createEventDispatcher()
</script>

<ul>
	{#each tabs as { name, type, id }}
		<li class:active={id === current} on:click={() => dispatch('select', id)}>
			{name}.{type}
		</li>
	{/each}
	<li><button on:click={() => dispatch('new')}>+</button></li>
</ul>

<style>
	.active {
		font-weight: 900;
		text-decoration: underline;
	}
</style>
