<script>
  import srcdoc from './srcdoc.js'
  import Message from './Message.svelte'

  export let bundled
  export let error
  export let bundling
  export let width

	let iframe

	function update (code) {
		iframe.contentWindow.postMessage(code, "*")
	}

  $: iframe && bundled && update(bundled)
</script>

<style>
	.iframe-container {
		border: none;
		width: 100%;
		height: 100%;
    position: relative;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: none;
		display: block;
	}
</style>

<section class="iframe-container">
  <iframe 
    title="Rendered REPL"
    bind:this={iframe}
    {srcdoc} 
  />

  {#if error}
		<Message 
      kind="error"
      details={error}
      {width}
    />
	{/if}

  {#if bundling}
    <Message 
      kind="info" 
      details={{ message: 'Bundling...' }}
      {width}
    />
  {/if}

</section>
