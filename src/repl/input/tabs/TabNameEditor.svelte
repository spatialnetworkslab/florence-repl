<script>
  import getFileName from '../../../utils/getFileName.js'
  import { createEventDispatcher } from 'svelte'
  import EditIcon from './EditIcon.svelte'
  import DeleteIcon from './DeleteIcon.svelte'

  export let replFile
  export let usedFileNames
  export let iconsVisible

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
  /* .input-sizer {
		color: #ccc;
	} */

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
</style>

{#if editing}

	<!-- <span class="input-sizer">
    {replFile.name + (/\./.test(replFile.name) ? '' : `.${replFile.type}`)}
   </span> -->

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

  <span style="padding: 0px 4px;">
    <EditIcon
      visible={iconsVisible}
      on:click={startEditing}
    /><!--

    --><span style="padding: 0px 4px;">{replFile.name}.{replFile.type}</span><!--

    --><DeleteIcon
      visible={iconsVisible}
    />
  </span>

{/if}
