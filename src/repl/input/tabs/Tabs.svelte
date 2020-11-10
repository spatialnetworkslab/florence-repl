<script>
  import AddNewButton from './AddNewButton.svelte'
  import Tab from './Tab.svelte'
  import getFileName from '../../../utils/getFileName.js'

  export let replFiles
  export let currentFileId

  $: usedFileNames = new Set(replFiles.map(getFileName))
  
  function addNew () {
    const maxId = Math.max(...replFiles.map(f => f.id))
    currentFileId = maxId + 1 

    replFiles.push({
      id: currentFileId,
      name: `Component${currentFileId}`,
      type: 'svelte',
      source: ''
    })

    replFiles = replFiles
  }

  function onClick () {}
  function dragStart () {}
  function dragOver () {}
  function dragLeave () {}
  function dragEnd () {}
</script>

<style>
	.component-selector {
		position: relative;
		border-bottom: 1px solid #eee;
		overflow: hidden;
	}

	.file-tabs {
		border: none;
		margin: 0;
		white-space: nowrap;
		overflow-x: auto;
		overflow-y: hidden
	}
</style>

<div class="component-selector">
	<div class="file-tabs" on:dblclick="{addNew}">
			
    {#each replFiles as replFile}

			<Tab
        bind:replFile
        {usedFileNames}
        active={replFile.id === currentFileId}
        on:click={onClick}
        on:dragstart={dragStart}
        on:dragover={dragOver}
        on:dragleave={dragLeave}
        on:dragend={dragEnd}
      />

		{/each}

		<AddNewButton on:click={addNew} />
		
  </div>
</div>
