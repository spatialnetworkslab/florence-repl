<script>
  import { onMount } from 'svelte'
  import REPL from './repl/REPL.svelte'
  import appSource from './appSource.js'

  const replFiles = [
    {
      id: 0,
      name: 'App',
			type: 'svelte',
			source: appSource.trim(),
    },
    
    {
      id: 1,
      name: 'Component1',
      type: 'svelte',
	    source: '<h1>Hello</h1>',
    }
  ]
  
  let currentFileId = 0
  let width
  let height

  // let width = 1300
  // let height = 500

  let layout = 'horizontal'
</script>

<svelte:window
  bind:innerWidth={width}
  bind:innerHeight={height}
/>

<!-- <div style="position: absolute; left: 200px; top: 200px;"> -->
<div style="position: absolute; left: 0px; top: 0px;">

  <REPL
    {replFiles}
    {currentFileId}
    {width}
    {height}
    {layout}
    fontSize={14}
  />

</div>