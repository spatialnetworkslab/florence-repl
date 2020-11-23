<script>
  import _debounce from 'lodash.debounce'

  import Input from './input/Input.svelte'
	import Output from './output/Output.svelte'

  import getFileName from '../utils/getFileName.js'
  import getDummyCodePackages from '../utils/getDummyCodePackages.js'

  export let replFiles
  export let currentFileId = 0
  export let width
  export let height
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
</style>

<div style={`
  width: ${width}px;
  position: relative;
`}>

  <div style={`
    float: left;
    width: ${width / 2}px;
    border-right: 1px solid #eee;
    box-sizing: border-box;
  `}>

    <Input
      bind:replFiles 
      bind:currentFileId
      {height}
      {fontSize}
    />
  
  </div>

  <div style={`
    margin-left: ${width / 2}px;
    height: ${height}px;
  `}>

    <Output
      {bundled}
      {error}
      {bundling}
      width={width / 2}
      {firstTime}
    />
  
  </div>

  <div style="clear: both;"></div>

</div>
