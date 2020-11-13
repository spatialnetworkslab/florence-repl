<script>
  // import preloadPackages from './preload/preloadPackages.js'
  // import DataContainer from './packages/DataContainer.js'
  // import florence from './packages/florence.js'
  import REPL from './repl/REPL.svelte'
  import appSource from './appSource.js'

  // const replFiles = [
  //   {
  //     id: 0,
  //     name: 'App',
	// 		type: 'svelte',
	// 		source: appSource.trim(),
  //   },
    
  //   {
  //     id: 1,
  //     name: 'Component1',
  //     type: 'svelte',
	//     source: '<h1>Hello</h1>',
  //   }
  // ]
  const replFiles = [
    {
      id: 0,
      name: 'App',
      type: 'svelte',
      source: '<h1>Hello!</h1>'
    }
  ]

  const width = 800
  const height = 400
</script>

<main>
	<h1>Hello world!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

  <REPL 
    {replFiles}
    {width}
    {height}
  />
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