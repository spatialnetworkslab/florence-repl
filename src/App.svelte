<script>
  import REPL from './repl/REPL.svelte'

  const appSource = `<script>
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

<main>
	<h1>Hello!</h1>
  <REPL {components} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>