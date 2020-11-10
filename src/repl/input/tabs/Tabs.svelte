<script>
  import AddNewButton from './AddNewButton.svelte'
  import Tab from './Tab.svelte'

  export let replFiles
  export let currentFileId
  
  function addNew () {}
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
		overflow-y: hidden;
		height: 10em;
	}
</style>

<div class="component-selector">
	<div class="file-tabs" on:dblclick="{addNew}">
			
    {#each replFiles as replFile}

			<Tab
        fileId={replFile.id}
        bind:replFiles
        {currentFileId}
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
