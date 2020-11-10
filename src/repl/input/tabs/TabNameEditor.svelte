<script>
  export let replFiles
  export let fileId

  $: fileIndex = getFileIndex(replFiles, fileId)
  $: file = replFiles[fileIndex]

  let editing = false
  let fileNameBeingEdited = null

  function isComponentNameUsed (fileName) {

  }
</script>

<style>
  .editable, .input-sizer, input {
		display: inline-block;
		position: relative;
		line-height: 1;
	}

	.input-sizer {
		color: #ccc;
	}

	input {
		position: absolute;
		width: 100%;
		left: 16px;
		top: 12px;
		font: 400 12px/1.5 var(--font);
		border: none;
		color: var(--flash);
		outline: none;
		background-color: transparent;
	}

	.duplicate {
		color: var(--prime);
	}

	.remove {
		position: absolute;
		display: none;
		right: 1px;
		top: 4px;
		width: 16px;
		text-align: right;
		padding: 12px 0 12px 5px;
		font-size: 8px;
		cursor: pointer;
	}

	.remove:hover {
		color: var(--flash);
	}
</style>

{#if component === editing}
	<span class="input-sizer">
    {editing.name + (/\./.test(editing.name) ? '' : `.${editing.type}`)}
   </span>

	<!-- svelte-ignore a11y-autofocus -->
	<input
		autofocus
		spellcheck={false}
		bind:value={file.}
		on:focus={selectInput}
		on:blur={closeEdit}
		on:keydown={e => e.which === 13 && !isComponentNameUsed(editing) && e.target.blur()}
		class:duplicate={isComponentNameUsed(editing)}
	>

{:else}

	<div
		class="editable"
		title="edit component name"
		on:click="{() => { editing = true }}"
	>
		{component.name}.{component.type}
	</div>

	<span class="remove" on:click="{() => remove(component)}">
		<svg width="12" height="12" viewBox="0 0 24 24">
			<line stroke="#999" x1='18' y1='6' x2='6' y2='18' />
			<line stroke="#999" x1='6' y1='6' x2='18' y2='18' />
		</svg>
	</span>
		
{/if}
