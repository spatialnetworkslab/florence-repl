<script>
  import REPL from './repl/REPL.svelte'

  const appSource = `<script>
  import Component from './Component1.svelte'
  import DataContainer from '@snlab/florence-datacontainer'

  const dc = new DataContainer({ a: [1, 2, 3] })
  console.log(dc.column('a'))
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
