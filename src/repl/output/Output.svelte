<script>
  import srcdoc from './srcdoc.js'

	export let bundled

	let iframe

	function update (code) {
		iframe.contentWindow.postMessage(code, "*")
	}

	$: iframe && bundled && update(bundled)
</script>

<section>
  <iframe 
    title="Rendered REPL"
    bind:this={iframe}
    {srcdoc} 
  />
</section>
