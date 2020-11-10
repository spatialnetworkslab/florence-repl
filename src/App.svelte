<script>
  import REPL from './repl/REPL.svelte'
  import appSource from './appSource.js'
  import DataContainer from './packages/DataContainer.js'
  import florence from './packages/florence.js'

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
  
  const preload = [DataContainer, florence]
</script>

<REPL
  {replFiles}
  {currentFileName}
  {preload}
/>
