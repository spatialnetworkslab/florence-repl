<script>
  import REPL from './repl/REPL.svelte'

  const appSource = `
<script>
  import Component from './Component1.svelte';
  import testDep from 'my-test-dependency'

  testDep()
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
