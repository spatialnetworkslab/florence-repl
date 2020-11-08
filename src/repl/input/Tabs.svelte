<script>
	import { createEventDispatcher } from 'svelte'

	export let replFiles
	export let currentFileId
  
  const dispatch = createEventDispatcher()
</script>

<ul>

	{#each replFiles as { name, type, id }}

		<li 
      class:active={id === currentFileId} 
      on:click={() => dispatch('select', id)}
    >
			{name}.{type}
		</li>

	{/each}

	<li>
    <button 
      on:click={() => dispatch('new')}
    >
      +
    </button>
  </li>
</ul>

<style>
	.active {
		font-weight: 900;
		text-decoration: underline;
	}
</style>
