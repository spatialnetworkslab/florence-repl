<script>
  import getFileName from '../../../utils/getFileName.js'
  import { createEventDispatcher } from 'svelte'

  export let replFile
  export let usedFileNames

  const dispatch = createEventDispatcher()

  let editing = false
  let fileNameBeingEdited = null

  const fileNameFormat = /(.+)\.(svelte|js|json|md)$/

  function validFileName (fileName) {
    return (
      fileNameFormat.test(fileName) &&
      (
        !usedFileNames.has(fileName) ||
        getFileName(replFile) === fileName
      )
    )
  }

  function startEditing () {
    editing = true
    fileNameBeingEdited = getFileName(replFile)
  }

  function stopEditing () {
     if (validFileName(fileNameBeingEdited)) {
      const split = fileNameBeingEdited.split('.')
      replFile.type = split.pop()
      replFile.name = split.length === 1 ? split[0] : split.join('.')

      editing = false
      fileNameBeingEdited = null
    }
  }

  function selectInput (e) {
		setTimeout(() => {
			e.target.select()
		})
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

{#if editing}
	<span class="input-sizer">
    {replFile.name + (/\./.test(replFile.name) ? '' : `.${replFile.type}`)}
   </span>

	<!-- svelte-ignore a11y-autofocus -->
	<input
		autofocus
		spellcheck={false}
		bind:value={fileNameBeingEdited}
		on:focus={selectInput}
		on:blur={stopEditing}
		on:keydown={e => e.which === 13 && validFileName(fileNameBeingEdited) && e.target.blur()}
		class:duplicate={usedFileNames.has(editing)}
	>

{:else}

	<div
		class="editable"
		title="edit component name"
		on:click={startEditing}
	>
		{replFile.name}.{replFile.type}
	</div>

	<span class="remove" on:click="{() => dispatch('delete')}">
		<svg width="12" height="12" viewBox="0 0 24 24">
			<line stroke="#999" x1='18' y1='6' x2='6' y2='18' />
			<line stroke="#999" x1='6' y1='6' x2='18' y2='18' />
		</svg>
	</span>
		
{/if}
