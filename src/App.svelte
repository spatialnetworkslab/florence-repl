<script>
  import { onMount } from 'svelte'
  import preloadPackages from './preload/preloadPackages.js'
  import DataContainer from './packages/DataContainer.js'
  import florence from './packages/florence.js'
  import REPL from './repl/REPL.svelte'
  import appSource from './appSource.js'

  const replFiles = [
    {
      name: 'App',
			type: 'svelte',
      fileName: 'App.svelte',
			source: appSource.trim(),
    },
    
    {
      name: 'Component1',
      type: 'svelte',
      fileName: 'Component1.svelte',
	    source: '<h1>Hello</h1>',
    }
  ]

  const currentFileName = 'App.svelte'
  
  let preloaded

  onMount(async () => {
    preloaded = await preloadPackages([DataContainer, florence])
  })
</script>

{#if preloaded}

  <REPL
    {replFiles}
    {currentFileName}
    {preloaded}
  />

{/if}
