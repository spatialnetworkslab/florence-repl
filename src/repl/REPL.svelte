<script>
  import _debounce from 'lodash.debounce'

  import Input from './input/Input.svelte'
	import Output from './output/Output.svelte'

  import getFileName from '../utils/getFileName.js'
  import getDummyCodePackages from '../utils/getDummyCodePackages.js'

  export let replFiles
  export let currentFileId = 0
  export let debounce = 150
  export let fontSize = 14
  export let workersDir = 'workers'
  // export let layout = 'horizontal'

  if (!(getFileName(replFiles[0]) === 'App.svelte')) {
    throw new Error('First file must be \'App.svelte\'')
  }

  let bundled
  let error = null
  let bundling = false
  let firstTime = true

  const bundler = new Worker(`./${workersDir}/bundler.js`)

	bundler.addEventListener('message', event => {
    bundling = false

    if (event.data.error) {
      error = event.data.error
      return
    }

    error = null
    firstTime = false

    bundled = event.data.bundled
	})

  function bundleFn (replFiles) {
    bundling = true
    bundler.postMessage({ replFiles })
	}

	$: bundle = debounce ? _debounce(bundleFn, debounce) : bundleFn

  $: bundle(replFiles)

  $: loadingEditor = bundled ? null : { message: 'Loading editor...' }
</script>

<style>
  * {
	  margin:0;
	  padding:0;
	  border:0;
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
  }
</style>

<div class="container">

  <Input
    bind:replFiles 
    bind:currentFileId
    {fontSize}
  />
  
  <Output
    {bundled}
    {error}
    {bundling}
    {firstTime}
  />
  
</div>
