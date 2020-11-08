<script>
  import REPL from './repl/REPL.svelte'

  const appSource = `<script>
  import Component from './Component1.svelte'
  import { Graphic } from '@snlab/florence'
<\/script>

<Component />
`
  const replFiles = {
    'App.svelte': {
      name: 'App',
			type: 'svelte',
      fileName: 'App.svelte',
			source: appSource,
    },
    
    'Component1.svelte': {
      name: 'Component1',
      type: 'svelte',
      fileName: 'Component1.svelte',
	    source: '<h1>Hello</h1>',
    }
  }

  const currentFileName = 'App.svelte'
</script>

<REPL
  {replFiles}
  {currentFileName}
/>
