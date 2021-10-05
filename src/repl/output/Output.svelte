<script>
  import srcdoc from './srcdoc.js'
  import Message from './Message.svelte'

  export let bundled
  export let error
  export let bundling
  export let firstTime

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
    padding-left: 16px;
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
    />
	{/if}

  {#if bundling && !firstTime}
    <Message 
      kind="info" 
      details={{ message: 'Bundling...' }}
    />
  {/if}

  {#if bundling && firstTime}
    <Message 
      kind="info" 
      details={{ message: 'Loading REPL...' }}
    />
  {/if}

</section>
