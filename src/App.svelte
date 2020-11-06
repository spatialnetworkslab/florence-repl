<script>
  import REPL from './repl/REPL.svelte'

  const appSource = `
<script>
  import Component from './Component1.svelte'
  import DataContainer from '@snlab/florence-datacontainer'

  const dc = new DataContainer({ a: [1, 2, 3] })
  console.log(dc.column('a'))
<\/script>

<Component />
`

  let components = [
		{
			id: 0,
			name: 'App',
			type: 'svelte',
			source: appSource,
		},
		{
			id: 1,
			name: 'Component1',
			type: 'svelte',
			source: '<h1>Hello</h1>',
		},
	]
</script>

<REPL {components} />
