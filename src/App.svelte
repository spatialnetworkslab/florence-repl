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
  // let layout = 'horizontal'
</script>

<style>
  .page-container {
    margin: 5%;
    height: 85%;
    width: 90%;
  }
</style>

<div class="page-container">
  <REPL
    {replFiles}
    {currentFileId}
    fontSize={14}
  />
</div>
